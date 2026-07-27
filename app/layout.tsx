import type { Metadata } from "next";
import Link from "next/link";

import { ThemeToggle, themeScript } from "@/components/ThemeToggle";
import { Wordmark } from "@/components/Wordmark";
import { identity, site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: site.title,
    template: `%s — ${site.title}`,
  },
  description: site.tagline,
  metadataBase: new URL(site.url),
  openGraph: {
    type: "website",
    siteName: site.title,
    title: site.title,
    description: site.tagline,
    url: "/",
    locale: "en",
    // Declared here rather than via app/opengraph-image.png: the file
    // convention gives a hashed URL but silently ignored the accompanying
    // .alt.txt, so no og:image:alt was emitted. Explicit keeps the alt text.
    images: [
      {
        url: "/og.png",
        width: 2400,
        height: 1260,
        alt: "The wordmark (x)plain beside a fine-lined unit circle in the complex plane, with the point e^(iπ) marked at −1.",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  // No author tag while anonymous — see lib/site.ts
  ...(identity.anonymous ? {} : { authors: [{ name: identity.name }] }),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Applies a stored dark choice before first paint to avoid a flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />

        {/* All four faces appear above the fold on the landing page — roman in
            the standfirst, bold in the wordmark, italic in its variable,
            typewriter in the dates and labels. With font-display: optional the
            browser only uses a face that arrives before it paints, so every one
            of them needs the head start. ~180KB total, subset. */}
        {[
          "cmu-concrete-regular",
          "cmu-concrete-bold",
          "cmu-concrete-italic",
          "cmu-typewriter-regular",
        ].map((f) => (
          <link
            key={f}
            rel="preload"
            href={`/fonts/${f}.woff2`}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        ))}
      </head>
      <body>
        <div className="shell">
          <header className="site-head">
            <div className="wrap">
              <Link href="/" className="wordmark" aria-label="explain — home">
                <Wordmark />
              </Link>
              <nav>
                <Link href="/about" className="nav-link">
                  About
                </Link>
                <ThemeToggle />
              </nav>
            </div>
          </header>

          <main>{children}</main>

          <footer className="site-foot">
            <div className="wrap">
              <p>
                © {new Date().getFullYear()} {site.title}
              </p>
              {identity.anonymous ? (
                <p>Published anonymously.</p>
              ) : (
                <>
                  {identity.name && <p>{identity.name}</p>}
                  {identity.email && (
                    <p>
                      <a href={`mailto:${identity.email}`}>{identity.email}</a>
                    </p>
                  )}
                  {identity.links.length > 0 && (
                    <p className="foot-links">
                      {identity.links.map((l, i) => (
                        <span key={l.href}>
                          {i > 0 && <span aria-hidden="true"> · </span>}
                          <a href={l.href} rel="me">
                            {l.label}
                          </a>
                        </span>
                      ))}
                    </p>
                  )}
                </>
              )}
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
