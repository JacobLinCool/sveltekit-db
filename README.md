# SvelteKit DB

Cross-platform database solution for SvelteKit.

```sh
pnpm i -D sveltekit-db
```

## Usage

`sveltekit-db` uses `kysely` under the hood.

You can define your database schema like:

```ts
export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Document {
    id: number;
    owner: number;
    title: string;
    content: string;
}

export interface Database {
    User: User;
    Document: Document;
}
```

Then you can use it like:

```ts
import { DB } from "sveltekit-db";
import type { PageServerLoad } from "./$types";
import type { Database } from "./schema";

export const load: PageServerLoad = async ({ platform }) => {
    const db = DB<Database>(platform);

    const documents = await db
        .selectFrom("Document")
        .where("Document.owner", "=", 1)
        .select(["Document.id", "Document.title", "Document.content"])
        .limit(10)
        .execute();

    return { documents };
};
```

## Supported databases

- [x] Cloudflare D1 (binding to `D1` environment variable)
- [x] SQLite (using `SQLITE_FILE` environment variable, defaults to `db.sqlite`)

## Configure with environment variables

See [src/lib/env.ts](src/lib/env.ts) for all available environment variable options.

## Developing

Once you've installed dependencies with `pnpm install`, start a development server:

```bash
pnpm dev
```

Everything inside `src/lib` is part of the library, everything inside `src/routes` is used as a showcase or preview app.

## Building

To build the library:

```bash
pnpm package
```

To create a production version of the showcase app:

```bash
pnpm build
```

You can preview the production build with `pnpm preview`.

> To deploy the app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for the target environment.

## Publishing

To publish the library to [npm](https://www.npmjs.com):

```bash
pnpm publish
```
