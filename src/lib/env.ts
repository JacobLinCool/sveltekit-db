import { env } from "$env/dynamic/private";

export const DB_COMPONENT = env.DB_COMPONENT
	? env.DB_COMPONENT
	: env.CF_PAGES
	? "cloudflare-d1"
	: undefined;

export const SQLITE_FILE = env.SQLITE_FILE || "db.sqlite";
