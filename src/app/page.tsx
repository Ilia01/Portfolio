"use client";

import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { About } from "@/components/sections/about";
import { Footer } from "@/components/footer";
import { FloatingContact } from "@/components/floating-contact";
import { KonamiCode } from "@/components/konami-code";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <About />
      </main>
      <Footer />
      <FloatingContact />
      <KonamiCode />
    </div>
  );
}
