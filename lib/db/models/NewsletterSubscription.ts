/**
 * lib/db/models/NewsletterSubscription.ts
 * Table: NewsletterSubscription
 */

import { Model } from "../Model";

export class NewsletterSubscription extends Model {
  protected static tableName = "NewsletterSubscription";
  protected static queryPrefix = "newsletterSubscription";

  get email(): string {
    return String(this.get("email"));
  }
  get status(): string {
    return String(this.get("status"));
  }
  get createdAt(): Date {
    return new Date(String(this.get("createdAt")));
  }
}
