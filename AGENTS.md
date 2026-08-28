<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · ESLint 9 (flat config).

Source lives in `src/`, import alias is `@/*` → `src/*`.

## Development

`next dev` has no `--background` flag. Start the dev server as a background process
(`npm run dev`) so it keeps running across turns, and read its output from the
background task rather than blocking on it.

| Command         | Action                                  |
| :-------------- | :-------------------------------------- |
| `npm run dev`   | Dev server at http://localhost:3000     |
| `npm run build` | Production build                        |
| `npm start`     | Serve the production build              |
| `npm run lint`  | ESLint                                  |

Tailwind v4 is configured through PostCSS (`postcss.config.mjs`) and imported in
`src/app/globals.css`. There is no `tailwind.config.js` — customize with `@theme`
inside the CSS file.
