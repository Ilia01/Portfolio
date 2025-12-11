import { posts } from "#site/content";
import Link from "next/link";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import { Clock, ArrowRight } from "lucide-react";
import { BlogNavigation } from "@/components/blog-navigation";

export const metadata = {
  title: "Blog | Ilia Goginashvili",
  description: "Notes on backend development, authentication, and building things",
};

export default function BlogPage() {
  const publishedPosts = posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Separate welcome post from regular posts
  const welcomePost = publishedPosts.find((post) => post.slugAsParams === "welcome");
  const regularPosts = publishedPosts.filter((post) => post.slugAsParams !== "welcome");
  const [featuredPost, ...otherPosts] = regularPosts;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <BlogNavigation />
      <div className="max-w-4xl mx-auto px-4 pt-28 pb-16 sm:pt-32 sm:pb-24">
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
            Blog
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Notes on backend development, authentication, and building things.
          </p>
        </header>

        {/* Welcome Section */}
        {welcomePost && (
          <section className="mb-16">
            <Link href={`/blog/${welcomePost.slugAsParams}`} className="group block">
              <article className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-green-500/5 to-emerald-500/5 border border-green-500/20 hover:border-green-500/40 transition-all">
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {welcomePost.title}
                </h2>
                {welcomePost.description && (
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                    {welcomePost.description}
                  </p>
                )}
                <span className="inline-flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400 group-hover:gap-3 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" />
                </span>
              </article>
            </Link>
          </section>
        )}

        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-16">
            <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mb-6">
              Latest
            </h2>
            <Link href={`/blog/${featuredPost.slugAsParams}`} className="group block">
              <article className="p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
                <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-500 mb-4">
                  <time dateTime={featuredPost.date}>{formatDate(featuredPost.date)}</time>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {calculateReadingTime(featuredPost.body)}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {featuredPost.title}
                </h3>

                {featuredPost.description && (
                  <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                    {featuredPost.description}
                  </p>
                )}

                {featuredPost.tags && featuredPost.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <span className="inline-flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400 group-hover:gap-3 transition-all">
                  Read article
                  <ArrowRight className="w-4 h-4" />
                </span>
              </article>
            </Link>
          </section>
        )}

        {/* Other Posts */}
        {otherPosts.length > 0 && (
          <section>
            <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mb-6">
              All Posts
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {otherPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slugAsParams}`} className="group">
                  <article className="h-full p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
                    <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-500 mb-3">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {calculateReadingTime(post.body)}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {post.title}
                    </h3>

                    {post.description && (
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                        {post.description}
                      </p>
                    )}
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        {publishedPosts.length === 0 && (
          <p className="text-zinc-600 dark:text-zinc-400">No posts published yet.</p>
        )}
      </div>
    </div>
  );
}
