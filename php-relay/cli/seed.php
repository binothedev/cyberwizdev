<?php
/**
 * cli/seed.php — run seed SQL files directly on the server
 *
 * Usage:  php cli/seed.php
 */

declare(strict_types=1);

require_once __DIR__ . '/../classes/Migrator.php';

$migrator = new Migrator();
echo json_encode($migrator->seed(), JSON_PRETTY_PRINT), PHP_EOL;
$migrator->close();
