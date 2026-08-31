/**
 * lib/db/models/Account.ts
 * Table: Account
 */

import { Model } from "../Model";

export class Account extends Model {
  protected static tableName = "Account";
  protected static queryPrefix = "account";

  get userId(): string {
    return String(this.get("userId"));
  }
  get type(): string {
    return String(this.get("type"));
  }
  get provider(): string {
    return String(this.get("provider"));
  }
  get providerAccountId(): string {
    return String(this.get("providerAccountId"));
  }
  get refresh_token(): string | null {
    const v = this.get("refresh_token");
    return v == null ? null : String(v);
  }
  get access_token(): string | null {
    const v = this.get("access_token");
    return v == null ? null : String(v);
  }
  get expires_at(): number | null {
    const v = this.get("expires_at");
    return v == null ? null : Number(v);
  }
  get token_type(): string | null {
    const v = this.get("token_type");
    return v == null ? null : String(v);
  }
  get scope(): string | null {
    const v = this.get("scope");
    return v == null ? null : String(v);
  }
  get id_token(): string | null {
    const v = this.get("id_token");
    return v == null ? null : String(v);
  }
  get session_state(): string | null {
    const v = this.get("session_state");
    return v == null ? null : String(v);
  }
}
