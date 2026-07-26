/**
 * Site-wide configuration.
 *
 * `identity` is deliberately a single switch: the anonymous/attributed decision
 * hasn't been made yet, so nothing personal is published until `anonymous` is
 * flipped to false. Keep it that way until you've decided — the footer, the
 * metadata author tag, and the contact line all read from here.
 */

export const site = {
  /** Plain-text form of the wordmark, for metadata and anywhere markup can't go. */
  title: "(x)plain",
  /** Short version — used for page metadata and the browser tab description. */
  tagline: "A personal page of stories explaining things I find interesting.",
  /** The longer standfirst on the landing page. */
  about:
    "A personal page where I post stories trying to explain things I find interesting — usually by taking something apart until the shape of it is obvious.",
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
