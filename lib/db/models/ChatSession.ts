/**
 * lib/db/models/ChatSession.ts
 * Table: ChatSession
 */

import { Model } from "../Model";

export class ChatSession extends Model {
  protected static tableName = "ChatSession";
  protected static queryPrefix = "chatSession";

  get userId(): string | null {
    const v = this.get("userId");
    return v == null ? null : String(v);
  }
  get userName(): string | null {
    const v = this.get("userName");
    return v == null ? null : String(v);
  }
  get userEmail(): string | null {
    const v = this.get("userEmail");
    return v == null ? null : String(v);
  }
  get status(): string {
    return String(this.get("status"));
  }
  get lastMessage(): string | null {
    const v = this.get("lastMessage");
    return v == null ? null : String(v);
  }
  get createdAt(): Date {
    return new Date(String(this.get("createdAt")));
  }
  get updatedAt(): Date {
    return new Date(String(this.get("updatedAt")));
  }
}
