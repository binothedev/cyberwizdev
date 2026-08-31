/**
 * lib/db/models/Newsletter.ts
 * Table: Newsletter
 */

import { Model } from "../Model";

export class Newsletter extends Model {
  protected static tableName = "Newsletter";
  protected static queryPrefix = "newsletter";

  get subject(): string {
    return String(this.get("subject"));
  }
  get content(): string {
    return String(this.get("content"));
  }
  get sentAt(): Date {
    return new Date(String(this.get("sentAt")));
  }
  get sentBy(): string {
    return String(this.get("sentBy"));
  }
  get sentCount(): number {
    return Number(this.get("sentCount"));
  }
}
