export const profileData = {
  name: "Ilia Goginashvili",
  tagline: "Backend-focused Software Engineering Trainee with hands-on experience in TypeScript, Node.js, and secure API development.",
  role: "Software Engineer Trainee",
  roleExtended: "Node.js Team at Andersen · TypeScript · NestJS · Express",
  focus: "clean architecture, auth & security, PostgreSQL/Prisma, performance",

  contact: {
    email: "iliagoginashvili16@gmail.com",
    linkedin: "https://www.linkedin.com/in/ilia-goginashvili-066689305",
    github: "https://github.com/Ilia01",
    cvAvailable: true,
  },

  experience: [
    {
      company: "Andersen",
      role: "Software Engineer Trainee",
      period: "October 2025 - Present",
      location: "Tbilisi, Georgia",
      highlights: [
        "Contributing to Node.js backend development with TypeScript and NestJS",
        "Participating in code reviews and architectural discussions",
        "Acting as interim technical point of contact, supporting estimations and team coordination",
        "Applying clean architecture patterns and SOLID principles in production code",
      ],
      technologies: ["Node.js", "TypeScript", "NestJS", "PostgreSQL", "Redis", "Code Reviews"],
    },
  ],

  about: {
    intro: "Backend-focused Software Engineering Trainee at Andersen with hands-on experience in TypeScript, Node.js, and secure API development.",
    focus: "clean architecture, auth & security, PostgreSQL/Prisma, performance",
    philosophy: [
      "Built Aegis2FA to understand authentication deeply, not to replace Auth0",
      "Learning through code reviews and collaborative development",
      "Tests should catch bugs, docs should explain why",
    ],
    tagline: "Backend systems. Clean architecture. Learning by building.",
  },

  skills: {
    languages: [
      { name: "TypeScript", level: "daily" as const, context: "Production backend systems" },
      { name: "JavaScript", level: "daily" as const, context: "Node.js APIs" },
      { name: "Python", level: "regular" as const, context: "Tooling & automation" },
      { name: "Rust", level: "learning" as const, context: "Security projects" },
    ],
    backend: [
      { name: "NestJS", level: "daily" as const, context: "Primary framework at work" },
      { name: "Express", level: "daily" as const, context: "Personal projects" },
      { name: "Fastify", level: "learning" as const },
      { name: "Django", level: "learning" as const },
    ],
    data: [
      { name: "PostgreSQL", level: "daily" as const, context: "Production databases" },
      { name: "Prisma", level: "daily" as const, context: "ORM of choice" },
      { name: "Redis", level: "regular" as const, context: "Caching & sessions" },
      { name: "MongoDB", level: "learning" as const },
    ],
    frontend: [
      { name: "Next.js", level: "regular" as const, context: "This portfolio" },
      { name: "React", level: "regular" as const },
      { name: "Tailwind CSS", level: "regular" as const },
    ],
    infrastructure: [
      { name: "Docker", level: "regular" as const, context: "Local dev & CI" },
      { name: "GitHub Actions", level: "regular" as const, context: "CI/CD pipelines" },
      { name: "Nginx", level: "learning" as const },
    ],
    operations: [
      "REST API design",
      "JWT/HttpOnly cookies",
      "RBAC",
      "Caching",
      "Pagination",
    ],
  },

  lookingFor: {
    role: "Junior / Trainee Backend Engineer",
    focus: ["Node.js", "TypeScript", "Backend systems", "Security-focused teams"],
    preferences: [
      "Open to mentorship and long-term growth",
      "Remote-friendly or Tbilisi-based",
      "Teams that value clean code and testing",
    ],
  },

  projects: [
    {
      id: "aegis2fa",
      title: "Aegis2FA",
      subtitle: "Two-Factor Authentication Service (Active Development)",
      description: "Self-hosted 2FA service implementing TOTP-based authentication, JWT with refresh token rotation, and Argon2 password hashing to secure user authentication flows.",
      longDescription: "Learning project to understand authentication deeply. Features TOTP, SMS, and Email verification with comprehensive documentation and tests. Active development with regular updates.",

      // Problem-Action-Result (concise for above-fold)
      problem: "Wanted to understand auth beyond tutorials—TOTP, Argon2, JWT rotation.",
      action: "Built complete 2FA service with multiple methods, 80%+ test coverage.",
      result: "Now applying these patterns in production at Andersen.",

      // Impact Metrics
      impact: {
        learning: { value: "Deep", label: "Auth Knowledge", description: "TOTP, JWT, Argon2, rate limiting" },
        quality: { value: "80%+", label: "Test Coverage", description: "Unit, integration, E2E" },
        documentation: { value: "Complete", label: "Docs Site", description: "MkDocs with examples" },
        status: { value: "Active", label: "Development", description: "Regular updates" },
      },

      technologies: [
        "Node.js",
        "Express.js",
        "TypeScript",
        "PostgreSQL",
        "Redis",
        "Prisma ORM",
        "Next.js 15",
        "Tailwind CSS",
        "Docker",
        "GitHub Actions",
        "MkDocs",
      ],
      features: [
        "Multiple 2FA methods (TOTP, SMS, Email, Backup codes)",
        "Argon2id password hashing",
        "JWT authentication with refresh tokens",
        "Rate limiting and CSRF protection",
        "Comprehensive documentation with MkDocs",
        "80%+ test coverage",
        "CI/CD with GitHub Actions",
        "Zero-budget deployment options",
      ],
      highlights: [
        "Technical deep-dive into authentication patterns",
        "Applying these patterns in production work now",
        "Test suite catches edge cases (80%+ coverage)",
        "Documentation-first approach",
      ],
      github: "https://github.com/Ilia01/Aegis2FA",
      demo: "https://Ilia01.github.io/Aegis2FA/",
      badges: [
        { label: "Backend CI", type: "success" },
        { label: "Frontend CI", type: "success" },
        { label: "Security Scanning", type: "success" },
        { label: "Documentation", type: "info" },
      ],
      category: "backend",
      featured: true,
    },
    {
      id: "apiflow",
      title: "ApiFlow",
      subtitle: "API Documentation Generator",
      description: "Static site generator for OpenAPI specs. Built it because I needed it, then used it to document my other projects.",
      longDescription: "Python tool that converts OpenAPI specifications into static HTML documentation. Built as a personal tool, then used for Aegis2FA and task-management-api docs.",

      // Problem-Action-Result (concise)
      problem: "Wanted offline API docs without hosted services.",
      action: "Built Python static site generator from OpenAPI YAML.",
      result: "Using it to document my own projects. No servers needed.",

      // Impact Metrics
      impact: {
        simplicity: { value: "YAML→HTML", label: "Static Output", description: "No backend needed" },
        usage: { value: "Dogfooding", label: "Real Use", description: "Used for own projects" },
        features: { value: "Search+Versions", label: "Core Features", description: "Fuzzy search, changelogs" },
        themes: { value: "3", label: "Design Options", description: "Clean, minimal themes" },
      },

      technologies: [
        "Python",
        "Jinja2",
        "OpenAPI 3.0",
        "Static Site Generation",
        "Markdown",
        "Syntax Highlighting",
      ],
      features: [
        "Converts .yaml → interactive static HTML",
        "Supports Markdown and syntax highlighting",
        "Fuzzy search functionality",
        "Version management with changelogs",
        "Tracks new/deprecated endpoints",
        "No server required — works offline",
        "Used to document task-management-api project",
      ],
      highlights: [
        "Built for personal use, actually using it",
        "Simple: YAML in, HTML out",
        "No server costs or dependencies",
        "Customizable with Jinja2 templates",
      ],
      github: "https://github.com/Ilia01/apiflow",
      category: "tooling",
      featured: true,
    },
    {
      id: "taskmanagerapi",
      title: "Task Management API",
      subtitle: "Interview Demo Project",
      description: "Node.js REST API demonstrating SOLID principles, design patterns, and JavaScript fundamentals.",
      longDescription: "Comprehensive Node.js/Express application built as a conceptual project for interview preparation, demonstrating clean code practices and fundamental concepts.",

      // Problem-Action-Result (concise)
      problem: "Needed interview-ready code demonstrating JS fundamentals.",
      action: "Built REST API with 15+ design patterns and SOLID principles.",
      result: "Interview-ready codebase showing production standards.",

      // Impact Metrics
      impact: {
        patterns: { value: "15+", label: "Design Patterns", description: "Factory, Observer, Strategy, etc" },
        concepts: { value: "SOLID", label: "Principles", description: "All 5 principles demonstrated" },
        documentation: { value: "ApiFlow", label: "Documented", description: "Self-documented via ApiFlow" },
        purpose: { value: "Interview", label: "Focus", description: "Interview preparation" },
      },

      technologies: [
        "Node.js",
        "Express",
        "JavaScript",
        "REST API",
        "OpenAPI",
      ],
      features: [
        "Demonstrates: Closures, Async/Await, EventEmitter, Middleware",
        "SOLID + Strategy, Factory, Observer, Singleton patterns",
        "Endpoints for tasks, stats, and health",
        "OpenAPI spec exported → documented through ApiFlow",
        "Focus: learning-by-doing for interview prep",
      ],
      highlights: [
        "JavaScript fundamentals showcase",
        "Design patterns in practice",
        "SOLID principles implementation",
        "Interview preparation focus",
      ],
      github: "https://github.com/Ilia01/Task-Management-API-Demo",
      category: "learning",
      featured: false,
    },
    {
      id: "worldsimulation",
      title: "World Simulation",
      subtitle: "Artificial Life Engine",
      description: "Artificial life simulation with evolving agents, real-time visualization, and production-like structure.",
      longDescription: "Systems design project featuring evolving agents with traits, mutation, and natural selection. Includes both CLI and web interfaces.",

      // Problem-Action-Result (concise)
      problem: "Wanted to practice systems design with real-time visualization.",
      action: "Built life simulation with clean architecture and dual UI.",
      result: "Production-like Python project showcasing extensible design.",

      // Impact Metrics
      impact: {
        agents: { value: "1000+", label: "Agents", description: "Simulated simultaneously" },
        ui: { value: "2", label: "Interfaces", description: "CLI + Web (Streamlit)" },
        architecture: { value: "Clean", label: "Structure", description: "Production-like layout" },
        extensible: { value: "Modular", label: "Design", description: "Easy to extend" },
      },

      technologies: [
        "Python",
        "NumPy",
        "Streamlit",
        "Rich CLI",
        "Pandas",
      ],
      features: [
        "Agents with traits, mutation, natural selection",
        "Real-time dashboards (Streamlit + Rich CLI)",
        "Clean package layout, logging, extensible behaviors",
        "Deterministic runs with RNG seeding",
        "Configurable world parameters",
        "Structured CSV logging",
      ],
      highlights: [
        "Systems design showcase",
        "Production-like structure",
        "Dual UI (CLI + Web)",
        "Extensible architecture",
      ],
      github: "https://github.com/Ilia01/World-Simulation",
      category: "simulation",
      featured: false,
    },
    {
      id: "pwdmanager",
      title: "Password Manager",
      subtitle: "Secure CLI Tool",
      description: "Secure CLI password manager using Argon2 key derivation and AES-256-GCM encryption.",
      longDescription: "Command-line password manager implementing modern cryptography standards for secure password storage and retrieval.",

      // Problem-Action-Result (concise)
      problem: "Wanted to learn Rust through a security-focused project.",
      action: "Built CLI password manager with Argon2 and AES-256-GCM.",
      result: "Learned Rust memory safety while implementing real crypto.",

      // Impact Metrics
      impact: {
        security: { value: "Argon2", label: "Key Derivation", description: "Modern crypto standard" },
        encryption: { value: "AES-256-GCM", label: "Encryption", description: "Military-grade" },
        safety: { value: "Rust", label: "Memory Safe", description: "No buffer overflows" },
        privacy: { value: "Zero", label: "Knowledge", description: "Master password never stored" },
      },

      technologies: [
        "Rust",
        "Argon2",
        "AES-256-GCM",
        "CLI",
      ],
      features: [
        "Store passwords encrypted with master password",
        "Generate strong random passwords",
        "Copy passwords from clipboard",
        "Warn about weak passwords",
        "Secure key derivation using Argon2",
        "Master password never stored",
        "Unique nonce for each password",
      ],
      highlights: [
        "Modern cryptography",
        "Rust security features",
        "CLI interface",
        "Zero-knowledge architecture",
      ],
      github: "https://github.com/Ilia01/Password-Manager",
      category: "security",
      featured: false,
    },
  ],
};

export type ProfileData = typeof profileData;
export type Project = typeof profileData.projects[0];
