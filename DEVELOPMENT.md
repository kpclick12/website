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
  layout.tsx              shell: header, footer, metadata
  page.tsx                landing page — masthead + post list
  globals.css             design tokens + all styles
  posts/<slug>/page.tsx   one route per post
components/
  Scrolly.tsx             sticky-figure scrollytelling + reading bar
                          (unused for now — pieces live in their own repos;
                           kept for a short post written directly in this site)
lib/
  site.ts                 title, tagline, identity switch
  posts.ts                post registry (drives the landing page)
data/                     datasets, one module per post
```

## Pieces

Scrollytelling pieces are separate projects — one repo each, own stack, own
build, own deploy — and this site serves them at a clean path via rewrites in
`next.config.mjs`. Same shape The Pudding uses: one repo for the site, one repo
per story. Adding one is four rewrite lines plus a registry entry; nothing gets
vendored or rewritten, and the piece keeps working standalone.

| Piece | On the site |
|---|---|
| `scrolly-butterflyeffect` | yes — `/posts/the-flap-of-a-wing` |
| `scrolly-wealth` | not yet, planned |
| `scrolly-monopoly` | not yet, planned |
| `scrolly-students` | **no — work project, private** |
| `scrolly-math` | **no — work project, private** |
| `scrolly-absence` | **no — work project, private** |

The last three are out of scope for this site. Don't add entries or rewrites for
them.

## Adding a post

1. Create `app/posts/<slug>/page.tsx`.
2. Add an entry to `posts` in `lib/posts.ts` — the landing page reads from it.
   `published: false` hides it without deleting the route.

For a scroll-driven piece, put the narrative in a client component beside the
page and hand `<Scrolly>` a `figure` render function plus an array of `steps`.
`figure` receives the active step index, so the graphic responds to scroll
position. Keep the step order in sync with whatever the figure switches on.

## Identity

`lib/site.ts` exports an `identity` object with an `anonymous` flag, currently
`true`. While it is true, no name, email, or social link is rendered anywhere and
no author is written into page metadata. Flip it and fill in the fields to
attribute the site.

## Charts

Colours live as CSS custom properties (`--viz-*`) in `globals.css`, with separate
steps chosen for the dark surface rather than flipped automatically. The pair in
use passes colourblind-separation and contrast checks in both modes. Markers are
≥8px on screen and carry a 2px surface ring so overlapping points stay readable —
the small-multiple radius is pre-scaled because those SVGs render smaller.

Every figure has a table equivalent on the page; the pinned graphic is
`aria-hidden` since it duplicates the step text.

## Deploys

Vercel builds on every push. `main` publishes to production; any other branch
gets its own preview URL. No `vercel.json` is needed — Next.js is detected
automatically (build `next build`, install `npm install`).

Note: this repo is also the GitHub profile repo (`kpclick12/kpclick12`), so
`README.md` renders on the profile page. Keep site docs here instead.
