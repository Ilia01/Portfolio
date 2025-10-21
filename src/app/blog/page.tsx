import { posts } from "#site/content";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

export const metadata = {
  title: "Blog | Ilia Goginashvili",
  description: "Technical writing about backend development, architecture, and lessons learned",
};

export default function BlogPage() {
  const publishedPosts = posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-mono text-zinc-600 dark:text-zinc-400 hover:text-green-400 transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to home
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-green-400 font-mono text-xl">$</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white">
              cat blog/*
            </h1>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 font-mono">
            Technical writing about backend development, architecture, and lessons learned
          </p>
        </div>

        {/* Blog Posts */}
        <div className="space-y-8">
          {publishedPosts.length === 0 && (
            <p className="text-zinc-600 dark:text-zinc-400">No posts published yet.</p>
          )}
          {publishedPosts.map((post) => (
            <article
              key={post.slug}
              className="group rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur p-6 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
            >
              <Link href={`/blog/${post.slugAsParams}`}>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400 font-mono">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-xs rounded bg-green-500/10 text-green-400 border border-green-500/20"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white group-hover:text-green-400 transition-colors">
                    {post.title}
                  </h2>
                  {post.description && (
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {post.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-sm font-mono text-green-400">
                    Read more →
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
