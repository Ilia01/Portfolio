import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { TableOfContents } from "@/components/table-of-contents";
import { BlogNavigation } from "@/components/blog-navigation";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";

interface PostPageProps {
  params: {
    slug: string;
  };
}

// Get sorted published posts (excluding welcome post from navigation)
const publishedPosts = posts
  .filter((post) => post.published && post.slugAsParams !== "welcome")
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

async function getPostFromParams(params: PostPageProps["params"]) {
  const param = await params.slug;
  const post = posts.find((post) => post.slugAsParams === param);

  if (!post || !post.published) {
    return null;
  }

  return post;
}

function getAdjacentPosts(currentSlug: string) {
  const currentIndex = publishedPosts.findIndex(
    (post) => post.slugAsParams === currentSlug
  );

  return {
    // Previous = newer post (lower index)
    prev: currentIndex > 0 ? publishedPosts[currentIndex - 1] : null,
    // Next = older post (higher index)
    next: currentIndex < publishedPosts.length - 1 ? publishedPosts[currentIndex + 1] : null,
  };
}

export async function generateStaticParams(): Promise<PostPageProps["params"][]> {
  return posts.map((post) => ({
    slug: post.slugAsParams,
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  const { prev, next } = getAdjacentPosts(post.slugAsParams);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <BlogNavigation />
      <div className="max-w-7xl mx-auto px-4 pt-28 pb-16 sm:pt-32 sm:pb-24">
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
          {/* Main Content */}
          <article className="max-w-3xl">
            {/* Back to blog link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              All posts
            </Link>

            {/* Header */}
            <header className="mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
                {post.title}
              </h1>

              {post.description && (
                <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                  {post.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{calculateReadingTime(post.body)}</span>
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </header>

            {/* Content */}
            <div className="prose prose-zinc dark:prose-invert prose-headings:font-semibold prose-a:text-green-600 dark:prose-a:text-green-400 prose-code:text-green-600 dark:prose-code:text-green-400 max-w-none">
              <MDXContent code={post.body} />
            </div>

            {/* Previous/Next Navigation */}
            <nav className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Previous (newer) post */}
                {prev ? (
                  <Link
                    href={`/blog/${prev.slugAsParams}`}
                    className="group flex flex-col p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"
                  >
                    <span className="text-xs text-zinc-500 dark:text-zinc-500 mb-1 flex items-center gap-1">
                      <ArrowLeft className="w-3 h-3" />
                      Previous
                    </span>
                    <span className="font-medium text-zinc-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-2">
                      {prev.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}

                {/* Next (older) post */}
                {next ? (
                  <Link
                    href={`/blog/${next.slugAsParams}`}
                    className="group flex flex-col p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all text-right sm:col-start-2"
                  >
                    <span className="text-xs text-zinc-500 dark:text-zinc-500 mb-1 flex items-center gap-1 justify-end">
                      Next
                      <ArrowRight className="w-3 h-3" />
                    </span>
                    <span className="font-medium text-zinc-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-2">
                      {next.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </nav>
          </article>

          {/* Table of Contents Sidebar */}
          {post.toc && post.toc.length > 0 && (
            <aside className="hidden lg:block">
              <TableOfContents items={post.toc} />
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
