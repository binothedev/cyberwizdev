/**
 * lib/db/Model.ts
 * Base class for the app-side ORM.
 *
 * Each model class maps to one MySQL table and issues raw SQL through the
 * PHP relay (lib/db/relay.ts). The relay only executes the whitelisted
 * queries registered in php-relay/api.php under the same action names.
 *
 * The method signatures mirror Prisma so the swap is mechanical:
 *   Model.findUnique({ where: { id } })
 *   Model.findMany({ where, orderBy })
 *   Model.create({ data })
 *   Model.update({ where, data })
 *   Model.delete({ where })
 */

import { relayRequest, cuid as generateCuid } from "./relay";

/** Prisma-style orderBy: single { column: "asc" | "desc" } or array of them. */
type OrderBy = Record<string, "asc" | "desc"> | Record<string, "asc" | "desc">[];

interface FindManyArgs {
  where?: Record<string, unknown>;
  orderBy?: OrderBy;
  take?: number;
  skip?: number;
}

interface FindUniqueArgs {
  where: Record<string, unknown>;
}

interface CreateArgs {
  data: Record<string, unknown>;
}

interface UpdateArgs {
  where: Record<string, unknown>;
  data: Record<string, unknown>;
}

interface DeleteArgs {
  where: Record<string, unknown>;
}

/** Static side of a Model subclass, typed so subclass instances come back. */
type ModelConstructor<T extends Model> = (new () => T) & typeof Model;

export class Model {
  /** MySQL table name (matches Prisma model / relay registry), e.g. "Contact". */
  protected static tableName = "";
  /** Relay registry prefix, e.g. "contact". */
  protected static queryPrefix = "";

  /** Raw attribute set of the instance. */
  protected data: Record<string, unknown> = {};

  /* ------------------------------------------------------------ *
   *  Transport                                                   *
   * ------------------------------------------------------------ */

  /** POST an action to the relay and return the result rows. */
  protected static async run(
    action: string,
    params: Record<string, unknown>
  ): Promise<{ rows: Record<string, unknown>[]; affected: number; insertId: number | null }> {
    const response = await relayRequest("query", {
      query: `${this.queryPrefix}.${action}`,
      params,
    });
    return {
      rows: (response.result?.rows as Record<string, unknown>[]) ?? [],
      affected: response.result?.affected ?? 0,
      insertId: response.result?.insertId ?? null,
    };
  }

  /* ------------------------------------------------------------ *
   *  Query builder (raw SQL via relay)                           *
   * ------------------------------------------------------------ */

  /**
   * SELECT builder. Every value is bound as a parameter by the relay, so
   * identifiers here are always trusted column names from this file.
   */
  protected static query(): SelectBuilder {
    return new SelectBuilder(this);
  }

  /* ------------------------------------------------------------ *
   *  Static finders (mirror Prisma)                              *
   * ------------------------------------------------------------ */

  static async findUnique<T extends Model>(this: new () => T, args: FindUniqueArgs): Promise<T | null> {
    const ModelClass = this as unknown as ModelConstructor<T>;
    const entries = Object.entries(args.where);
    if (entries.length !== 1) {
      throw new Error("findUnique expects exactly one where field (the unique column).");
    }
    const [column, value] = entries[0];
    const result = await ModelClass.run("findUnique", { [column]: value });
    return result.rows[0] ? ModelClass.hydrate(result.rows[0]) : null;
  }

  static async findMany<T extends Model>(this: new () => T, args: FindManyArgs = {}): Promise<T[]> {
    const ModelClass = this as unknown as ModelConstructor<T>;

    let builder = ModelClass.query().select("*");
    const where = args.where ?? {};
    for (const [column, value] of Object.entries(where)) {
      builder = builder.where(column, value);
    }

    let orderSql = "";
    const orderBy = args.orderBy ? (Array.isArray(args.orderBy) ? args.orderBy : [args.orderBy]) : [];
    for (const clause of orderBy) {
      for (const [column, dir] of Object.entries(clause)) {
        const direction = String(dir).toLowerCase() === "desc" ? "DESC" : "ASC";
        orderSql = `${orderSql !== "" ? ", " : ""}${column} ${direction}`;
      }
    }
    if (orderSql !== "") {
      builder = builder.orderByRaw(orderSql);
    }
    if (args.take !== undefined) {
      builder = builder.limit(args.take);
    }
    if (args.skip !== undefined) {
      builder = builder.offset(args.skip);
    }

    const result = await builder.get();
    return result.map((row) => ModelClass.hydrate(row));
  }

  static async findFirst<T extends Model>(this: new () => T, args: FindManyArgs = {}): Promise<T | null> {
    const rows = await (this as unknown as ModelConstructor<T>).findMany<T>({ ...args, take: 1 });
    return rows[0] ?? null;
  }

  /** Raw SELECT with bound params — for queries the builder can't express. */
  static async rawQuery<T extends Model>(
    this: new () => T,
    sql: string,
    params: unknown[] = []
  ): Promise<Record<string, unknown>[]> {
    const ModelClass = this as unknown as ModelConstructor<T>;
    const response = await relayRequest("sql", { sql, params });
    return (response.result?.rows as Record<string, unknown>[]) ?? [];
  }

  /* ------------------------------------------------------------ *
   *  Writes (mirror Prisma)                                      *
   * ------------------------------------------------------------ */

  static async create<T extends Model>(this: new () => T, args: CreateArgs): Promise<T> {
    const ModelClass = this as unknown as ModelConstructor<T>;
    const data = { ...args.data };
    if (data.id === undefined || data.id === null) {
      data.id = generateCuid();
    }

    const result = await ModelClass.run("create", data);
    const saved = result.rows[0] ?? data;
    return ModelClass.hydrate(saved);
  }

  static async update<T extends Model>(
    this: new () => T,
    args: UpdateArgs
  ): Promise<T> {
    const ModelClass = this as unknown as ModelConstructor<T>;
    const entries = Object.entries(args.where);
    if (entries.length !== 1) {
      throw new Error("update expects exactly one where field.");
    }
    const result = await ModelClass.run("update", {
      ...args.data,
      [entries[0][0]]: entries[0][1],
    });
    // The relay returns affected rows; reload the row for a complete object.
    const fresh = await ModelClass.findUnique<T>({ where: { [entries[0][0]]: entries[0][1] } });
    if (fresh) {
      return fresh;
    }
    const row = result.rows[0] ?? { ...args.data, ...args.where };
    return ModelClass.hydrate(row);
  }

  static async delete<T extends Model>(this: new () => T, args: DeleteArgs): Promise<void> {
    const ModelClass = this as unknown as ModelConstructor<T>;
    const entries = Object.entries(args.where);
    if (entries.length !== 1) {
      throw new Error("delete expects exactly one where field.");
    }
    await ModelClass.run("delete", { [entries[0][0]]: entries[0][1] });
  }

  /** Delete many rows matching a single-column equality. Returns count. */
  static async deleteMany<T extends Model>(
    this: new () => T,
    where: Record<string, unknown>
  ): Promise<number> {
    const ModelClass = this as unknown as ModelConstructor<T>;
    const rows = await ModelClass.findMany<T>({ where });
    for (const row of rows) {
      await ModelClass.delete({ where: { id: row.get("id") } });
    }
    return rows.length;
  }

  /* ------------------------------------------------------------ *
   *  Instance API                                                *
   * ------------------------------------------------------------ */

  get(column: string): unknown {
    return this.data[column];
  }

  set(column: string, value: unknown): this {
    this.data[column] = value;
    return this;
  }

  toObject(): Record<string, unknown> {
    return { ...this.data };
  }

  /** Persist changes to an existing row (relay updates by id). */
  async save(): Promise<this> {
    const id = this.data.id;
    if (!id) {
      throw new Error("Cannot save a model without an id. Use create() instead.");
    }
    const ModelClass = this.constructor as unknown as ModelConstructor<this>;
    await ModelClass.run("update", { ...this.data, id });
    return this;
  }

  async deleteInstance(): Promise<void> {
    const id = this.data.id;
    if (!id) {
      throw new Error("Cannot delete a model without an id.");
    }
    const ModelClass = this.constructor as unknown as ModelConstructor<this>;
    await ModelClass.run("delete", { id });
  }

  /* ------------------------------------------------------------ *
   *  Migrations / seeds                                          *
   * ------------------------------------------------------------ */

  static async migrate(): Promise<unknown[]> {
    const response = await relayRequest("migrate");
    return response.migrations ?? [];
  }

  static async migrateStatus(): Promise<unknown[]> {
    const response = await relayRequest("migrate_status");
    return response.migrations ?? [];
  }

  static async seed(): Promise<unknown[]> {
    const response = await relayRequest("seed");
    return response.seeds ?? [];
  }

  /* ------------------------------------------------------------ *
   *  Hydration                                                  *
   * ------------------------------------------------------------ */

  protected static hydrate<T extends Model>(this: ModelConstructor<T>, row: Record<string, unknown>): T {
    const model = new this();
    model.data = { ...row };
    return model;
  }

  /** Table name for subclasses; SelectBuilder needs to read it. */
  static getTableName(): string {
    return this.tableName;
  }
}

/* ---------------------------------------------------------------- *
 *  SelectBuilder — fluent raw-SQL SELECT via the relay             *
 * ---------------------------------------------------------------- */

export class SelectBuilder {
  private table: string;
  private columns = "*";
  private conditions: { sql: string; value: unknown }[] = [];
  private orderSql = "";
  private limitValue?: number;
  private offsetValue?: number;

  constructor(model: typeof Model) {
    this.table = model.getTableName();
  }

  select(...cols: string[]): this {
    this.columns = cols.length > 0 ? cols.join(", ") : "*";
    return this;
  }

  where(column: string, value: unknown, operator = "="): this {
    if (value === null || value === undefined) {
      this.conditions.push({ sql: `${column} IS NULL`, value: undefined });
      return this;
    }
    if (Array.isArray(value)) {
      const marks = value.map(() => "?").join(", ");
      this.conditions.push({ sql: `${column} IN (${marks})`, value });
      return this;
    }
    this.conditions.push({ sql: `${column} ${operator} ?`, value });
    return this;
  }

  whereLike(column: string, value: string): this {
    this.conditions.push({ sql: `${column} LIKE ?`, value: `%${value}%` });
    return this;
  }

  orderBy(column: string, direction: "asc" | "desc" = "asc"): this {
    this.orderSql = `${column} ${direction.toUpperCase()}`;
    return this;
  }

  orderByRaw(sql: string): this {
    this.orderSql = sql;
    return this;
  }

  limit(n: number): this {
    this.limitValue = n;
    return this;
  }

  offset(n: number): this {
    this.offsetValue = n;
    return this;
  }

  /** Build the final SQL + params. */
  toSql(): { sql: string; params: unknown[] } {
    let sql = `SELECT ${this.columns} FROM ${this.table}`;
    const params: unknown[] = [];

    if (this.conditions.length > 0) {
      sql += " WHERE " + this.conditions.map((c) => c.sql).join(" AND ");
      for (const c of this.conditions) {
        if (Array.isArray(c.value)) {
          params.push(...c.value);
        } else if (c.value !== undefined) {
          params.push(c.value);
        }
      }
    }
    if (this.orderSql !== "") {
      sql += ` ORDER BY ${this.orderSql}`;
    }
    if (this.limitValue !== undefined) {
      sql += ` LIMIT ${this.limitValue}`;
    }
    if (this.offsetValue !== undefined) {
      sql += ` OFFSET ${this.offsetValue}`;
    }
    return { sql, params };
  }

  /** Execute and return plain rows. */
  async get(): Promise<Record<string, unknown>[]> {
    const { sql, params } = this.toSql();
    const response = await relayRequest("sql", { sql, params });
    return (response.result?.rows as Record<string, unknown>[]) ?? [];
  }

  /** Execute and return the first row, or null. */
  async first(): Promise<Record<string, unknown> | null> {
    const rows = await this.limit(1).get();
    return rows[0] ?? null;
  }
}
