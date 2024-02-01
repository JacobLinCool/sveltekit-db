import { env } from "$env/dynamic/private";
import type { D1Database } from "@cloudflare/workers-types";
import { Kysely } from "kysely";
import { D1Dialect } from "kysely-d1";

export class CloudflareD1<Schema> extends Kysely<Schema> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	constructor() {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const db = (env.D1 || env.DB || env.DATABASE) as unknown as D1Database;
		if (!db) {
			throw new Error("D1 database not available");
		}

		if (typeof db !== "object") {
			throw new Error("Wrong type for D1 binding");
		}

		super({
			// @ts-expect-error - types are wrong
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			dialect: new D1Dialect({ database: db }),
		});
	}
}
