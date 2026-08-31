/**
 * lib/db/models/ChatMessage.ts
 * Table: ChatMessage
 */

import { Model } from "../Model";

export class ChatMessage extends Model {
  protected static tableName = "ChatMessage";
  protected static queryPrefix = "chatMessage";

  get sessionId(): string {
    return String(this.get("sessionId"));
  }
  get message(): string {
    return String(this.get("message"));
  }
  get sender(): string {
    return String(this.get("sender"));
  }
  get senderName(): string | null {
    const v = this.get("senderName");
    return v == null ? null : String(v);
  }
  get createdAt(): Date {
    return new Date(String(this.get("createdAt")));
  }
  get read(): boolean {
    return Boolean(this.get("read"));
  }
}
