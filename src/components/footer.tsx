"use client";

import { profileData } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center text-sm text-zinc-500 dark:text-zinc-500">
          © {new Date().getFullYear()} {profileData.name}
        </div>
      </div>
    </footer>
  );
}
