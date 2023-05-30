import { building } from "$app/environment";
import type { Kysely } from "kysely";
import { CloudflareD1 } from "./cloudflare-d1/index.js";
import { DB_COMPONENT } from "./env.js";
import { SQLiteDB } from "./sqlite.js";
import { UnimplementedDB } from "./unimplemented.js";

export function DB<Schema = Record<string, unknown>>(): Kysely<Schema> {
	if (building) {
		return new UnimplementedDB();
	}

	if (DB_COMPONENT === "cloudflare-d1") {
		return new CloudflareD1();
	}

	if (DB_COMPONENT === "sqlite") {
		return new SQLiteDB();
	}

	return new UnimplementedDB();
}

export * from "./env.js";
export * from "./unimplemented.js";
export * from "./sqlite.js";
export * from "./cloudflare-d1/index.js";
