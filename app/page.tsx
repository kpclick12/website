import Link from "next/link";

import { MathPanel } from "@/components/MathPanel";
import { Wordmark } from "@/components/Wordmark";
import { formatDate, postHref, publishedPosts, type Post } from "@/lib/posts";
import { site } from "@/lib/site";

function PostEntry({ post }: { post: Post }) {
  const body = (
    <>
      <p className="post-meta">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>{post.minutes} min</span>
      </p>
      <h2>{post.title}</h2>
      <p>{post.dek}</p>
    </>
  );

  // Standalone pieces are served by a rewrite, not an app route, so they need a
  // full navigation — next/link would try to route client-side and 404.
  return post.standalone ? (
    <a href={postHref(post)} className="post-link">
      {body}
    </a>
  ) : (
    <Link href={postHref(post)} className="post-link">
      {body}
    </Link>
  );
}

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
                <PostEntry post={post} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
