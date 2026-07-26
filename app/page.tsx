import Link from "next/link";

import { MathPanel } from "@/components/MathPanel";
import { Wordmark } from "@/components/Wordmark";
import { formatDate, publishedPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <div className="landing">
      <div className="landing-art">
        <MathPanel />
      </div>

      <div className="landing-body">
        <div className="masthead">
          <h1 aria-label="explain">
            <Wordmark />
          </h1>
          <p>{site.about}</p>
        </div>

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
    </div>
  );
}
