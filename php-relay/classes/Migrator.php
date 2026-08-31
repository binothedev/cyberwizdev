<?php
/**
 * Migrator.php — runs the SQL files in migrations/ (and seeds/)
 *
 * Used two ways:
 *   1. Through the relay API:  action=migrate / action=seed / action=migrate_status
 *   2. Locally on the server:  php cli/migrate.php  or  php cli/seed.php
 *
 * Every migration file runs inside a transaction, and the file name is
 * recorded in `_relay_migrations` so it only ever runs once.
 */

declare(strict_types=1);

require_once __DIR__ . '/../relay-config.php';

class Migrator
{
    private mysqli $db;

    public function __construct(?mysqli $db = null)
    {
        $this->db = $db ?? new mysqli(
            RELAY_DB_HOST,
            RELAY_DB_USER,
            RELAY_DB_PASSWORD,
            RELAY_DB_NAME,
            (int) RELAY_DB_PORT
        );
        if ($this->db->connect_errno) {
            throw new RuntimeException('DB connection failed: ' . $this->db->connect_error);
        }
        $this->db->set_charset('utf8mb4');
    }

    private function migrationsDir(): string
    {
        $dir = rtrim(RELAY_MIGRATIONS_PATH, '/\\');
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }
        return $dir . DIRECTORY_SEPARATOR;
    }

    private function seedsDir(): string
    {
        $dir = rtrim(RELAY_SEEDS_PATH, '/\\');
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }
        return $dir . DIRECTORY_SEPARATOR;
    }

    private function ensureTable(): void
    {
        $this->db->query(
            "CREATE TABLE IF NOT EXISTS `_relay_migrations` (
                `name` VARCHAR(255) NOT NULL PRIMARY KEY,
                `applied_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4"
        );
    }

    /** @return string[] sorted migration file names */
    public function pendingFiles(): array
    {
        $this->ensureTable();
        $files = glob($this->migrationsDir() . '*.sql') ?: [];
        $files = array_map('basename', $files);
        sort($files, SORT_STRING);

        $applied = [];
        $res = $this->db->query('SELECT name FROM `_relay_migrations`');
        if ($res !== false) {
            while ($row = $res->fetch_assoc()) {
                $applied[$row['name']] = true;
            }
        }

        return array_values(array_filter($files, fn (string $f) => !isset($applied[$f])));
    }

    /** @return array{name: string, applied: bool, skipped: bool}[] */
    public function migrate(): array
    {
        $results = [];
        foreach ($this->pendingFiles() as $file) {
            $sql = (string) file_get_contents($this->migrationsDir() . $file);

            $this->db->begin_transaction();
            try {
                if (!$this->db->multi_query($sql)) {
                    throw new RuntimeException('Migration failed: ' . $this->db->error);
                }
                // Drain remaining result sets so the next statement can run.
                do {
                    if ($result = $this->db->store_result()) {
                        $result->free();
                    }
                } while ($this->db->more_results() && $this->db->next_result());

                $stmt = $this->db->prepare('INSERT INTO `_relay_migrations` (name) VALUES (?)');
                $stmt->bind_param('s', $file);
                $stmt->execute();
                $stmt->close();

                $this->db->commit();
                $results[] = ['name' => $file, 'applied' => true, 'skipped' => false];
            } catch (Throwable $e) {
                $this->db->rollback();
                $results[] = ['name' => $file, 'applied' => false, 'skipped' => false, 'error' => $e->getMessage()];
                break; // stop at first failure so the DB stays consistent
            }
        }
        return $results;
    }

    /** @return array{name: string, applied: bool, applied_at: ?string}[] */
    public function status(): array
    {
        $this->ensureTable();
        $applied = [];
        $res = $this->db->query('SELECT name, applied_at FROM `_relay_migrations` ORDER BY name');
        if ($res !== false) {
            while ($row = $res->fetch_assoc()) {
                $applied[$row['name']] = $row['applied_at'];
            }
        }

        $status = [];
        foreach (glob($this->migrationsDir() . '*.sql') ?: [] as $file) {
            $name = basename($file);
            $status[] = [
                'name' => $name,
                'applied' => isset($applied[$name]),
                'applied_at' => $applied[$name] ?? null,
            ];
        }
        usort($status, fn ($a, $b) => strcmp($a['name'], $b['name']));
        return $status;
    }

    /** @return array{name: string, applied: bool}[] */
    public function seed(): array
    {
        $results = [];
        foreach (glob($this->seedsDir() . '*.sql') ?: [] as $file) {
            $name = basename($file);
            $sql = (string) file_get_contents($file);

            $this->db->begin_transaction();
            try {
                if (!$this->db->multi_query($sql)) {
                    throw new RuntimeException('Seed failed: ' . $this->db->error);
                }
                do {
                    if ($result = $this->db->store_result()) {
                        $result->free();
                    }
                } while ($this->db->more_results() && $this->db->next_result());
                $this->db->commit();
                $results[] = ['name' => $name, 'applied' => true];
            } catch (Throwable $e) {
                $this->db->rollback();
                $results[] = ['name' => $name, 'applied' => false, 'error' => $e->getMessage()];
            }
        }
        return $results;
    }

    public function close(): void
    {
        $this->db->close();
    }
}
