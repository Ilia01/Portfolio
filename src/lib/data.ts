export const profileData = {
  name: "Ilia Goginashvili",
  role: "Full-Stack Developer",
  location: "Tbilisi, Georgia",
  availability: {
    status: "available",
    label: "Open to full-time and freelance",
  },
  currently:
    "Rebuilding mprmahjong.com end-to-end: replacing a no-code member platform with a production Next.js stack.",
  resumeUrl: "/resume-ilia-goginashvili.pdf",
  heroStack: ["TypeScript", "Next.js 16", "Postgres", "Prisma", "Tailwind v4"],

  contact: {
    email: "iliagoginashvili16@gmail.com",
    linkedin: "https://www.linkedin.com/in/ilia-goginashvili-066689305",
    github: "https://github.com/Ilia01",
  },

  intro:
    "I design and build product-grade web platforms end-to-end. Frontend in React and Next.js, backend in Node and Postgres, and the boring parts in between.",

  about: [
    "I work across the stack. Most weeks that means Next.js and Tailwind on the front, Node with NestJS or Express and Postgres on the back, and whatever glue the project needs in between. I finished a software engineering trainee role at Andersen at the end of 2025 and have been splitting time between freelance projects, open-source tools, and a full platform rebuild since.",
    "I take work where I get to own the whole loop: talking to the people who will use the thing, shaping it, building it, and shipping it. Solo or in a small team. If you need someone who can land a feature from API to pixel without three handoffs, that is the part I do well.",
  ],

  experience: [
    {
      company: "Andersen",
      role: "Software Engineer Trainee",
      period: "Oct 2025 - Dec 2025",
      location: "Tbilisi, Georgia",
      description:
        "Worked on a Node.js backend with TypeScript and NestJS in a team environment. Took on coordination after the team lead left: code reviews, task distribution, sprint presentations, and onboarding new members.",
      technologies: ["Node.js", "TypeScript", "NestJS", "PostgreSQL", "Redis"],
    },
  ],

  stack: {
    primary: ["TypeScript", "Next.js", "React", "Node.js", "PostgreSQL"],
    tools: ["Tailwind", "Prisma", "NestJS", "shadcn/ui", "Docker"],
    also: ["Express", "Redis", "SQLite", "Electron", "Python"],
  },

  flagship: {
    id: "mprmahjong",
    title: "mprmahjong.com",
    tagline: "Member platform rebuild, solo",
    description:
      "Rebuilding the Mahjong Performance Rating (MPR) platform from the ground up. Replacing a no-code Softr site with a production Next.js 16 app: real auth, a Postgres-backed rating engine, member dashboards, event signups, and a public profile system. I own design, frontend, backend, infra, and performance testing.",
    role: "Design, frontend, backend, and infra. Solo.",
    stack: [
      "Next.js 16",
      "TypeScript",
      "Neon Postgres",
      "Prisma 7",
      "NextAuth",
      "Tailwind v4",
      "shadcn/ui",
    ],
    surfaces: [
      "Public landing and about",
      "Member dashboard",
      "Find players directory",
      "Upcoming events and signup",
      "Auth, sessions, and account settings",
    ],
    status: "In active development",
    url: "https://mprmahjong.com",
  },

  projects: [
    {
      id: "hooklens",
      title: "HookLens",
      description:
        "CLI for debugging webhook signature failures. Captures incoming events, stores them in SQLite, verifies signatures against Stripe and GitHub, and replays them for testing. Published on npm with a VitePress docs site, CI pipeline, and full test suite.",
      technologies: ["TypeScript", "Node.js", "SQLite", "CLI"],
      links: {
        github: "https://github.com/Ilia01/hooklens",
        npm: "https://www.npmjs.com/package/hooklens",
        docs: "https://ilia01.github.io/hooklens/",
      },
    },
    {
      id: "devflow",
      title: "DevFlow",
      description:
        "CLI that connects Jira and Git. Creates branches from tickets, keeps status in sync, and pulls ticket context into commits. Built to cut the manual back-and-forth between project management and version control.",
      technologies: ["TypeScript", "Node.js", "Jira API", "CLI"],
      links: {
        github: "https://github.com/Ilia01/devflow",
      },
    },
    {
      id: "beacon",
      title: "Beacon",
      description:
        "Desktop overlay for League of Legends that reads live game state through the Riot API and surfaces coaching suggestions. Electron + React.",
      technologies: ["TypeScript", "Electron", "Riot API", "React"],
      links: {
        github: "https://github.com/Ilia01/Beacon",
      },
    },
  ],
};

export type ProfileData = typeof profileData;
export type Project = (typeof profileData.projects)[number];

export const SECTIONS = [
  { id: "building", label: "Building", index: "01" },
  { id: "work", label: "Work", index: "02" },
  { id: "about", label: "About", index: "03" },
  { id: "experience", label: "Experience", index: "04" },
  { id: "contact", label: "Contact", index: "05" },
] as const;

export const TRACKED_SECTION_IDS = [
  "hero",
  ...SECTIONS.map((s) => s.id),
] as const;
