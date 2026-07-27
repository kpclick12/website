"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";

import { formatDate, postHref, type Post } from "@/lib/posts";
import { TOPICS, topicLabel, type TopicId } from "@/lib/topics";

function PostEntry({ post }: { post: Post }) {
  const body = (
    <>
      <p className="post-meta">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>{post.minutes} min</span>
        <span className="post-topic">
          <span className="topic-dot" data-topic={post.topic} aria-hidden="true" />
          {topicLabel(post.topic)}
        </span>
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

export function PostFilter({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<TopicId | "all">("all");
  const searchId = useId();
  const topicId = useId();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (topic !== "all" && p.topic !== topic) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.dek.toLowerCase().includes(q) ||
        topicLabel(p.topic).toLowerCase().includes(q)
      );
    });
  }, [posts, query, topic]);

  const filtering = query.trim() !== "" || topic !== "all";

  return (
    <>
      <div className="filters">
        <label className="visually-hidden" htmlFor={searchId}>
          Search posts
        </label>
        <input
          id={searchId}
          type="search"
          className="filter-search"
          placeholder="Search…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <label className="visually-hidden" htmlFor={topicId}>
          Filter by subject
        </label>
        <select
          id={topicId}
          className="filter-topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value as TopicId | "all")}
        >
          <option value="all">All subjects</option>
          {TOPICS.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {/* Count is announced to screen readers when filtering changes it. */}
      <p className="visually-hidden" role="status">
        {results.length} {results.length === 1 ? "post" : "posts"}
      </p>

      {results.length === 0 ? (
        <p className="empty-note">
          {filtering
            ? "Nothing here yet — try another subject."
            : "Nothing published yet."}
        </p>
      ) : (
        <ul className="post-list">
          {results.map((post) => (
            <li key={post.slug}>
              <PostEntry post={post} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
