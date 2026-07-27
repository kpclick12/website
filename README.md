# (x)plain

A personal site of data stories — [plainx.dev](https://plainx.dev)

Reads as *explain*: `x` is pronounced "ex", and the parentheses and italic
variable are ordinary mathematical notation.

## How this is arranged

This repo is the **site**: the landing page, the post index, the About page, the
design system. It is deliberately small.

Each scrollytelling piece is its **own repo**, with its own stack, build and
deploy — one repo per story, the same shape The Pudding uses. The site serves
them at a clean path on this domain via rewrites in `next.config.mjs`, so a
reader never leaves `plainx.dev` and no piece has to be vendored, rewritten, or
kept in sync.

| Piece | URL | Source |
|---|---|---|
| The Flap of a Wing | [/posts/the-flap-of-a-wing](https://plainx.dev/posts/the-flap-of-a-wing) | [scrolly-butterflyeffect](https://github.com/kpclick12/scrolly-butterflyeffect) |

## Stack

Next.js (App Router) and TypeScript, no CSS framework — one stylesheet holds the
design tokens. Type is Computer Modern, specifically Knuth's Concrete Roman,
self-hosted and subset. Light by default; dark is opt-in and never follows the
operating system.

## Local

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build; also type-checks
```

## More

[`DEVELOPMENT.md`](DEVELOPMENT.md) covers adding a post, adding a piece, the
identity switch, and the chart and typography conventions.
