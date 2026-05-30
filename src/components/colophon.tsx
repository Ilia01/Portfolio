import { profileData } from "@/lib/data";

export function Colophon() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full border-t border-rule/60 px-6 sm:px-10 py-10 sm:py-14">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-12 sm:gap-10">
          <div className="sm:col-span-7">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ash">
              Colophon
            </p>
            <p className="mt-3 max-w-[55ch] text-sm leading-relaxed text-stone">
              Built with Next.js 15, React 19, Tailwind v4, and Motion.
              Deployed on Vercel. Typeset in Geist. Source on{" "}
              <a
                href="https://github.com/Ilia01"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream underline-offset-4 transition-colors hover:text-amber hover:underline"
              >
                GitHub
              </a>
              .
            </p>
          </div>

          <div className="sm:col-span-5">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ash">
              Reach
            </p>
            <ul className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-sm">
              <li>
                <a
                  href={`mailto:${profileData.contact.email}`}
                  className="text-cream transition-colors hover:text-amber"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href={profileData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone transition-colors hover:text-amber"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={profileData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone transition-colors hover:text-amber"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={profileData.resumeUrl}
                  download
                  className="text-stone transition-colors hover:text-amber"
                >
                  Résumé
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-rule/40 pt-6 font-mono text-[11px] text-ash">
          <span>
            {profileData.name}, {profileData.location}
          </span>
          <span>© {year}</span>
        </div>
      </div>
    </footer>
  );
}
