"use client";

import { Navigation } from "@/components/navigation";
import { SideRails } from "@/components/side-rails";
import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { Work } from "@/components/sections/work";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <SideRails />
      <main>
        <Hero />
        <Work />
        <Experience />
        <About />
        <Contact />
      </main>
    </div>
  );
}
