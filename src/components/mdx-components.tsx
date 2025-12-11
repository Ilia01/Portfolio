"use client";

import * as React from "react";
import * as runtime from "react/jsx-runtime";
import Image from "next/image";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

function CodeBlock({ className, children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = React.useState(false);
  const preRef = React.useRef<HTMLPreElement>(null);

  const dataLanguage = (props as Record<string, unknown>)["data-language"] as string | undefined;

  const handleCopy = async () => {
    if (preRef.current) {
      const code = preRef.current.textContent || "";
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="group relative mt-6 mb-4 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          {dataLanguage || "code"}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-500" />
              <span className="text-green-500">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      {/* Code content */}
      <pre
        ref={preRef}
        className={cn(
          "overflow-x-auto bg-zinc-950 p-4 text-sm",
          className
        )}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}

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
  pre: CodeBlock,
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
