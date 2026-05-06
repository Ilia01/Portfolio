"use client";

import { useEffect, useState } from "react";

const TBILISI_TZ = "Asia/Tbilisi";

function formatTbilisi(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: TBILISI_TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

/**
 * Live local time in Tbilisi. Updates every 30 seconds.
 * Renders nothing on first paint to avoid hydration mismatch.
 */
export function LocalClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(formatTbilisi(new Date()));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!time) {
    return <span className="tabular-nums opacity-0">00:00</span>;
  }
  return <span className="tabular-nums">{time}</span>;
}
