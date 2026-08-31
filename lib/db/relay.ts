/**
 * lib/db/relay.ts
 * HTTP client for the PHP database relay (php-relay/api.php).
 *
 * The Next.js app cannot reach MySQL on production, but the PHP relay runs
 * on the same host as the database (cPanel localhost). Every request is
 * HMAC-SHA256 signed over the raw JSON body, timestamped for replay
 * protection, and verified by the relay before any SQL runs.
 *
 * env vars:
 *   RELAY_URL      e.g. https://yourdomain.com/php-relay/api.php
 *   RELAY_SECRET   shared HMAC secret (same as RELAY_API_SECRET in relay-config.php)
 *   RELAY_TTL_SECONDS (optional, default 60)
 */

import { createHmac, randomUUID } from "crypto";

export interface RelayResult {
  rows: Record<string, unknown>[];
  count: number;
  affected: number;
  insertId: number | null;
}

export interface RelayResponse {
  ok: boolean;
  error?: string;
  result?: RelayResult;
  migrations?: unknown[];
  seeds?: unknown[];
  [key: string]: unknown;
}

const RELAY_URL = process.env.RELAY_URL ?? "";
const RELAY_SECRET = process.env.RELAY_SECRET ?? "";
const RELAY_TTL = Number(process.env.RELAY_TTL_SECONDS ?? 60);

if (!RELAY_URL || !RELAY_SECRET) {
  console.warn(
    "[relay] RELAY_URL or RELAY_SECRET is missing. Set them in .env (see .env.example)."
  );
}

/**
 * Sign and POST a request to the relay.
 *
 * @param action relay endpoint: query | migrate | migrate_status | seed | sql
 * @param body   request payload (already in "named params" form for query)
 */
export async function relayRequest(
  action: string,
  body: Record<string, unknown> = {}
): Promise<RelayResponse> {
  if (!RELAY_URL || !RELAY_SECRET) {
    throw new Error(
      "Database relay is not configured. Set RELAY_URL and RELAY_SECRET in .env"
    );
  }

  const payload = JSON.stringify({ ts: Math.floor(Date.now() / 1000), ...body });
  const signature = createHmac("sha256", RELAY_SECRET).update(payload).digest("hex");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  let response: Response;
  try {
    response = await fetch(`${RELAY_URL}?action=${encodeURIComponent(action)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Relay-Signature": signature,
      },
      body: payload,
      signal: controller.signal,
      cache: "no-store",
    });
  } catch (err) {
    throw new Error(
      `Relay request to ${action} failed: ${err instanceof Error ? err.message : String(err)}`
    );
  } finally {
    clearTimeout(timeout);
  }

  const text = await response.text();
  let json: RelayResponse;
  try {
    json = JSON.parse(text) as RelayResponse;
  } catch {
    throw new Error(`Relay returned non-JSON (HTTP ${response.status}): ${text.slice(0, 300)}`);
  }

  if (!response.ok || json.ok !== true) {
    throw new Error(`Relay error (HTTP ${response.status}): ${json.error ?? "unknown"}`);
  }

  return json;
}

/** Generate a Prisma-style cuid for ids created app-side. */
export function cuid(): string {
  const timestamp = Math.floor(Date.now() / 1000).toString(36);
  const random = randomUUID().replace(/-/g, "").slice(0, 16);
  return `c${timestamp}${random}`;
}
