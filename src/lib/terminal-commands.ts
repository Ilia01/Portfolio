import { profileData } from "./data";
import { asciiArt, neofetch } from "./ascii-art";

export interface CommandOutput {
  type: "text" | "error" | "success" | "ascii" | "navigate";
  content: string;
  navigateTo?: string;
}

export const terminalCommands: Record<
  string,
  (args: string[]) => CommandOutput
> = {
  help: () => ({
    type: "text",
    content: `Available commands:

Basic:
  help              - Show this help message
  whoami            - Display user information
  clear             - Clear the terminal
  ls                - List projects
  cd <section>      - Navigate to section (projects, skills, about, contact)

Info:
  man ilia          - Show manual/about
  git log           - Show career timeline
  docker ps         - List running projects
  npm run dev       - Show current activity
  cat <project>     - Show project details
  neofetch          - Display system information

Fun:
  arch-chroot       - You know what this does 😏
  pacman -Syu       - Update packages
  sudo <cmd>        - Try it and see
  vim               - Enter vim mode
  cat /etc/motd     - Message of the day
  fortune           - Random developer wisdom

Easter Eggs:
  Try: sudo rm -rf /, sudo make coffee, git commit -m "fix: life"
  Press 'i' for vim insert mode, 'Esc' to exit
  Konami code (↑↑↓↓←→←→BA) for a surprise!`,
  }),

  whoami: () => ({
    type: "success",
    content: `${profileData.name}
${profileData.role} — ${profileData.roleExtended}

${profileData.tagline}

Focus: ${profileData.focus}

Type 'man ilia' for more information`,
  }),

  ls: (args) => {
    const showAll = args.includes("-la") || args.includes("-l") || args.includes("-a");
    const projects = profileData.projects.map((p) => ({
      name: p.id,
      size: p.technologies.length,
      featured: p.featured,
    }));

    if (showAll) {
      return {
        type: "text",
        content: `total ${projects.length}
drwxr-xr-x  ${projects.length} ilia users 4096 ${new Date().toLocaleDateString()} .
drwxr-xr-x  3 ilia users 4096 ${new Date().toLocaleDateString()} ..

${projects
  .map(
    (p) =>
      `${p.featured ? "⭐" : "📦"} ${p.name.padEnd(20)} ${p.size} technologies`
  )
  .join("\n")}

Use 'cat <project-name>' to view details
Use 'cd projects' to navigate to projects section`,
      };
    }

    return {
      type: "text",
      content: projects.map((p) => `${p.featured ? "⭐" : "📦"} ${p.name}`).join("\n") +
        "\n\nUse 'cat <project-name>' for details",
    };
  },

  cat: (args) => {
    if (args.length === 0) return { type: "error", content: "cat: missing file operand" };

    const input = args[0].toLowerCase();

    if (input === "/etc/motd" || input === "motd") {
      return {
        type: "ascii",
        content: `${asciiArt.arch}

Welcome to Ilia's Portfolio!

"I use Arch btw" - Ancient Developer Proverb

Type 'help' for available commands.`,
      };
    }

    if (input === "/etc/os-release") {
      return {
        type: "text",
        content: `NAME="Ilia's Developer Environment"
VERSION="Backend Edition"
PRETTY_NAME="Backend Developer @ Production Mode"
ID=ilia
BUILD_ID=rolling
ANSI_COLOR="0;32"

TECH_STACK="${profileData.skills.languages.map((s) => s.name).join(" | ")}"
FRAMEWORKS="${profileData.skills.backend.map((s) => s.name).join(" | ")}"
DATABASES="${profileData.skills.data.map((s) => s.name).join(" | ")}"`,
      };
    }

    // Check if it's a project
    const project = profileData.projects.find((p) => p.id === input);
    if (project) {
      return {
        type: "text",
        content: `${project.title} - ${project.subtitle}

${project.longDescription}

Technologies: ${project.technologies.slice(0, 5).join(", ")}${
          project.technologies.length > 5 ? "..." : ""
        }

${project.features.slice(0, 3).map((f) => `• ${f}`).join("\n")}

${project.github ? `GitHub: ${project.github}` : ""}
${project.demo ? `Demo: ${project.demo}` : ""}

Type 'cd projects' to see all projects`,
      };
    }

    return {
      type: "error",
      content: `cat: ${args[0]}: No such file or directory

Try: cat aegis2fa, cat apiflow, cat taskmanagerapi, etc.`,
    };
  },

  cd: (args) => {
    if (args.length === 0) return { type: "text", content: "/home/ilia" };

    const section = args[0].toLowerCase();
    const validSections = ["projects", "skills", "about", "contact"];

    if (validSections.includes(section)) {
      return {
        type: "navigate",
        content: `Navigating to ${section}...`,
        navigateTo: section,
      };
    }

    return {
      type: "error",
      content: `cd: ${args[0]}: No such file or directory

Valid sections: ${validSections.join(", ")}`,
    };
  },

  man: (args) => {
    if (args[0] === "ilia") {
      return {
        type: "text",
        content: `ILIA(1)                    User Manual                    ILIA(1)

NAME
       Ilia Goginashvili - Backend Developer

SYNOPSIS
       ilia [OPTIONS] --mode=production

DESCRIPTION
       Backend developer specializing in Node.js, TypeScript, and Python.
       Builds production-ready APIs with clean architecture.

OPTIONS
       --stack
              ${profileData.roleExtended}

       --focus
              ${profileData.focus}

       --philosophy
              ${profileData.about.philosophy.join("\n              ")}

PROJECTS
       Featured: ${profileData.projects.filter((p) => p.featured).length}
       Total: ${profileData.projects.length}

CONTACT
       Email: ${profileData.contact.email}
       GitHub: ${profileData.contact.github}
       LinkedIn: ${profileData.contact.linkedin}

SEE ALSO
       cd(1), ls(1), cat(1), git(1)

AUTHOR
       ${profileData.name} <${profileData.contact.email}>`,
      };
    }

    return { type: "error", content: `No manual entry for ${args[0] || "man"}` };
  },

  git: (args) => {
    if (args[0] === "log") {
      return {
        type: "text",
        content: `commit a4b8c9d2e1f0 (HEAD -> main, origin/main)
Author: ${profileData.name} <${profileData.contact.email}>
Date:   ${new Date().toDateString()}

    feat: add production-ready 2FA service (Aegis2FA)

    - Enterprise-grade security
    - 80%+ test coverage
    - Comprehensive docs with MkDocs

commit 7e6d5c4b3a2f
Author: ${profileData.name} <${profileData.contact.email}>
Date:   ${new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toDateString()}

    feat: build API documentation generator (ApiFlow)

    - Python static site generator
    - Version management
    - Used to document own projects

Type 'cd projects' to see all projects`,
      };
    }

    if (args.join(" ") === 'commit -m "fix: life"') {
      return {
        type: "error",
        content: `error: pathspec 'life' did not match any file(s) known to git
hint: Maybe try 'git commit -m "feat: accept chaos"' instead? 😄`,
      };
    }

    return { type: "text", content: "usage: git [--version] [--help] <command> [<args>]" };
  },

  docker: (args) => {
    if (args[0] === "ps") {
      const projects = profileData.projects.filter((p) => p.featured);
      return {
        type: "text",
        content: `CONTAINER ID   IMAGE                STATUS              PORTS
${projects
  .map(
    (p, i) =>
      `${String(i + 1).padStart(12, "0")}   ${p.id.padEnd(20)} Up 24 hours         ${
        p.demo ? "443->443" : "N/A"
      }`
  )
  .join("\n")}

All projects running smoothly! 🐳`,
      };
    }

    return { type: "text", content: "usage: docker ps, docker images, docker-compose up" };
  },

  npm: (args) => {
    if (args.join(" ") === "run dev") {
      return {
        type: "success",
        content: `> portfolio@1.0.0 dev
> next dev

- ready started server on 0.0.0.0:3000
- info Loaded env from .env
- event compiled successfully
- Currently working on: Building awesome portfolios!`,
      };
    }

    if (args[0] === "install") {
      return {
        type: "text",
        content: `⠋ Installing dependencies...
⠙ (This might take a while, grab a coffee ☕)
⠹ Still installing...
⠸ Almost there...
✓ Success! All packages installed!`,
      };
    }

    return { type: "text", content: "usage: npm run dev, npm install, npm build" };
  },

  neofetch: () => ({
    type: "ascii",
    content: neofetch({
      name: profileData.name,
      role: profileData.role,
      projects: profileData.projects.length,
      languages: profileData.skills.languages.map((l) => l.name),
      experience: "2+ years",
    }),
  }),

  pacman: (args) => {
    if (args.join(" ") === "-Syu") {
      return {
        type: "success",
        content: `:: Synchronizing package databases...
 core is up to date
 extra is up to date
 community is up to date
:: Starting full system upgrade...
 there is nothing to do

All skills up to date!
(I use Arch btw)`,
      };
    }

    return { type: "text", content: "usage: pacman -Syu (update system)" };
  },

  "arch-chroot": () => ({
    type: "ascii",
    content: `${asciiArt.arch}

Welcome to the arch-chroot environment!

Btw, I use Arch. Did I mention that? Because I use Arch. Arch Linux.
The superior operating system. Arch. I use it. Arch btw.

Type 'help' to return to normal commands.`,
  }),

  sudo: (args) => {
    const command = args.join(" ");

    if (command === "rm -rf /") {
      return {
        type: "error",
        content: `${asciiArt.warning}

Nice try! But I've got backups. 😎

[sudo] password for ilia: ************
rm: it is dangerous to operate recursively on '/'
rm: use --no-preserve-root to override this failsafe

(Don't actually do this in real life!)`,
      };
    }

    if (command.includes("make coffee") || command.includes("make-coffee")) {
      return {
        type: "ascii",
        content: `${asciiArt.coffee}

Brewing coffee...
☕ Please wait...
... ...
... ... ...

Your coffee is ready! (Virtual coffee, but it's the thought that counts)`,
      };
    }

    return {
      type: "error",
      content: `[sudo] password for visitor:
Sorry, you don't have sudo access here. Try being less sudo. 😄`,
    };
  },

  vim: () => ({
    type: "text",
    content: `Entering vim mode...

Press 'i' to enter INSERT mode
Press 'Esc' to return to NORMAL mode
Type ':q' to quit (good luck! 😏)

Warning: You are now stuck in vim. Welcome to the club! 🎉`,
  }),

  fortune: () => {
    const fortunes = [
      "The best code is no code at all.",
      "It works on my machine. ¯\\_(ツ)_/¯",
      "There are only two hard things in Computer Science: cache invalidation and naming things.",
      "Debugging is like being a detective in a crime movie where you're also the murderer.",
      "I don't always test my code, but when I do, I do it in production.",
      "Code never lies, comments sometimes do.",
      "A programmer is a machine that turns coffee into code.",
      "I use Arch btw.",
      "Real programmers count from 0.",
      "There's no place like 127.0.0.1",
    ];

    return {
      type: "text",
      content: fortunes[Math.floor(Math.random() * fortunes.length)],
    };
  },

  clear: () => ({
    type: "text",
    content: "[CLEAR]",
  }),

  exit: () => ({
    type: "error",
    content: "You can't escape that easily! Try refreshing the page instead. 😄",
  }),

  ":q": () => ({
    type: "error",
    content: "You're not in vim! (But nice try)\nType 'vim' to enter vim mode.",
  }),

  ":wq": () => ({
    type: "error",
    content: "Nothing to save. Your visit is already in my heart! ❤️",
  }),
};

export const parseCommand = (input: string): CommandOutput => {
  const trimmed = input.trim();
  if (!trimmed) return { type: "text", content: "" };

  const [command, ...args] = trimmed.split(" ");

  if (terminalCommands[command]) {
    return terminalCommands[command](args);
  }

  return {
    type: "error",
    content: `Command not found: ${command}

Type 'help' to see available commands.`,
  };
};
