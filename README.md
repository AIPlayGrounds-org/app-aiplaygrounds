# landing-page-aipg

Web app built with **Next.js 16 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS v4**.

## Getting started

```sh
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```text
/
├── public/              # static assets served at /
├── src/
│   └── app/             # App Router
│       ├── layout.tsx   # root layout
│       ├── page.tsx     # /
│       └── globals.css  # Tailwind entry + theme
├── next.config.ts
├── postcss.config.mjs   # Tailwind v4 via PostCSS
├── eslint.config.mjs
└── tsconfig.json        # @/* → src/*
```

## Commands

| Command         | Action                              |
| :-------------- | :---------------------------------- |
| `npm run dev`   | Dev server at http://localhost:3000 |
| `npm run build` | Production build                    |
| `npm start`     | Serve the production build          |
| `npm run lint`  | ESLint                              |

## Notes

- Tailwind v4 has no `tailwind.config.js`; customize the theme with `@theme` in `src/app/globals.css`.
- Route handlers (API endpoints) go in `src/app/**/route.ts`.
- Secrets belong in `.env.local` (gitignored). Only `NEXT_PUBLIC_*` vars reach the browser.
