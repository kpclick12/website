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
    "A personal page where I post stories trying to explain things I find interesting — usually while I'm still working them out myself.",
  /**
   * Canonical origin. Feeds `metadataBase`, so it decides the absolute URLs in
   * Open Graph tags and anything else resolved against the site root.
   * kpclick12.vercel.app still serves the site, but this is the address of
   * record.
   */
  url: "https://plainx.dev",
};

/**
 * Attribution, deliberately low-key.
 *
 * Everything here renders in ONE place: the site footer. There is no per-post
 * byline and no author line on articles — the writing carries itself, and a name
 * repeated at the top of every piece is the thing we're avoiding. If you ever do
 * want a byline, that's a new component, not a flag flip here.
 */
export const identity = {
  /** While true, nothing below renders and the footer reads "Published anonymously." */
  anonymous: false,

  /**
   * Deliberately empty even though the name is no longer private: it appears
   * once, on /about, where someone has chosen to go looking. Putting it in the
   * footer would repeat it on every page, which is the thing being avoided.
   * Set it here if you'd rather it appear site-wide.
   */
  name: "",

  /** Leave empty to publish no address. */
  email: "",

  /** Add LinkedIn here when you're ready — same shape, appended to the end. */
  links: [
    { label: "GitHub", href: "https://github.com/kpclick12" },
    { label: "Reddit", href: "https://www.reddit.com/user/kpclick12" },
  ] as { label: string; href: string }[],
};
