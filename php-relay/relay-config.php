<?php
/**
 * relay-config.php — Database Relay configuration
 * ================================================
 * Copy this file to your cPanel server, edit the values, and keep it
 * OUTSIDE public_html if possible. If it must live in public_html, the
 * .php extension still means it is executed by PHP, never served as text.
 *
 * Generate a strong secret locally:
 *   php -r "echo bin2hex(random_bytes(32)), PHP_EOL;"
 * or:  openssl rand -hex 32
 */

/* MySQL connection (cPanel: use the same host/user/password as the DB you
 * created in cPanel's MySQL Databases panel). "localhost" is the point of
 * this relay — PHP runs on the same host as MySQL, so localhost works. */
const RELAY_DB_HOST     = 'localhost';
const RELAY_DB_PORT     = 3306;
const RELAY_DB_NAME     = 'cyberwizdev';
const RELAY_DB_USER     = 'root';
const RELAY_DB_PASSWORD = 'root';

/* Shared secret between the app and this relay. The app signs every request
 * with HMAC-SHA256 using this value. Treat it like a password — do not
 * commit it to git, and use a DIFFERENT value in production. */
const RELAY_API_SECRET = 'edehiekhdkjdhjsahjfjfhjfhjkfhjs';

/* Signed requests are rejected if their timestamp is older than this many
 * seconds (replay protection). 60 seconds is a sane default. */
const RELAY_TTL_SECONDS = 60;

/* Per-IP rate limit: max requests per window. */
const RELAY_RATE_LIMIT_MAX    = 120;
const RELAY_RATE_LIMIT_WINDOW = 60;

/* Comma-separated allowed CORS origins, or '*' to allow any origin.
 * Prefer listing your real app origin(s), e.g. 'https://yourdomain.com'. */
const RELAY_ALLOWED_ORIGINS = '*';

/* If true, the action=sql endpoint becomes available, letting callers send
 * arbitrary parameterized SQL. Keep this OFF unless you truly need it —
 * the whitelisted action=query registry is the safe path. */
const RELAY_ALLOW_RAW_SQL = true;

/* Absolute or relative path to the migrations folder on the server.
 * Defaults to the "migrations" folder next to this file. */
const RELAY_MIGRATIONS_PATH = __DIR__ . '/migrations';

/* Absolute or relative path to the seeds folder on the server. */
const RELAY_SEEDS_PATH = __DIR__ . '/seeds';
