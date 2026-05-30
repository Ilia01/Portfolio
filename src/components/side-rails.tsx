"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowUp } from "lucide-react";
import { SECTIONS, TRACKED_SECTION_IDS } from "@/lib/data";
import { useActiveSection } from "@/hooks/use-active-section";

const EASE = [0.16, 1, 0.3, 1] as const;
const MARKER_HEIGHT = 20;

export function SideRails() {
  const [pastHero, setPastHero] = useState(false);
  const ticking = useRef(false);
  const active = useActiveSection(TRACKED_SECTION_IDS);

  const { scrollY } = useScroll();
  const ulRef = useRef<HTMLUListElement>(null);
  const liRefs = useRef<(HTMLLIElement | null)[]>(
    Array(SECTIONS.length).fill(null),
  );

  const markerYRaw = useMotionValue(0);
  const markerOpacity = useMotionValue(0);
  const markerY = useSpring(markerYRaw, {
    stiffness: 240,
    damping: 30,
    mass: 0.45,
  });

  const computeTarget = useCallback(() => {
    if (!ulRef.current) return;
    const ulRect = ulRef.current.getBoundingClientRect();
    const liCenters = liRefs.current.map((el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return r.top - ulRect.top + r.height / 2;
    });

    const viewportCenter = window.innerHeight / 2;
    let targetCenter: number | null = null;
    let opacity = 0;

    for (let i = 0; i < SECTIONS.length; i++) {
      const el = document.getElementById(SECTIONS[i].id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();

      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;

      if (sectionTop <= viewportCenter && sectionBottom >= viewportCenter) {
        const progress = Math.min(
          1,
          Math.max(0, (viewportCenter - sectionTop) / Math.max(1, rect.height)),
        );
        const current = liCenters[i];
        const next = liCenters[i + 1] ?? current;
        if (current != null && next != null) {
          targetCenter = current + (next - current) * progress;
          opacity = 1;
        }
        break;
      }

      if (sectionTop > viewportCenter) {
        if (i === 0) {
          targetCenter = liCenters[0];
          opacity = 0;
        } else {
          const prevEl = document.getElementById(SECTIONS[i - 1].id);
          const prevRect = prevEl?.getBoundingClientRect();
          if (prevRect) {
            const gap = sectionTop - prevRect.bottom;
            const into =
              gap > 0
                ? Math.min(
                    1,
                    Math.max(0, (viewportCenter - prevRect.bottom) / gap),
                  )
                : 1;
            const prevLi = liCenters[i - 1];
            const currLi = liCenters[i];
            if (prevLi != null && currLi != null) {
              targetCenter = prevLi + (currLi - prevLi) * into;
              opacity = 1;
            }
          }
        }
        break;
      }
    }

    if (targetCenter == null) {
      const last = liCenters[liCenters.length - 1];
      if (last != null) {
        targetCenter = last;
        opacity = 1;
      }
    }

    if (targetCenter != null) {
      markerYRaw.set(targetCenter - MARKER_HEIGHT / 2);
    }
    markerOpacity.set(opacity);
  }, [markerYRaw, markerOpacity]);

  useMotionValueEvent(scrollY, "change", () => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        setPastHero(window.scrollY > window.innerHeight * 0.55);
        computeTarget();
        ticking.current = false;
      });
      ticking.current = true;
    }
  });

  useEffect(() => {
    computeTarget();
    const onResize = () => computeTarget();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [computeTarget, pastHero]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const activeIndex = SECTIONS.findIndex((s) => s.id === active);

  return (
    <>
      <AnimatePresence>
        {pastHero && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            aria-label="Section navigation"
            className="fixed left-6 2xl:left-10 top-1/2 -translate-y-1/2 z-40 hidden xl:block"
          >
            <div className="relative pl-4">
              <motion.span
                aria-hidden
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
                style={{ transformOrigin: "top" }}
                className="absolute left-0 top-0 bottom-0 w-px bg-rule/70"
              />

              <motion.span
                aria-hidden
                className="absolute -left-px w-px bg-amber pointer-events-none"
                style={{
                  height: MARKER_HEIGHT,
                  top: 0,
                  y: markerY,
                  opacity: markerOpacity,
                }}
              />

              <ul
                ref={ulRef}
                className="relative flex flex-col gap-0.5"
              >
                {SECTIONS.map((section, i) => {
                  const state =
                    activeIndex === -1
                      ? "pending"
                      : i < activeIndex
                      ? "passed"
                      : i === activeIndex
                      ? "active"
                      : "pending";

                  return (
                    <motion.li
                      key={section.id}
                      ref={(el) => {
                        liRefs.current[i] = el;
                      }}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.25 + i * 0.06,
                        ease: EASE,
                      }}
                      className="relative"
                    >
                      <button
                        onClick={() => scrollTo(section.id)}
                        aria-current={state === "active" ? "true" : undefined}
                        className="group flex items-baseline gap-3 py-1.5 outline-none transition-colors focus-visible:text-amber"
                      >
                        <span
                          className={`font-mono text-[10px] tabular-nums transition-colors duration-200 ${
                            state === "active"
                              ? "text-amber"
                              : state === "passed"
                              ? "text-ash"
                              : "text-rule"
                          }`}
                        >
                          {section.index}
                        </span>
                        <span
                          className={`font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-200 ${
                            state === "active"
                              ? "text-cream"
                              : state === "passed"
                              ? "text-stone group-hover:text-cream"
                              : "text-ash group-hover:text-stone"
                          }`}
                        >
                          {section.label}
                        </span>
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {pastHero && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed right-6 bottom-6 z-40 hidden xl:flex flex-col items-center gap-3"
          >
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-rule/70 bg-paper/60 backdrop-blur-md text-stone transition-colors hover:border-amber/40 hover:text-amber"
            >
              <ArrowUp className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {pastHero && (
          <motion.button
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.3, ease: EASE }}
            onClick={scrollToTop}
            className="fixed right-5 bottom-6 z-40 xl:hidden flex h-10 w-10 items-center justify-center rounded-full border border-rule/70 bg-paper/80 backdrop-blur-md text-stone transition-colors hover:border-amber/40 hover:text-amber"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" strokeWidth={1.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
