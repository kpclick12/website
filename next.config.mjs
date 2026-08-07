/**
 * Pieces that are their own project.
 *
 * Each scrollytelling piece lives in its own repo with its own stack, builds
 * itself, and deploys itself — the same shape The Pudding uses (one repo for the
 * site, one repo per story). The site then serves each piece at a clean path on
 * this domain via a rewrite, so readers never see the underlying host.
 *
 * `assetBase` matters: a piece's build bakes absolute asset URLs under whatever
 * base path it was built for. The butterfly piece is built for GitHub Pages, so
 * its HTML asks for /scrolly-butterflyeffect/assets/… — that prefix has to
 * resolve on this domain too, which is the second rewrite pair below. The
 * upside of doing it this way is that nothing in the piece's repo has to change,
 * and it keeps working standalone on GitHub Pages.
 */
const pieces = [
  {
    path: "/posts/the-flap-of-a-wing",
    origin: "https://kpclick12.github.io/scrolly-butterflyeffect",
    assetBase: "/scrolly-butterflyeffect",
  },
  {
    path: "/posts/the-birth-lottery",
    origin: "https://kpclick12.github.io/scrolly-wealth",
    assetBase: "/scrolly-wealth",
  },
  {
    path: "/posts/the-board-has-changed",
    origin: "https://kpclick12.github.io/scrolly-monopoly",
    assetBase: "/scrolly-monopoly",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return pieces.flatMap((p) => [
      { source: p.path, destination: `${p.origin}/` },
      { source: `${p.path}/`, destination: `${p.origin}/` },
      { source: `${p.path}/:path*`, destination: `${p.origin}/:path*` },
      { source: `${p.assetBase}/:path*`, destination: `${p.origin}/:path*` },
    ]);
  },
};

export default nextConfig;
