// Extend Console interface with custom methods
interface ExtendedConsole extends Console {
  hack: () => void;
  coffee: () => void;
  hire: () => void;
}

export const initConsoleEasterEggs = () => {
  if (typeof window === "undefined") return;

  // ASCII Art Banner
  console.log(`
%c
    ▄▄▄       ██▀███   ▄████▄   ██░ ██
   ▒████▄    ▓██ ▒ ██▒▒██▀ ▀█  ▓██░ ██▒
   ▒██  ▀█▄  ▓██ ░▄█ ▒▒▓█    ▄ ▒██▀▀██░
   ░██▄▄▄▄██ ▒██▀▀█▄  ▒▓▓▄ ▄██▒░▓█ ░██
    ▓█   ▓██▒░██▓ ▒██▒▒ ▓███▀ ░░▓█▒░██▓
    ▒▒   ▓▒█░░ ▒▓ ░▒▓░░ ░▒ ▒  ░ ▒ ░░▒░▒
     ▒   ▒▒ ░  ░▒ ░ ▒░  ░  ▒    ▒ ░▒░ ░
     ░   ▒     ░░   ░ ░         ░  ░░ ░
         ░  ░   ░     ░ ░       ░  ░  ░

%cWelcome, fellow developer! 👨‍💻
%cI see you&apos;re checking the console. I like you already!

%cBTW, I use Arch. 🐧

%cLooking for Easter eggs? Try these:
  • Type 'help' in the terminal on the page
  • Try the Konami code (↑↑↓↓←→←→BA)
  • Press 'i' for vim INSERT mode
  • Type 'sudo rm -rf /' in the terminal (don't worry, it's safe!)
  • Type 'arch-chroot' for some Arch Linux love
  • Type 'fortune' for developer wisdom

%cWant to work together? Let&apos;s talk!
 iliagoginashvili16@gmail.com
 github.com/Ilia01

%cHappy exploring! 
`,
    "color: #10b981; font-family: monospace;",
    "color: #ffffff; font-size: 14px; font-weight: bold;",
    "color: #a1a1aa; font-size: 12px;",
    "color: #10b981; font-size: 13px; font-weight: bold;",
    "color: #a1a1aa; font-size: 12px; font-family: monospace;",
    "color: #10b981; font-size: 13px; font-weight: bold;",
    "color: #10b981; font-size: 12px;"
  );

  // Fun console methods
  (console as ExtendedConsole).hack = () => {
    console.log(`
%c🚨 HACKING IN PROGRESS 🚨
%c[████████████████████████] 100%
%cAccess Granted! Welcome to the Matrix.
%cJust kidding, you can't hack this. But nice try! 😄
`,
      "color: #ef4444; font-weight: bold; font-size: 14px;",
      "color: #10b981;",
      "color: #10b981; font-weight: bold;",
      "color: #a1a1aa;"
    );
  };

  (console as ExtendedConsole).coffee = () => {
    console.log(`
%c      ( (
       ) )
    ........
    |      |]
    \\      /
     '----'
%c☕ Here's your virtual coffee!
%cEnjoy while you debug! 😊
`,
      "color: #a1a1aa; font-family: monospace;",
      "color: #10b981; font-weight: bold;",
      "color: #a1a1aa;"
    );
  };

  (console as ExtendedConsole).hire = () => {
    console.log(`
%cLet&apos;s work together!
%cEmail: iliagoginashvili16@gmail.com
GitHub: github.com/Ilia01
LinkedIn: linkedin.com/in/ilia-goginashvili-066689305

%cI&apos;m open to:
  Backend engineering roles
  Interesting projects
  Collaboration opportunities

%cLet&apos;s build something awesome!
`,
      "color: #10b981; font-weight: bold; font-size: 14px;",
      "color: #ffffff; font-family: monospace;",
      "color: #10b981;",
      "color: #10b981; font-weight: bold;"
    );
  };

  // Helpful message
  console.log(
    "%cPro tip: Try console.hack(), console.coffee(), or console.hire() 😉",
    "color: #10b981; font-style: italic;"
  );
};
