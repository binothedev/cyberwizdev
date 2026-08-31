/**
 * lib/db/models/User.ts
 * Table: User
 */

import { Model } from "../Model";

export class User extends Model {
  protected static tableName = "User";
  protected static queryPrefix = "user";

  get name(): string | null {
    const v = this.get("name");
    return v == null ? null : String(v);
  }
  get email(): string {
    return String(this.get("email"));
  }
  get emailVerified(): Date | null {
    const v = this.get("emailVerified");
    return v == null ? null : new Date(String(v));
  }
  get image(): string | null {
    const v = this.get("image");
    return v == null ? null : String(v);
  }
  get password(): string {
    return String(this.get("password"));
  }
  get role(): string {
    return String(this.get("role"));
  }
  get createdAt(): Date {
    return new Date(String(this.get("createdAt")));
  }
  get updatedAt(): Date {
    return new Date(String(this.get("updatedAt")));
  }
}
