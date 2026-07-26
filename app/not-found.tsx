import Link from "next/link";

/**
 * Custom 404.
 *
 * Next's built-in not-found page injects its own stylesheet, which forces a
 * white body background — so in dark mode the site's light text landed on white
 * and failed contrast. Owning the page keeps it on the site's tokens.
 */
export default function NotFound() {
  return (
    <div className="wrap article-head">
      <p className="kicker">404</p>
      <h1>Not here</h1>
      <p className="dek">
        That page doesn&rsquo;t exist, or it moved.{" "}
        <Link href="/">Back to the posts</Link>.
      </p>
    </div>
  );
}
