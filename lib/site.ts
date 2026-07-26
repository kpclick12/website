/**
 * Site-wide configuration.
 *
 * `identity` is deliberately a single switch: the anonymous/attributed decision
 * hasn't been made yet, so nothing personal is published until `anonymous` is
 * flipped to false. Keep it that way until you've decided — the footer, the
 * metadata author tag, and the contact line all read from here.
 */

export const site = {
  title: "kpclick12",
  tagline: "Scroll-driven stories, mostly about data.",
  url: "https://kpclick12.vercel.app",
};

export const identity = {
  /** While true: no name, no email, no social links rendered anywhere. */
  anonymous: true,

  /** Only used when `anonymous` is false. */
  name: "",
  email: "",
  links: [] as { label: string; href: string }[],
};
