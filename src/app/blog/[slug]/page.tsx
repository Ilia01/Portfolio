import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { TableOfContents } from "@/components/table-of-contents";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Calendar } from "lucide-react";

interface PostPageProps {
  params: {
    slug: string;
  };
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const param = await params.slug
  const post = posts.find((post) => post.slugAsParams === param);

  if (!post || !post.published) {
    return null;
  }

  return post;
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

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
          {/* Main Content */}
          <article className="max-w-3xl">
            {/* Back Button */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-mono text-zinc-600 dark:text-zinc-400 hover:text-green-400 transition-colors mb-8"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to blog
            </Link>

            {/* Header */}
            <header className="mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
                {post.title}
              </h1>

              {post.description && (
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">{post.description}</p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400 font-mono">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded bg-green-500/10 text-green-400 border border-green-500/20"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </header>

            {/* Content */}
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <MDXContent code={post.body} />
            </div>

            {/* Footer */}
            <footer className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-mono text-green-400 hover:text-green-300 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Read more posts
              </Link>
            </footer>
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
