# Development

Next.js (App Router) site, deployed on Vercel.

## Local

```bash
npm install
npm run dev     # http://localhost:3000
```

## Checks

```bash
npm run build   # production build; also type-checks
```

## Layout

```
app/
  layout.tsx     root layout + <head> metadata
  page.tsx       homepage
  globals.css    global styles (light/dark via prefers-color-scheme)
```

Add a page by creating `app/<route>/page.tsx`.

## Deploys

Vercel builds on every push. `main` publishes to production; any other branch
gets its own preview URL. No `vercel.json` is needed — Next.js is detected
automatically (build `next build`, install `npm install`).

Note: this repo is also the GitHub profile repo (`kpclick12/kpclick12`), so
`README.md` renders on the profile page. Keep site docs here instead.
