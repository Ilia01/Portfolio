"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { TocItem } from "@/lib/toc";

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Get all headings in the document
    const headingElements = items.map(({ id }) =>
      document.getElementById(id)
    ).filter((el): el is HTMLElement => el !== null);

    if (headingElements.length === 0) return;

    // Track visible headings and their positions
    const visibleHeadings = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleHeadings.set(entry.target.id, entry.boundingClientRect.top);
          } else {
            visibleHeadings.delete(entry.target.id);
          }
        });

        // If we have visible headings, set the one closest to the top
        if (visibleHeadings.size > 0) {
          const closest = Array.from(visibleHeadings.entries()).reduce((prev, curr) => {
            return Math.abs(curr[1]) < Math.abs(prev[1]) ? curr : prev;
          });
          setActiveId(closest[0]);
        } else {
          // No headings are visible, find the last one above the viewport
          const aboveViewport = headingElements
            .map((el) => ({
              id: el.id,
              top: el.getBoundingClientRect().top,
            }))
            .filter((el) => el.top < 0);

          if (aboveViewport.length > 0) {
            // Get the heading with the largest negative top (closest to 0 from below)
            const lastAbove = aboveViewport.reduce((prev, curr) =>
              curr.top > prev.top ? curr : prev
            );
            setActiveId(lastAbove.id);
          } else if (headingElements.length > 0) {
            // All headings are below, activate the first one
            setActiveId(headingElements[0].id);
          }
        }
      },
      {
        rootMargin: "-100px 0px -66% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    // Observe all headings
    headingElements.forEach((el) => observer.observe(el));

    // Handle initial scroll position
    const handleScroll = () => {
      if (visibleHeadings.size === 0) {
        const aboveViewport = headingElements
          .map((el) => ({
            id: el.id,
            top: el.getBoundingClientRect().top,
          }))
          .filter((el) => el.top < 100);

        if (aboveViewport.length > 0) {
          const lastAbove = aboveViewport.reduce((prev, curr) =>
            curr.top > prev.top ? curr : prev
          );
          setActiveId(lastAbove.id);
        }
      }
    };

    // Set initial active heading
    handleScroll();

    // Add scroll listener for better tracking
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      headingElements.forEach((el) => observer.unobserve(el));
      window.removeEventListener("scroll", handleScroll);
    };
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Offset for fixed header if any
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });

      // Update URL hash without jumping
      window.history.pushState(null, "", `#${id}`);
      setActiveId(id);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <nav className="hidden lg:block sticky top-24 self-start">
      <div className="max-h-[calc(100vh-8rem)] overflow-y-auto py-4">
        <h2 className="text-sm font-mono font-semibold text-zinc-900 dark:text-white mb-4 uppercase tracking-wider">
          On this page
        </h2>
        <ul className="space-y-2 text-sm border-l-2 border-zinc-200 dark:border-zinc-800">
          {items.map((item) => {
            const isActive = activeId === item.id;
            const paddingClass =
              item.depth === 2
                ? "pl-4"
                : item.depth === 3
                ? "pl-8"
                : "pl-12";

            return (
              <li key={item.id} className={cn("relative", paddingClass)}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={cn(
                    "block py-1 transition-colors duration-200 font-mono text-xs leading-relaxed",
                    "hover:text-green-400",
                    isActive
                      ? "text-green-400 font-medium"
                      : "text-zinc-600 dark:text-zinc-400"
                  )}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1 bottom-1 w-0.5 bg-green-400 -translate-x-[9px]" />
                  )}
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
