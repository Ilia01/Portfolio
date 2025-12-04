"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { About } from "@/components/sections/about";
import { HireMeBanner } from "@/components/hire-me-banner";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";
import { BootSequence } from "@/components/boot-sequence";
import { KonamiCode } from "@/components/konami-code";

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <>
      {!bootComplete && <BootSequence onComplete={() => setBootComplete(true)} />}

      <div className="min-h-screen">
        <Navigation />
        <main>
          <Hero />
          <Experience />
          <Projects />
          <Skills />
          <About />
          <HireMeBanner />
          <Contact />
        </main>
        <Footer />
        <KonamiCode />
      </div>
    </>
  );
}
