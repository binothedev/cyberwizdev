<?php
/**
 * db-relay.php — Database Relay API
 * ====================================
 * Single-file HTTP API that runs MySQL queries on behalf of the Next.js app.
 *
 * WHY: In production (cPanel) the app server cannot reach the database
 * directly, but PHP runs on the same host as MySQL ("localhost"). This file
 * exposes a small, authenticated surface that the app calls over HTTPS and
 * which executes the SQL inside the cPanel environment.
 *
 * SECURITY MODEL
 *  -------------
 *  - Every request must present a valid HMAC-SHA256 signature (HTTP header
 *    `X-Relay-Signature`) of the request body, keyed with a shared secret.
 *  - Requests are timestamped (`ts`) and rejected if older than RELAY_TTL
 *    seconds, which defeats replay attacks.
 *  - Only WHITELISTED ACTIONS are available. The caller never passes raw SQL.
 *    Each action resolves to a fixed, parameterized query. A raw "execute any
 *    SQL" escape hatch exists but must be explicitly enabled and is limited to
 *    SELECT/INSERT/UPDATE/DELETE.
 *  - Requests are rate-limited per client IP.
 *
 * SETUP
 *  -----
 *  1. Edit relay-config.php with your MySQL credentials and a strong secret.
 *  2. Upload relay-config.php + api.php to a folder in public_html (keep
 *     relay-config.php OUTSIDE public_html if possible — if not, it still
 *     only runs under PHP, never served as plain text).
 *  3. Test:  https://yourdomain.com/path/api.php?action=ping
 *  4. Point your app at this URL with the same secret.
 *
 * ACTIONS
 *  -------
 *  action=ping                 Health check (no signature needed)
 *  action=query                Run a whitelisted query (query/params)
 *  action=migrate              Apply pending migrations (files in migrations/)
 *  action=migrate_status       List migrations and their applied state
 *  action=seed                 Run the seeder (files in seeds/)
 *  action=sql                  RAW SQL (disabled by default — see config)
 */

declare(strict_types=1);

require_once __DIR__ . '/relay-config.php';

/* ------------------------------------------------------------------ *
 *  Helpers                                                           *
 * ------------------------------------------------------------------ */

function relay_json(int $status, array $payload): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function relay_fail(int $status, string $message): void
{
    relay_json($status, ['ok' => false, 'error' => $message]);
}

function relay_ok(array $payload): void
{
    relay_json(200, array_merge(['ok' => true], $payload));
}

/** Reject any request that is not HTTPS or loopback in production. */
function relay_require_https(): void
{
    $isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (($_SERVER['SERVER_PORT'] ?? '') === '443');

    // Allow http://localhost for local testing.
    if (!$isHttps && PHP_SAPI !== 'cli' && (($_SERVER['REMOTE_ADDR'] ?? '') !== '127.0.0.1')) {
        relay_fail(400, 'HTTPS required.');
    }
}

function relay_client_ip(): string
{
    return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
}

/** Constant-time string comparison (PHP 5.6+ has hash_equals built in). */
function relay_secure_compare(string $a, string $b): bool
{
    return is_string($a) && is_string($b) && hash_equals($a, $b);
}

/**
 * Verify the HMAC signature header over the raw request body.
 * Body format for signed requests: JSON, always including "ts" (unix seconds).
 */
function relay_verify_signature(string $rawBody): ?array
{
    $secret = RELAY_API_SECRET;
    if ($secret === '' || $secret === 'change-me') {
        relay_fail(500, 'RELAY_API_SECRET is not configured.');
    }

    $sig = $_SERVER['HTTP_X_RELAY_SIGNATURE'] ?? '';
    if ($sig === '') {
        relay_fail(401, 'Missing X-Relay-Signature header.');
    }

    $body = json_decode($rawBody, true);
    if (!is_array($body)) {
        relay_fail(400, 'Invalid JSON body.');
    }

    $ts = $body['ts'] ?? 0;
    if (!is_numeric($ts) || abs(time() - (int) $ts) > RELAY_TTL_SECONDS) {
        relay_fail(401, 'Request timestamp expired. Check your clock / retry.');
    }

    $expected = hash_hmac('sha256', $rawBody, $secret);
    if (!relay_secure_compare($expected, $sig)) {
        relay_fail(401, 'Invalid signature.');
    }

    return $body;
}

/* ------------------------------------------------------------------ *
 *  Rate limiting (simple per-IP window, no DB required)              *
 * ------------------------------------------------------------------ */

function relay_rate_limit(): void
{
    $file = sys_get_temp_dir() . '/db-relay-ratelimit-' . md5(relay_client_ip()) . '.json';
    $window = RELAY_RATE_LIMIT_WINDOW;
    $max = RELAY_RATE_LIMIT_MAX;

    $state = ['count' => 0, 'reset' => time() + $window];
    if (is_file($file)) {
        $saved = @json_decode((string) file_get_contents($file), true);
        if (is_array($saved)) {
            $state = $saved;
        }
    }

    if ($state['reset'] <= time()) {
        $state = ['count' => 0, 'reset' => time() + $window];
    }

    $state['count']++;
    @file_put_contents($file, json_encode($state), LOCK_EX);

    if ($state['count'] > $max) {
        relay_fail(429, 'Too many requests. Try again later.');
    }
}

/* ------------------------------------------------------------------ *
 *  Whitelisted query registry                                        *
 * ------------------------------------------------------------------ */

/**
 * The app never sends raw SQL. It sends an action name + parameters.
 * Only the queries below are reachable, and every value is bound via
 * prepared statement placeholders, so no injection is possible through them.
 */
function relay_query_registry(): array
{
    return [
        // Contacts
        'contact.create' => [
            'sql' => 'INSERT INTO Contact (id, name, email, message, phone, status) VALUES (?, ?, ?, ?, ?, ?)',
            'params' => ['id', 'name', 'email', 'message', 'phone', 'status'],
        ],
        'contact.update' => [
            'sql' => 'UPDATE Contact SET status = ?, updatedAt = updatedAt WHERE id = ?',
            'params' => ['status', 'id'],
        ],
        'contact.delete' => [
            'sql' => 'DELETE FROM Contact WHERE id = ?',
            'params' => ['id'],
        ],
        'contact.findUnique' => [
            'sql' => 'SELECT * FROM Contact WHERE id = ? LIMIT 1',
            'params' => ['id'],
        ],
        'contact.findMany' => [
            'sql' => 'SELECT * FROM Contact ORDER BY createdAt DESC',
            'params' => [],
        ],

        // NewsletterSubscriptions
        'newsletterSubscription.create' => [
            'sql' => 'INSERT INTO NewsletterSubscription (id, email, status) VALUES (?, ?, ?)',
            'params' => ['id', 'email', 'status'],
        ],
        'newsletterSubscription.update' => [
            'sql' => 'UPDATE NewsletterSubscription SET status = ? WHERE email = ?',
            'params' => ['status', 'email'],
        ],
        'newsletterSubscription.delete' => [
            'sql' => 'DELETE FROM NewsletterSubscription WHERE id = ?',
            'params' => ['id'],
        ],
        'newsletterSubscription.findUnique' => [
            'sql' => 'SELECT * FROM NewsletterSubscription WHERE email = ? LIMIT 1',
            'params' => ['email'],
        ],
        'newsletterSubscription.findMany' => [
            'sql' => 'SELECT * FROM NewsletterSubscription ORDER BY createdAt DESC',
            'params' => [],
        ],

        // Newsletters
        'newsletter.create' => [
            'sql' => 'INSERT INTO Newsletter (id, subject, content, sentBy, sentCount) VALUES (?, ?, ?, ?, ?)',
            'params' => ['id', 'subject', 'content', 'sentBy', 'sentCount'],
        ],
        'newsletter.delete' => [
            'sql' => 'DELETE FROM Newsletter WHERE id = ?',
            'params' => ['id'],
        ],
        'newsletter.findUnique' => [
            'sql' => 'SELECT * FROM Newsletter WHERE id = ? LIMIT 1',
            'params' => ['id'],
        ],
        'newsletter.findMany' => [
            'sql' => 'SELECT * FROM Newsletter ORDER BY sentAt DESC',
            'params' => [],
        ],

        // Users
        'user.create' => [
            'sql' => 'INSERT INTO User (id, name, email, emailVerified, image, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
            'params' => ['id', 'name', 'email', 'emailVerified', 'image', 'password', 'role'],
        ],
        'user.update' => [
            'sql' => 'UPDATE User SET name = ?, email = ?, emailVerified = ?, image = ?, password = ?, role = ? WHERE id = ?',
            'params' => ['name', 'email', 'emailVerified', 'image', 'password', 'role', 'id'],
        ],
        'user.delete' => [
            'sql' => 'DELETE FROM User WHERE id = ?',
            'params' => ['id'],
        ],
        'user.findUnique' => [
            'sql' => 'SELECT * FROM User WHERE email = ? LIMIT 1',
            'params' => ['email'],
        ],
        'user.findMany' => [
            'sql' => 'SELECT * FROM User ORDER BY createdAt DESC',
            'params' => [],
        ],

        // Accounts
        'account.create' => [
            'sql' => 'INSERT INTO Account (id, userId, type, provider, providerAccountId, refresh_token, access_token, expires_at, token_type, scope, id_token, session_state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            'params' => ['id', 'userId', 'type', 'provider', 'providerAccountId', 'refresh_token', 'access_token', 'expires_at', 'token_type', 'scope', 'id_token', 'session_state'],
        ],
        'account.delete' => [
            'sql' => 'DELETE FROM Account WHERE id = ?',
            'params' => ['id'],
        ],
        'account.findMany' => [
            'sql' => 'SELECT * FROM Account WHERE userId = ? ORDER BY provider ASC',
            'params' => ['userId'],
        ],

        // Sessions
        'session.create' => [
            'sql' => 'INSERT INTO Session (id, sessionToken, userId, expires) VALUES (?, ?, ?, ?)',
            'params' => ['id', 'sessionToken', 'userId', 'expires'],
        ],
        'session.delete' => [
            'sql' => 'DELETE FROM Session WHERE sessionToken = ?',
            'params' => ['sessionToken'],
        ],
        'session.findUnique' => [
            'sql' => 'SELECT * FROM Session WHERE sessionToken = ? LIMIT 1',
            'params' => ['sessionToken'],
        ],

        // VerificationTokens
        'verificationToken.create' => [
            'sql' => 'INSERT INTO VerificationToken (identifier, token, expires) VALUES (?, ?, ?)',
            'params' => ['identifier', 'token', 'expires'],
        ],
        'verificationToken.delete' => [
            'sql' => 'DELETE FROM VerificationToken WHERE token = ?',
            'params' => ['token'],
        ],
        'verificationToken.findUnique' => [
            'sql' => 'SELECT * FROM VerificationToken WHERE token = ? LIMIT 1',
            'params' => ['token'],
        ],
        'verificationToken.findMany' => [
            'sql' => 'SELECT * FROM VerificationToken WHERE identifier = ? ORDER BY expires DESC',
            'params' => ['identifier'],
        ],

        // ChatMessages
        'chatMessage.create' => [
            'sql' => 'INSERT INTO ChatMessage (id, sessionId, message, sender, senderName) VALUES (?, ?, ?, ?, ?)',
            'params' => ['id', 'sessionId', 'message', 'sender', 'senderName'],
        ],
        'chatMessage.update' => [
            'sql' => 'UPDATE ChatMessage SET read = ? WHERE id = ?',
            'params' => ['read', 'id'],
        ],
        'chatMessage.delete' => [
            'sql' => 'DELETE FROM ChatMessage WHERE id = ?',
            'params' => ['id'],
        ],
        'chatMessage.findMany' => [
            'sql' => 'SELECT * FROM ChatMessage WHERE sessionId = ? ORDER BY createdAt ASC',
            'params' => ['sessionId'],
        ],

        // ChatSessions
        'chatSession.create' => [
            'sql' => 'INSERT INTO ChatSession (id, userId, userName, userEmail, status) VALUES (?, ?, ?, ?, ?)',
            'params' => ['id', 'userId', 'userName', 'userEmail', 'status'],
        ],
        'chatSession.update' => [
            'sql' => 'UPDATE ChatSession SET userName = ?, userEmail = ?, status = ?, lastMessage = ? WHERE id = ?',
            'params' => ['userName', 'userEmail', 'status', 'lastMessage', 'id'],
        ],
        'chatSession.delete' => [
            'sql' => 'DELETE FROM ChatSession WHERE id = ?',
            'params' => ['id'],
        ],
        'chatSession.findUnique' => [
            'sql' => 'SELECT * FROM ChatSession WHERE id = ? LIMIT 1',
            'params' => ['id'],
        ],
        'chatSession.findMany' => [
            'sql' => 'SELECT * FROM ChatSession ORDER BY updatedAt DESC',
            'params' => [],
        ],

        // Projects
        'project.create' => [
            'sql' => 'INSERT INTO Project (id, title, slug, description, longDescription, image, githubUrl, demoUrl, status, sortOrder) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            'params' => ['id', 'title', 'slug', 'description', 'longDescription', 'image', 'githubUrl', 'demoUrl', 'status', 'sortOrder'],
        ],
        'project.update' => [
            'sql' => 'UPDATE Project SET title = ?, slug = ?, description = ?, longDescription = ?, image = ?, githubUrl = ?, demoUrl = ?, status = ?, sortOrder = ? WHERE id = ?',
            'params' => ['title', 'slug', 'description', 'longDescription', 'image', 'githubUrl', 'demoUrl', 'status', 'sortOrder', 'id'],
        ],
        'project.delete' => [
            'sql' => 'DELETE FROM Project WHERE id = ?',
            'params' => ['id'],
        ],
        'project.findUnique' => [
            'sql' => 'SELECT * FROM Project WHERE slug = ? LIMIT 1',
            'params' => ['slug'],
        ],
        'project.findMany' => [
            'sql' => 'SELECT * FROM Project WHERE status = ? ORDER BY sortOrder ASC',
            'params' => ['status'],
        ],
    ];
}

/* ------------------------------------------------------------------ *
 *  Query executor                                                    *
 * ------------------------------------------------------------------ */

function relay_run_query(mysqli $db, string $action, array $params): array
{
    $registry = relay_query_registry();
    if (!isset($registry[$action])) {
        relay_fail(400, "Unknown action: {$action}");
    }

    $def = $registry[$action];

    // Only send the params the query actually uses.
    $bound = [];
    foreach ($def['params'] as $key) {
        $bound[] = $params[$key] ?? null;
    }

    $stmt = $db->prepare($def['sql']);
    if ($stmt === false) {
        relay_fail(500, 'Prepare failed: ' . $db->error);
    }

    if ($bound !== []) {
        $types = '';
        $values = [];
        foreach ($bound as $value) {
            if ($value === null) {
                $types .= 's';
                $values[] = null;
            } elseif (is_int($value) || (is_string($value) && ctype_digit($value))) {
                $types .= 'i';
                $values[] = (int) $value;
            } elseif (is_bool($value)) {
                $types .= 'i';
                $values[] = $value ? 1 : 0;
            } else {
                $types .= 's';
                $values[] = (string) $value;
            }
        }
        $stmt->bind_param($types, ...$values);
    }

    if (!$stmt->execute()) {
        relay_fail(500, 'Query failed: ' . $stmt->error);
    }

    $isSelect = stripos(ltrim($def['sql']), 'SELECT') === 0;

    if ($isSelect) {
        $result = $stmt->get_result();
        $rows = [];
        if ($result !== false) {
            while ($row = $result->fetch_assoc()) {
                // Normalize MySQL BOOLEAN/TINYINT(1) to true/false like Prisma.
                foreach ($row as $col => $val) {
                    if ($val === '0' || $val === '1') {
                        $row[$col] = (int) $val;
                    }
                }
                $rows[] = $row;
            }
        }
        $stmt->close();
        return ['rows' => $rows, 'count' => count($rows), 'affected' => 0, 'insertId' => null];
    }

    $affected = $stmt->affected_rows;
    $insertId = $stmt->insert_id;
    $stmt->close();
    return ['rows' => [], 'count' => 0, 'affected' => $affected, 'insertId' => $insertId];
}

/* ------------------------------------------------------------------ *
 *  Raw SQL mode (DISABLED by default)                                *
 * ------------------------------------------------------------------ */

function relay_run_raw_sql(mysqli $db, string $sql, array $params): array
{
    $sql = trim($sql);
    $verb = strtoupper((string) preg_split('/\s+/', $sql)[0]);

    if (!in_array($verb, ['SELECT', 'INSERT', 'UPDATE', 'DELETE'], true)) {
        relay_fail(400, 'Only SELECT/INSERT/UPDATE/DELETE are allowed.');
    }

    $stmt = $db->prepare($sql);
    if ($stmt === false) {
        relay_fail(500, 'Prepare failed: ' . $db->error);
    }

    if ($params !== []) {
        $types = '';
        $values = [];
        foreach ($params as $value) {
            if ($value === null) {
                $types .= 's';
                $values[] = null;
            } elseif (is_int($value)) {
                $types .= 'i';
                $values[] = $value;
            } else {
                $types .= 's';
                $values[] = (string) $value;
            }
        }
        $stmt->bind_param($types, ...$values);
    }

    if (!$stmt->execute()) {
        relay_fail(500, 'Query failed: ' . $stmt->error);
    }

    if ($verb === 'SELECT') {
        $result = $stmt->get_result();
        $rows = [];
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
        $stmt->close();
        return ['rows' => $rows, 'count' => count($rows), 'affected' => 0, 'insertId' => null];
    }

    $affected = $stmt->affected_rows;
    $insertId = $stmt->insert_id;
    $stmt->close();
    return ['rows' => [], 'count' => 0, 'affected' => $affected, 'insertId' => $insertId];
}

/* ------------------------------------------------------------------ *
 *  Migrations & seeds                                                *
 * ------------------------------------------------------------------ */

function relay_migrations_dir(): string
{
    return rtrim(RELAY_MIGRATIONS_PATH, '/\\') . DIRECTORY_SEPARATOR;
}

function relay_seeds_dir(): string
{
    return rtrim(RELAY_SEEDS_PATH, '/\\') . DIRECTORY_SEPARATOR;
}

function relay_ensure_migrations_table(mysqli $db): void
{
    $db->query(
        "CREATE TABLE IF NOT EXISTS `_relay_migrations` (
            `name` VARCHAR(255) NOT NULL PRIMARY KEY,
            `applied_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4"
    );
}

function relay_list_migration_files(): array
{
    $dir = relay_migrations_dir();
    if (!is_dir($dir)) {
        return [];
    }
    $files = glob($dir . '*.sql');
    if ($files === false) {
        return [];
    }
    $files = array_map('basename', $files);
    sort($files, SORT_STRING);
    return $files;
}

function relay_migrations_status(mysqli $db): array
{
    relay_ensure_migrations_table($db);
    $applied = [];
    $res = $db->query('SELECT name, applied_at FROM `_relay_migrations` ORDER BY name');
    if ($res !== false) {
        while ($row = $res->fetch_assoc()) {
            $applied[$row['name']] = $row['applied_at'];
        }
    }

    $status = [];
    foreach (relay_list_migration_files() as $file) {
        $status[] = [
            'name' => $file,
            'applied' => isset($applied[$file]),
            'applied_at' => $applied[$file] ?? null,
        ];
    }
    return $status;
}

function relay_run_migrations(mysqli $db): array
{
    relay_ensure_migrations_table($db);
    $results = [];

    foreach (relay_list_migration_files() as $file) {
        $exists = $db->query(
            "SELECT 1 FROM `_relay_migrations` WHERE name = " . $db->real_escape_string($file)
        );
        if ($exists !== false && $exists->num_rows > 0) {
            $results[] = ['name' => $file, 'applied' => true, 'skipped' => true];
            continue;
        }

        $sql = (string) file_get_contents(relay_migrations_dir() . $file);
        if ($db->multi_query($sql)) {
            // Drain result sets so the next query can run.
            do {
                if ($result = $db->store_result()) {
                    $result->free();
                }
            } while ($db->more_results() && $db->next_result());
            $results[] = ['name' => $file, 'applied' => true, 'skipped' => false];
        } else {
            relay_fail(500, "Migration {$file} failed: " . $db->error);
        }

        $stmt = $db->prepare('INSERT INTO `_relay_migrations` (name) VALUES (?)');
        $stmt->bind_param('s', $file);
        $stmt->execute();
        $stmt->close();
    }

    return $results;
}

function relay_run_seeds(mysqli $db): array
{
    $dir = relay_seeds_dir();
    if (!is_dir($dir)) {
        relay_fail(500, 'Seeds directory not found.');
    }

    $results = [];
    $files = glob($dir . '*.sql');
    if ($files !== false) {
        sort($files, SORT_STRING);
        foreach ($files as $file) {
            $name = basename($file);
            $sql = (string) file_get_contents($file);
            if ($db->multi_query($sql)) {
                do {
                    if ($result = $db->store_result()) {
                        $result->free();
                    }
                } while ($db->more_results() && $db->next_result());
                $results[] = ['name' => $name, 'applied' => true];
            } else {
                relay_fail(500, "Seed {$name} failed: " . $db->error);
            }
        }
    }

    return $results;
}

/* ------------------------------------------------------------------ *
 *  CORS                                                              *
 * ------------------------------------------------------------------ */

function relay_cors(): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $allowed = array_filter(array_map('trim', explode(',', RELAY_ALLOWED_ORIGINS)));

    $match = in_array('*', $allowed, true)
        || in_array($origin, $allowed, true);

    if ($match) {
        header('Access-Control-Allow-Origin: ' . ($origin !== '' ? $origin : '*'));
        header('Access-Control-Allow-Headers: Content-Type, X-Relay-Signature');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Max-Age: 86400');
    }

    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

/* ------------------------------------------------------------------ *
 *  Request handling                                                  *
 * ------------------------------------------------------------------ */

relay_cors();
relay_require_https();

$action = $_GET['action'] ?? '';
if ($action === '') {
    relay_fail(400, 'Missing action.');
}

// Health check — deliberately open, no credentials required.
if ($action === 'ping') {
    relay_ok(['service' => 'db-relay', 'time' => date('c')]);
}

// Authenticated actions below.
if (PHP_SAPI === 'cli') {
    // Local CLI usage (migrations via php api.php migrate) is allowed.
    $body = $_SERVER['argv'][1] ?? '{}';
    $body = json_decode($body, true);
    if (!is_array($body)) {
        relay_fail(400, 'Invalid CLI payload.');
    }
} else {
    relay_rate_limit();
    $rawBody = (string) file_get_contents('php://input');
    $body = relay_verify_signature($rawBody);
}

$db = new mysqli(RELAY_DB_HOST, RELAY_DB_USER, RELAY_DB_PASSWORD, RELAY_DB_NAME, (int) RELAY_DB_PORT);
if ($db->connect_errno) {
    relay_fail(500, 'Database connection failed: ' . $db->connect_error);
}
$db->set_charset('utf8mb4');

try {
    switch ($action) {
        case 'query':
            relay_ok(['result' => relay_run_query($db, (string) ($body['query'] ?? ''), (array) ($body['params'] ?? []))]);
            break;

        case 'migrate':
            relay_ok(['migrations' => relay_run_migrations($db)]);
            break;

        case 'migrate_status':
            relay_ok(['migrations' => relay_migrations_status($db)]);
            break;

        case 'seed':
            relay_ok(['seeds' => relay_run_seeds($db)]);
            break;

        case 'sql':
            if (!RELAY_ALLOW_RAW_SQL) {
                relay_fail(403, 'Raw SQL is disabled. Enable RELAY_ALLOW_RAW_SQL in relay-config.php to use it.');
            }
            relay_ok(['result' => relay_run_raw_sql($db, (string) ($body['sql'] ?? ''), (array) ($body['params'] ?? []))]);
            break;

        default:
            relay_fail(400, "Unknown action: {$action}");
    }
} finally {
    $db->close();
}
