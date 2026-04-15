export const profileData = {
  name: "Ilia Goginashvili",
  role: "Backend Engineer",
  location: "Tbilisi, Georgia",
  availability: "Open to remote work",

  contact: {
    email: "iliagoginashvili16@gmail.com",
    linkedin: "https://www.linkedin.com/in/ilia-goginashvili-066689305",
    github: "https://github.com/Ilia01",
  },

  about: [
    "I'm a backend-focused engineer working mostly with TypeScript and Node.js. I like building things that are useful, shipping them, and iterating based on what actually breaks.",
    "Outside of client and team work, I build open-source tools and publish them. Not as side projects that sit in a repo, but as real packages with docs, CI, tests, and release workflows. The kind of thing where someone can npm install it and it works.",
    "I care about clean architecture, good tests, and clear documentation. I'd rather ship something solid and small than something big and fragile.",
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
