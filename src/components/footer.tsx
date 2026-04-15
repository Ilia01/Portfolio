"use client";

import { profileData } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between">
        <span className="font-serif text-sm text-amber/60">IG</span>
        <span className="font-mono text-xs text-ash">
          &copy; {new Date().getFullYear()} {profileData.name}
        </span>
      </div>
    </footer>
  );
}
