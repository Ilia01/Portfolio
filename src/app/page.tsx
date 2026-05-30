import { Navigation } from "@/components/navigation";
import { SideRails } from "@/components/side-rails";
import { Hero } from "@/components/sections/hero";
import { Building } from "@/components/sections/building";
import { Work } from "@/components/sections/work";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";
import { Colophon } from "@/components/colophon";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <SideRails />
      <main>
        <Hero />
        <div className="bg-paper">
          <div className="xl:pl-32 xl:pr-20 2xl:pl-40 2xl:pr-24">
            <Building />
          </div>
        </div>
        <div className="xl:pl-32 xl:pr-20 2xl:pl-40 2xl:pr-24">
          <Work />
          <About />
          <Experience />
          <Contact />
        </div>
        <Colophon />
      </main>
    </div>
  );
}
