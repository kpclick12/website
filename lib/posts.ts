/**
 * Post registry — the landing page reads this and nothing else.
 *
 * There are two kinds of post:
 *
 *   1. Written in this repo, as a route under `app/posts/<slug>/page.tsx`.
 *   2. `standalone: true` — its own repo, its own stack, its own deploy, served
 *      at a path on this domain by a rewrite in `next.config.mjs`. This is the
 *      normal case for the scrollytelling pieces: they are whole projects with
 *      their own build (Svelte, Three.js, their own typeface) and rewriting to
 *      them beats vendoring or rewriting them.
 */

export type Post = {
  slug: string;
  title: string;
  /** One-line standfirst shown under the title on the landing page. */
  dek: string;
  /** ISO date — used for sorting and the printed date. */
  date: string;
  /** Rough read time, minutes. */
  minutes: number;
  /** Set false to hide from the landing page without deleting anything. */
  published: boolean;
  /**
   * Served by a rewrite to a separately-deployed build rather than by an app
   * route, so it needs a real navigation — a client-side route transition would
   * find no route and 404.
   */
  standalone?: boolean;
  /** Where the piece's source lives, when it's its own repo. */
  repo?: string;
};

export const posts: Post[] = [
  {
    slug: "the-flap-of-a-wing",
    title: "The Flap of a Wing",
    dek: "The butterfly effect and Europe's new extreme weather. Opens on a yellow butterfly over a sunlit meadow, which you scroll into a thunderstorm — then follows the nudge into heat, floods and fire.",
    date: "2026-07-25",
    minutes: 8,
    published: true,
    standalone: true,
    repo: "https://github.com/kpclick12/scrolly-butterflyeffect",
  },
  {
    slug: "anscombes-quartet",
    title: "Four datasets, one summary",
    dek: "Same mean, same variance, same correlation, same fit line — and four completely different shapes. Why you should always plot the thing.",
    date: "2026-07-26",
    minutes: 4,
    // Written to prove the in-repo scrollytelling components worked. Flip to
    // true to put it back on the landing page.
    published: false,
  },
];

export const publishedPosts = posts
  .filter((p) => p.published)
  .sort((a, b) => b.date.localeCompare(a.date));

export function postHref(post: Post): string {
  return `/posts/${post.slug}`;
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
