"use client";

import * as React from "react";
import * as runtime from "react/jsx-runtime";
import Image from "next/image";
import { cn } from "@/lib/utils";

const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "mt-2 scroll-m-20 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "mt-10 scroll-m-20 border-b border-zinc-200 dark:border-zinc-800 pb-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white first:mt-0",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "mt-6 scroll-m-20 text-xl font-semibold tracking-tight text-zinc-900 dark:text-white",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6 text-zinc-700 dark:text-zinc-300", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("my-6 ml-6 list-disc text-zinc-700 dark:text-zinc-300", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("my-6 ml-6 list-decimal text-zinc-700 dark:text-zinc-300", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "mt-6 border-l-4 border-green-500 pl-6 italic text-zinc-700 dark:text-zinc-300",
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "relative rounded bg-zinc-100 dark:bg-zinc-800 px-[0.3rem] py-[0.2rem] font-mono text-sm text-zinc-900 dark:text-zinc-100",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        "mt-6 mb-4 overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-950 p-4",
        className
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn("font-medium text-green-500 underline underline-offset-4 hover:text-green-400", className)}
      {...props}
    />
  ),
  hr: ({ ...props }) => <hr className="my-4 border-zinc-200 dark:border-zinc-800" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full border-collapse text-sm", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn("m-0 border-t border-zinc-200 dark:border-zinc-800 p-0", className)} {...props} />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "border border-zinc-200 dark:border-zinc-800 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "border border-zinc-200 dark:border-zinc-800 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  Image,
};

interface MDXProps {
  code: string;
}

export function MDXContent({ code }: MDXProps) {
  const mdx = React.useMemo(() => {
    // Velite compiles MDX to a JavaScript module
    // We need to evaluate it with the React runtime
    const scope = { runtime };
    const fn = new Function(...Object.keys(scope), code);
    return fn(...Object.values(scope));
  }, [code]);

  const Component = mdx.default;

  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  );
}
