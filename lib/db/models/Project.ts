/**
 * lib/db/models/Project.ts
 * Table: Project
 */

import { Model } from "../Model";

export class Project extends Model {
  protected static tableName = "Project";
  protected static queryPrefix = "project";

  get title(): string {
    return String(this.get("title"));
  }
  get slug(): string {
    return String(this.get("slug"));
  }
  get description(): string {
    return String(this.get("description"));
  }
  get longDescription(): string | null {
    const v = this.get("longDescription");
    return v == null ? null : String(v);
  }
  get image(): string {
    return String(this.get("image"));
  }
  get githubUrl(): string | null {
    const v = this.get("githubUrl");
    return v == null ? null : String(v);
  }
  get demoUrl(): string | null {
    const v = this.get("demoUrl");
    return v == null ? null : String(v);
  }
  get status(): string {
    return String(this.get("status"));
  }
  get sortOrder(): number {
    return Number(this.get("sortOrder"));
  }
  get createdAt(): Date {
    return new Date(String(this.get("createdAt")));
  }
  get updatedAt(): Date {
    return new Date(String(this.get("updatedAt")));
  }

  /**
   * Active projects in landing-page order.
   *
   * Goes through the whitelisted `project.findMany` relay query instead of
   * Model.findMany (which builds raw SQL), so it also works when
   * RELAY_ALLOW_RAW_SQL is disabled on the relay.
   */
  static async findActive(): Promise<Project[]> {
    const result = await this.run("findMany", { status: "active" });
    return result.rows.map((row) => this.hydrate(row));
  }
}
