/**
 * lib/db/models/Session.ts
 * Table: Session
 */

import { Model } from "../Model";

export class Session extends Model {
  protected static tableName = "Session";
  protected static queryPrefix = "session";

  get sessionToken(): string {
    return String(this.get("sessionToken"));
  }
  get userId(): string {
    return String(this.get("userId"));
  }
  get expires(): Date {
    return new Date(String(this.get("expires")));
  }
}
