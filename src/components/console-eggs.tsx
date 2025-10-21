"use client";

import { useEffect } from "react";
import { initConsoleEasterEggs } from "@/lib/console-eggs";

export function ConsoleEggs() {
  useEffect(() => {
    initConsoleEasterEggs();
  }, []);

  return null;
}
