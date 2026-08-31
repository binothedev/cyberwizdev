/**
 * scripts/migrate.ts
 * Run migrations / seeds through the PHP relay.
 *
 * Usage:
 *   npx tsx scripts/migrate.ts             # apply pending migrations
 *   npx tsx scripts/migrate.ts status      # show migration status
 *   npx tsx scripts/migrate.ts seed        # run seeds
 *
 * Requires RELAY_URL and RELAY_SECRET in .env (same values the PHP
 * relay-config.php uses).
 */

import "dotenv/config";
import { relayRequest } from "../lib/db/relay";

async function main() {
  const command = process.argv[2] ?? "migrate";

  try {
    if (command === "status") {
      const res = await relayRequest("migrate_status");
      console.table(res.migrations ?? []);
      return;
    }

    if (command === "seed") {
      const res = await relayRequest("seed");
      console.log(JSON.stringify(res.seeds ?? [], null, 2));
      return;
    }

    const res = await relayRequest("migrate");
    console.log(JSON.stringify(res.migrations ?? [], null, 2));
  } catch (err) {
    console.error("Migration failed:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
