/**
 * lib/db/models/VerificationToken.ts
 * Table: VerificationToken
 */

import { Model } from "../Model";

export class VerificationToken extends Model {
  protected static tableName = "VerificationToken";
  protected static queryPrefix = "verificationToken";

  get identifier(): string {
    return String(this.get("identifier"));
  }
  get token(): string {
    return String(this.get("token"));
  }
  get expires(): Date {
    return new Date(String(this.get("expires")));
  }
}
