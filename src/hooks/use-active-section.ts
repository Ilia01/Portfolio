"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section the viewport's "trigger line" currently sits inside.
 * Trigger line defaults to 40% down from the top of the viewport — meaning
 * a section becomes active once its top crosses above the line and stays
 * active until its bottom does too. Deterministic and order-preserving.
 */
export function useActiveSection(
  ids: ReadonlyArray<string>,
  triggerRatio = 0.4,
): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (ids.length === 0) return;

    let frame = 0;

    const compute = () => {
      const triggerY = window.innerHeight * triggerRatio;
      let found: string | null = null;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerY && rect.bottom > triggerY) {
          found = id;
          break;
        }
      }

      // Fallback: if scrolled past everything, keep the last section active
      if (!found) {
        for (let i = ids.length - 1; i >= 0; i--) {
          const el = document.getElementById(ids[i]);
          if (!el) continue;
          if (el.getBoundingClientRect().top <= triggerY) {
            found = ids[i];
            break;
          }
        }
      }

      setActive(found);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, triggerRatio]);

  return active;
}
