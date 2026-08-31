/**
 * lib/db/models/Contact.ts
 * Table: Contact
 */

import { Model } from "../Model";

export interface ContactRow {
  id: string;
  name: string;
  email: string;
  message: string;
  phone: string;
  status: string;
  createdAt: Date;
}

export class Contact extends Model {
  protected static tableName = "Contact";
  protected static queryPrefix = "contact";

  get name(): string {
    return String(this.get("name"));
  }
  get email(): string {
    return String(this.get("email"));
  }
  get message(): string {
    return String(this.get("message"));
  }
  get phone(): string {
    return String(this.get("phone"));
  }
  get status(): string {
    return String(this.get("status"));
  }
  get createdAt(): Date {
    return new Date(String(this.get("createdAt")));
  }
}
