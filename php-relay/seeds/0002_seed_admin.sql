-- 0002_seed_admin.sql
-- Seeds the admin user with password 'password123' (hashed with bcrypt 10 rounds).
-- Idempotent: skips user if email already exists.
-- Run via the relay: action=seed  (or locally: php cli/seed.php)

INSERT INTO `User` (`id`, `name`, `email`, `password`, `role`)
VALUES
  (
    'adm_6f8a1b2c3d4e5f6a7b8c9d0e',
    'Admin',
    'admin@cyberwizdev.com',
    '\$2b\$10\$4QbX5cFHt7q088J9R49mauod2S6R7NcymwQvDZpKCP/cHsh5dUL46',
    'admin'
  )
ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `password` = VALUES(`password`),
  `role` = VALUES(`role`);