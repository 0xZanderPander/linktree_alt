"use client";

// ============================================
// BLOG SECTION - LIVE RSS
// ============================================
// Pulls recent posts from `blog.feedUrl` via rss2json (no API key needed),
// which also works around the CORS problem of fetching Substack's feed
// straight from the browser. This site is a static export, so the fetch has
// to happen client-side.
// ============================================

import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site.config";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  author: string;
  imageUrl: string | null;
  link: string;
}

interface RssItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  author: string;
  thumbnail: string;
  enclosure?: { link: string };
}

interface RssResponse {
  status: string;
  items: RssItem[];
}

function formatDate(dateStr: string): string {
  // rss2json returns "YYYY-MM-DD HH:MM:SS" (UTC) which Safari won't parse.
  const date = new Date(dateStr.replace(" ", "T") + "Z");
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="blog-card group flex gap-3 sm:gap-4"
    >
      <div className="w-24 h-24 relative flex-shrink-0 overflow-hidden bg-[#2a2a2a]">
        {post.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.imageUrl}
            alt=""
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--fg-quaternary)]">
            <span className="text-xl font-bold">Blog</span>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
        <h4 className="blog-card-title font-bold text-[var(--color-vanilla)] leading-tight">
          {post.title}
        </h4>
        <div className="flex flex-wrap items-center gap-x-2 text-[var(--fg-quaternary)]">
          <span className="blog-card-author">by {post.author}</span>
          <span className="text-[var(--fg-tertiary)]">•</span>
          <span className="blog-card-date">{post.date}</span>
        </div>
        <p className="blog-card-description text-[var(--fg-secondary)]">
          {post.description}
        </p>
      </div>
    </a>
  );
}

function BlogCardSkeleton() {
  return (
    <div className="blog-card flex gap-3 sm:gap-4">
      <div className="w-24 h-24 flex-shrink-0 bg-[#2a2a2a] animate-pulse" />
      <div className="flex-1 flex flex-col justify-center gap-2">
        <div className="h-4 w-3/4 bg-[#2a2a2a] animate-pulse" />
        <div className="h-3 w-24 bg-[#2a2a2a] animate-pulse" />
        <div className="h-3 w-full bg-[#2a2a2a] animate-pulse" />
      </div>
    </div>
  );
}

export function RecentBlogs() {
  const { blog } = siteConfig;
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // NOTE: every hook runs before any early return - the version in
  // docs/04-recent-blogs.md returns null above this effect, which breaks the
  // rules of hooks.
  useEffect(() => {
    if (!blog.enabled || !blog.feedUrl) {
      setIsLoading(false);
      return;
    }
    let cancelled = false;

    async function loadPosts() {
      try {
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
          blog.feedUrl
        )}`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch");
        const data: RssResponse = await response.json();
        if (data.status !== "ok" || !data.items) throw new Error("Bad response");

        const parsed: BlogPost[] = data.items.slice(0, 3).map((item, i) => {
          const text = stripHtml(item.description || "");
          return {
            id: `blog-${i}-${item.link}`,
            title: stripHtml(item.title),
            description: text.length > 200 ? text.slice(0, 200) + "..." : text,
            date: formatDate(item.pubDate),
            author: item.author || "BRAT BOY",
            imageUrl: item.thumbnail || item.enclosure?.link || null,
            link: item.link,
          };
        });

        if (!cancelled) setPosts(parsed);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadPosts();
    return () => {
      cancelled = true;
    };
  }, [blog.enabled, blog.feedUrl]);

  if (!blog.enabled) return null;
  if (error || (!isLoading && posts.length === 0)) return null;

  const hasSubscribeForm = blog.subscribeUrl.length > 0;

  return (
    // No mt-* here: section spacing is owned by the parent .section-stack.
    <section className="w-full">
      <div className="max-w-[var(--content-max-width)] mx-auto">
        <h2
          className="text-xl font-bold section-heading"
          style={{ color: "var(--color-vanilla)" }}
        >
          {blog.title}
        </h2>

        <div className="flex flex-col gap-3">
          {isLoading ? (
            <>
              <BlogCardSkeleton />
              <BlogCardSkeleton />
            </>
          ) : (
            posts.map((post) => <BlogCard key={post.id} post={post} />)
          )}
        </div>

        {hasSubscribeForm && (
          <div className="mt-5">
            <form
              action={`${blog.subscribeUrl}/api/v1/free?nojs=true`}
              method="post"
              className="subscribe-form"
            >
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="subscribe-input"
              />
              <button type="submit" className="subscribe-button">
                Subscribe
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
