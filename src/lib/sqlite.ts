import type { Database as DBInstance } from "better-sqlite3";
import debug from "debug";
import { Kysely, SqliteDialect } from "kysely";
import { SQLITE_FILE } from "./env.js";

const log = debug("sveltekit-db:sqlite");

export const SQLiteDBCache = new Map<string, DBInstance>();

export class SQLiteDB<Schema> extends Kysely<Schema> {
	constructor() {
		super({
			dialect: new SqliteDialect({
				database: async () => {
					if (SQLiteDBCache.has(SQLITE_FILE)) {
						return SQLiteDBCache.get(SQLITE_FILE) as DBInstance;
					}

					const lib = "better-sqlite3";
					const { default: DB } = await import(/* @vite-ignore */ lib);
					const db = new DB(SQLITE_FILE, { verbose: log }) as DBInstance;
					SQLiteDBCache.set(SQLITE_FILE, db);
					return db;
				},
			}),
		});
	}
}
