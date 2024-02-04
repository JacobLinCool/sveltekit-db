import { building } from "$app/environment";
import { env } from "$env/dynamic/private";

export const DB_COMPONENT = building
	? undefined
	: env.DB_COMPONENT
		? env.DB_COMPONENT
		: env.CF_PAGES
			? "cloudflare-d1"
			: undefined;

export const SQLITE_FILE = (building ? undefined : env.SQLITE_FILE) || "db.sqlite";
