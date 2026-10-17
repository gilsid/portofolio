# Portfolio — Gilang Nur Akbar

A personal portfolio site listing my projects, skills, and experience. The source code is open because a portfolio that tells people to look at the code should have its own code open too.

Live: coming after the Vercel deploy.

## Stack

- Next.js 15 with the App Router, every page statically rendered
- React 19 and TypeScript
- Plain CSS, no framework, Gruvbox Material theme
- Bun as the package manager

## Running locally

```
bun install
bun run dev
```

The site opens at `http://localhost:3000` and redirects to `/id` or `/en` based on the browser language.

## Two languages

The site is bilingual with separate paths: `/id` for Indonesian and `/en` for English. Language selection happens in `middleware.ts`, interface text lives in `lib/dictionaries.ts`, and project data lives in `lib/projects.ts`.
