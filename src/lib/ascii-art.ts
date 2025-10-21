export const asciiArt = {
  arch: `
    ▄▄▄       ██▀███   ▄████▄   ██░ ██
   ▒████▄    ▓██ ▒ ██▒▒██▀ ▀█  ▓██░ ██▒
   ▒██  ▀█▄  ▓██ ░▄█ ▒▒▓█    ▄ ▒██▀▀██░
   ░██▄▄▄▄██ ▒██▀▀█▄  ▒▓▓▄ ▄██▒░▓█ ░██
    ▓█   ▓██▒░██▓ ▒██▒▒ ▓███▀ ░░▓█▒░██▓
    ▒▒   ▓▒█░░ ▒▓ ░▒▓░░ ░▒ ▒  ░ ▒ ░░▒░▒
     ▒   ▒▒ ░  ░▒ ░ ▒░  ░  ▒    ▒ ░▒░ ░
     ░   ▒     ░░   ░ ░         ░  ░░ ░
         ░  ░   ░     ░ ░       ░  ░  ░`,

  coffee: `
      ( (
       ) )
    ........
    |      |]
    \\      /
     '----'`,

  rocket: `
       /\\
      /  \\
     |    |
    /|    |\\
   /_|____|_\\
     |    |
     |    |
    /|    |\\
   / |    | \\
  /__|    |__\\`,

  computer: `
   ___________________
  |  _____________  |
  | |             | |
  | | >_          | |
  | |_____________| |
  |_________________|
     _[_______]_
 ___[___________]___
|         [_____] []|
|         [_____]   |
L___________________J`,

  loading: `
  [████████████████] 100%`,

  heart: `
   ██   ██
  ████ ████
  ████████
   ██████
    ████
     ██`,

  warning: `
      ⚠️
     /  \\
    / !! \\
   /______\\`,

  success: `
      ✓
     ✓ ✓
    ✓   ✓`,

  rust: `
    ⚙️  RUST  ⚙️
   Memory Safe
   Blazingly Fast`,

  node: `
    ⬢ NODE.JS ⬢
   JavaScript
   Everywhere`,

  python: `
    🐍 PYTHON 🐍
   Beautiful is
   better than ugly`,

  typescript: `
    TS TypeScript
   < JavaScript
   But Better >`,

  docker: `
    🐳 DOCKER 🐳
    Build, Ship
      & Run`,
};

export const neofetch = (stats: {
  name: string;
  role: string;
  projects: number;
  languages: string[];
  experience: string;
}) => `
╭─────────────────────────────────────────────────╮
│                                                 │
│   ${stats.name}
│   ──────────────────────────────────            │
│   Role: ${stats.role}
│   Projects: ${stats.projects}
│   Languages: ${stats.languages.join(", ")}
│   Experience: ${stats.experience}
│   OS: Arch Linux (btw)                          │
│   Shell: zsh + oh-my-zsh                        │
│   Editor: Neovim                                │
│   Theme: Dracula                                │
│                                                 │
╰─────────────────────────────────────────────────╯
`;
