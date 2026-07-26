/**
 * Post registry.
 *
 * Each scrollytelling piece is its own route under `app/posts/<slug>/page.tsx`
 * because the interesting ones always need bespoke graphics. This list is only
 * what the landing page needs to link to them — add an entry when you add a route.
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
  /** Set false to hide from the landing page without deleting the route. */
  published: boolean;
};

export const posts: Post[] = [
  {
    slug: "anscombes-quartet",
    title: "Four datasets, one summary",
    dek: "Same mean, same variance, same correlation, same fit line — and four completely different shapes. Why you should always plot the thing.",
    date: "2026-07-26",
    minutes: 4,
    published: true,
  },
];

export const publishedPosts = posts
  .filter((p) => p.published)
  .sort((a, b) => b.date.localeCompare(a.date));

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
