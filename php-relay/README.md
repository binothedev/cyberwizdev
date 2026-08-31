# PHP Database Relay + App-Side ORM

Your Next.js app cannot reach MySQL on production (cPanel), but PHP runs on
the same host as the database. This project splits the problem in two:

1. **`php-relay/`** — a single PHP file (`api.php`) that you upload to cPanel.
   It connects to MySQL on `localhost` and executes queries. It is the *only*
   thing that ever touches the database on the server.
2. **App-side ORM (`lib/db/`)** — TypeScript model classes in the Next.js app
   with Prisma-like methods (`findUnique`, `findMany`, `create`, `update`,
   `delete`) that send *raw SQL* to the relay over HTTPS, signed with HMAC.

```
┌──────────────────────┐   HTTPS + HMAC signature   ┌─────────────────────────┐
│ Next.js app (Vercel) │ ─────────────────────────▶ │ cPanel PHP api.php      │
│ lib/db ORM           │   action=query / sql /     │   └─ mysqli → MySQL     │
│ (raw SQL + params)   │   migrate / seed           │      localhost:3306     │
└──────────────────────┘                            └─────────────────────────┘
```

## Files

| Path | Purpose |
| ---- | ------- |
| `php-relay/api.php` | Single-file HTTP relay. Auth, rate limiting, whitelisted queries, raw-SQL mode, migrations, seeds. |
| `php-relay/relay-config.php` | MySQL credentials, shared secret, CORS, TTL, rate-limit knobs. |
| `php-relay/migrations/*.sql` | Schema SQL files (mirror of `prisma/schema.prisma`). |
| `php-relay/classes/Migrator.php` | Migration/seed runner (transactional, tracks `_relay_migrations`). |
| `php-relay/cli/*.php` | Run migrations/seeds directly on the server via SSH/terminal. |
| `lib/db/relay.ts` | App-side HTTP client: HMAC-SHA256 signing, timestamp, errors. |
| `lib/db/Model.ts` | Base ORM class + fluent `SelectBuilder` (raw SQL via relay). |
| `lib/db/models/*.ts` | One class per Prisma model (11 models). |
| `scripts/migrate.ts` | App-side migration runner (`npx tsx scripts/migrate.ts`). |

## Security layers (in `api.php`)

- **HMAC-SHA256 signature** — every request body is signed with the shared
  secret (`X-Relay-Signature` header). The relay recomputes and compares in
  constant time.
- **Replay protection** — every body includes `ts` (unix seconds); requests
  older than `RELAY_TTL_SECONDS` (default 60) are rejected.
- **HTTPS enforced** — non-loopback HTTP requests are refused.
- **Rate limiting** — per-IP windowed limit (default 120 req/min).
- **No raw SQL by default** — callers use named actions from a whitelist
  (`query`), each mapping to a fixed prepared statement. Arbitrary SQL
  (`action=sql`) is available but **disabled** unless `RELAY_ALLOW_RAW_SQL=true`.
- **Prepared statements everywhere** — every value is bound; no string-built SQL.

## Deploy the relay (cPanel)

1. Create a database + DB user in cPanel → MySQL Databases. Note the host,
   user, password, database name.
2. Generate a strong secret: `openssl rand -hex 32` (or
   `php -r "echo bin2hex(random_bytes(32));"`).
3. Edit `php-relay/relay-config.php`:
   - `RELAY_DB_HOST` = `localhost`, plus name/user/password.
   - `RELAY_API_SECRET` = your generated secret.
   - `RELAY_ALLOWED_ORIGINS` = your app origin (or `*`).
4. Upload **the whole `php-relay/` folder** to a directory in your cPanel
   account — ideally **outside `public_html`** (e.g. `~/relay/`). If it must
   be inside `public_html`, put it in a subfolder like `public_html/relay/`.
   - If it's outside `public_html`, create a tiny `public_html/relay.php` that
     `require_once`s it, or use cPanel's **Application Manager**.
   - Simplest option: upload as `public_html/relay/api.php` — it works as-is.
5. Test the health check in a browser:
   `https://yourdomain.com/relay/api.php?action=ping`
   → `{"ok":true,"service":"db-relay",...}`
6. Run migrations — either:
   - Locally from your machine: `npx tsx scripts/migrate.ts` (hits the relay),
   - or on the server: `cd relay && php cli/migrate.php`.

## Configure the app

Add to `.env` (mirror `RELAY_API_SECRET` from `relay-config.php`):

```env
RELAY_URL="https://yourdomain.com/relay/api.php"
RELAY_SECRET="<same secret as relay-config.php>"
```

## Using the ORM

The API mirrors Prisma, so the existing route code is nearly unchanged:

```ts
import { Project } from "@/lib/db/models/Project";

const projects = await Project.findMany({
  where: { status: "active" },
  orderBy: { sortOrder: "asc" },
});

const one = await Project.findUnique({ where: { id } });
await Project.create({ data: { title, slug, ... } });
await Project.update({ where: { id }, data: { status: "archived" } });
await Project.delete({ where: { id } });
```

Instances expose typed getters (`project.title`, `project.slug`), `toObject()`,
`get()`, `save()`, and `deleteInstance()`. For complex queries, the fluent
builder sends raw parameterized SQL:

```ts
import { Project } from "@/lib/db/models/Project";

const rows = await Project.query() // protected — use rawQuery or the model statics
```

```ts
// Any raw SELECT with bound params, via action=sql:
const rows = await Project.rawQuery(
  "SELECT * FROM Project WHERE status = ? ORDER BY sortOrder DESC",
  ["active"]
);
```

## Adding a migration

1. Add `php-relay/migrations/0002_something.sql`.
2. Deploy the new file to the server.
3. `npx tsx scripts/migrate.ts` — it applies only files not yet recorded in
   `_relay_migrations` (each in a transaction).

## Migrating existing Prisma data

If your production DB already has Prisma's tables, you do **not** need to run
`0001_init.sql` (the tables exist). Just deploy the relay and use it. The
migration file exists to create the schema from scratch on a new environment.
To skip it on an existing DB, run `migrate_status` first — you can mark
`0001_init.sql` applied by creating a matching row in `_relay_migrations`, or
simply delete `0001_init.sql` from the deployed server after the schema exists.

## Notes

- `prisma/prisma.ts` and `@prisma/client` are no longer imported by app code.
  You can keep the Prisma CLI for local schema work, or remove it once the
  relay is the only DB path.
- The relay uses `mysqli`; cPanel's PHP always ships with it.
- `scripts/create-admin.ts` now uses the ORM — it needs `RELAY_URL`/`RELAY_SECRET`.
