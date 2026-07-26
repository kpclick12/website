import type { Metadata } from "next";
import Link from "next/link";

import { ThemeToggle, themeScript } from "@/components/ThemeToggle";
import { identity, site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: site.title,
    template: `%s — ${site.title}`,
  },
  description: site.tagline,
  metadataBase: new URL(site.url),
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
      </head>
      <body>
        <div className="shell">
          <header className="site-head">
            <div className="wrap">
              <Link href="/" className="wordmark">
                {site.title}
              </Link>
              <nav>
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
                  {identity.email && (
                    <p>
                      <a href={`mailto:${identity.email}`}>{identity.email}</a>
                    </p>
                  )}
                  {identity.links.length > 0 && (
                    <p>
                      {identity.links.map((l, i) => (
                        <span key={l.href}>
                          {i > 0 && " · "}
                          <a href={l.href}>{l.label}</a>
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
