import type { Metadata } from "next";

import { MathPanel } from "@/components/MathPanel";
import { PostFilter } from "@/components/PostFilter";
import { Wordmark } from "@/components/Wordmark";
import { publishedPosts } from "@/lib/posts";
import { site } from "@/lib/site";

// Set per-page rather than on the layout, so future pages don't inherit a
// canonical pointing at the root.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

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

        <PostFilter posts={publishedPosts} />
      </div>
    </div>
  );
}
