export const profileData = {
  name: "Ilia Goginashvili",
  role: "Backend Engineer",
  location: "Tbilisi, Georgia",
  availability: {
    status: "available",
    label: "Available for full-time & freelance",
  },
  currently: "Building HookLens, a CLI for debugging webhook signatures.",
  resumeUrl: "/resume-ilia-goginashvili.pdf",
  heroStack: ["TypeScript", "Node.js", "NestJS", "PostgreSQL", "Docker"],

  contact: {
    email: "iliagoginashvili16@gmail.com",
    linkedin: "https://www.linkedin.com/in/ilia-goginashvili-066689305",
    github: "https://github.com/Ilia01",
  },

  about: [
    "I'm a backend dev based in Tbilisi. I work mostly in TypeScript and Node, with NestJS and Postgres on the production side. I finished a trainee role at Andersen at the end of 2025 and I've been splitting time between freelance projects and open-source CLIs since. The day-to-day stack you see below is what I reach for first.",
  ],

  experience: [
    {
      company: "Andersen",
      role: "Software Engineer Trainee",
      period: "Oct 2025 - Dec 2025",
      location: "Tbilisi, Georgia",
      description:
        "Worked on a Node.js backend with TypeScript and NestJS in a team environment. Took on coordination after the team lead left. Handled code reviews, task distribution, sprint presentations, and onboarding new members.",
      technologies: ["Node.js", "TypeScript", "NestJS", "PostgreSQL", "Redis"],
    },
  ],

  stack: {
    primary: ["TypeScript", "Node.js", "NestJS", "Express", "PostgreSQL"],
    tools: ["Docker", "GitHub Actions", "Redis", "Prisma", "SQLite"],
    also: ["React", "Next.js", "Electron", "Python"],
  },

  projects: [
    {
      id: "hooklens",
      title: "HookLens",
      description:
        "CLI tool for debugging webhook signature failures. Captures incoming events, stores them in SQLite, verifies signatures against Stripe and GitHub, and replays them for testing. Published on npm with a VitePress docs site, CI pipeline, and full test suite.",
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
        "CLI that connects Jira and Git. Creates branches from tickets, keeps status in sync, and pulls ticket context into commits. Built to cut out the manual back-and-forth between project management and version control.",
      technologies: ["TypeScript", "Node.js", "Jira API", "CLI"],
      links: {
        github: "https://github.com/Ilia01/devflow",
      },
    },
    {
      id: "beacon",
      title: "Beacon",
      description:
        "Desktop overlay for League of Legends that reads live game state through the Riot API and surfaces coaching suggestions. Built with Electron and React.",
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
  { id: "about", label: "About", index: "01" },
  { id: "work", label: "Work", index: "02" },
  { id: "experience", label: "Experience", index: "03" },
  { id: "contact", label: "Contact", index: "04" },
] as const;

export const TRACKED_SECTION_IDS = [
  "hero",
  ...SECTIONS.map((s) => s.id),
] as const;
