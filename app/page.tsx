import Link from "next/link";

import { formatDate, publishedPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <div className="wrap masthead">
        <h1>{site.title}</h1>
        <p>{site.tagline}</p>
      </div>

      <div className="wrap">
        <h2 className="post-list-label">Posts</h2>

        {publishedPosts.length === 0 ? (
          <p className="empty-note">Nothing published yet.</p>
        ) : (
          <ul className="post-list">
            {publishedPosts.map((post) => (
              <li key={post.slug}>
                <Link href={`/posts/${post.slug}`} className="post-link">
                  <p className="post-meta">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span>{post.minutes} min</span>
                  </p>
                  <h2>{post.title}</h2>
                  <p>{post.dek}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
