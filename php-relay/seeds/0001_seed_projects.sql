-- 0001_seed_projects.sql
-- Seeds the Project table from the live www.cyberwizdev.com portfolio.
-- Idempotent: skips a project if its slug already exists.
-- Run via the relay: action=seed  (or locally: php cli/seed.php)

INSERT INTO `Project` (`id`, `title`, `slug`, `description`, `longDescription`, `image`, `githubUrl`, `demoUrl`, `status`, `sortOrder`)
VALUES
  (
    'cseed_school_mgmt_00000001',
    'School Management System',
    'school-management-system',
    'A modern school management system built with Vite (React) and ExpressJS (Node.js), featuring real-time app data for analytics and chart.',
    'A comprehensive school management platform delivering real-time analytics, charts, and an intuitive dashboard. Built with React (Vite) and ExpressJS, it streamlines administration, tracks performance, and keeps parents, teachers, and students in sync. Featuring live data updates powered by Socket.io, a TypeScript codebase, and a polished Tailwind CSS interface.',
    '/portfolio/school-management.png',
    'https://github.com/hallel20/school',
    'https://school.cyberwizdev.com.ng/',
    'active',
    1
  ),
  (
    'cseed_healthcare_00000002',
    'Healthcare Management System',
    'healthcare-management-system',
    'A comprehensive healthcare management system with appointment scheduling and patient records management.',
    'A comprehensive healthcare management system designed to modernize clinics and hospitals. It handles appointment scheduling, patient records, and clinical workflows in one place, helping staff reduce paperwork and improve patient care. Built with React, Node.js, and PostgreSQL, containerized with Docker for reliable deployments.',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80',
    'https://github.com/hallel20/health-care',
    'https://health-care.pxxl.click',
    'active',
    2
  ),
  (
    'cseed_realestate_00000003',
    'Real Estate Platform',
    'real-estate-platform',
    'A feature-rich real estate platform with virtual tours and advanced property search capabilities.',
    'A feature-rich real estate platform offering immersive virtual tours and advanced property search. Buyers can explore listings with rich media and powerful filters, while agents get a robust dashboard for managing inventory. Powered by React (Vite) on the frontend and Flask with MariaDB on the backend, deployed with Docker.',
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80',
    'https://github.com/hallel20/real-estate',
    'https://www.havenca.xyz',
    'active',
    3
  )
ON DUPLICATE KEY UPDATE
  `title` = VALUES(`title`),
  `description` = VALUES(`description`),
  `longDescription` = VALUES(`longDescription`),
  `image` = VALUES(`image`),
  `githubUrl` = VALUES(`githubUrl`),
  `demoUrl` = VALUES(`demoUrl`),
  `status` = VALUES(`status`),
  `sortOrder` = VALUES(`sortOrder`);
