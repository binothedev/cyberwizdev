<?php
/**
 * cli/migrate.php — run migrations directly on the server
 *
 * Usage:  php cli/migrate.php
 *         php cli/migrate.php status
 *
 * This bypasses the HTTP API entirely (uses the local MySQL connection
 * from relay-config.php), which is handy for deploying before the app is up.
 */

declare(strict_types=1);

require_once __DIR__ . '/../classes/Migrator.php';

$migrator = new Migrator();

if (($argv[1] ?? '') === 'status') {
    echo json_encode($migrator->status(), JSON_PRETTY_PRINT), PHP_EOL;
    $migrator->close();
    exit(0);
}

echo json_encode($migrator->migrate(), JSON_PRETTY_PRINT), PHP_EOL;
$migrator->close();
