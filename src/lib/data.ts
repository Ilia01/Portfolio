export const profileData = {
  name: "Ilia Goginashvili",
  tagline: "Software Engineer Trainee at Andersen, leading a Node.js team. Built Aegis2FA to learn auth the hard way.",
  role: "Software Engineer Trainee",
  roleExtended: "Node.js Team Lead at Andersen · TypeScript · NestJS · Express",
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
      role: "Software Engineer Trainee (Node.js Team Lead)",
      period: "October 2025 - Present",
      location: "T'bilisi, Georgia",
      highlights: [
        "Leading Node.js development team, conducting code reviews and architecture decisions",
        "Took on Tech Lead responsibilities including epic estimation",
        "Managing team workflow",
        "Implementing clean architecture patterns",
      ],
      technologies: ["Node.js", "TypeScript", "NestJS", "PostgreSQL", "Redis", "Team Leadership", "Code Reviews"],
    },
  ],

  about: {
    intro: "Software Engineer Trainee at Andersen, leading a Node.js team. Handling code reviews, epic estimation, and architecture decisions.",
    focus: "clean architecture, auth & security, PostgreSQL/Prisma, performance",
    philosophy: [
      "Built Aegis2FA to understand authentication deeply, not to replace Auth0",
      "Code reviews and team work over solo hero mode",
      "Tests should catch bugs, docs should explain why",
    ],
    tagline: "Backend systems. Team leadership. More leading, more code.",
  },

  skills: {
    languages: [
      { name: "TypeScript", level: "expert" as const },
      { name: "JavaScript", level: "expert" as const },
      { name: "Python", level: "proficient" as const },
      { name: "Rust", level: "familiar" as const },
    ],
    backend: [
      { name: "NestJS", level: "expert" as const },
      { name: "Express", level: "expert" as const },
      { name: "Fastify", level: "familiar" as const },
      { name: "Django", level: "familiar" as const },
    ],
    data: [
      { name: "PostgreSQL", level: "expert" as const },
      { name: "Prisma", level: "expert" as const },
      { name: "Redis", level: "proficient" as const },
      { name: "MongoDB", level: "familiar" as const },
    ],
    frontend: [
      { name: "Next.js", level: "proficient" as const },
      { name: "React", level: "proficient" as const },
      { name: "Tailwind CSS", level: "proficient" as const },
    ],
    infrastructure: [
      { name: "Docker", level: "proficient" as const },
      { name: "GitHub Actions", level: "proficient" as const },
      { name: "Nginx", level: "familiar" as const },
    ],
    operations: [
      "REST API design",
      "JWT/HttpOnly cookies",
      "RBAC",
      "Caching",
      "Pagination",
    ],
  },

  projects: [
    {
      id: "aegis2fa",
      title: "Aegis2FA",
      subtitle: "Two-Factor Authentication Service (Active Development)",
      description: "Built a complete 2FA service to understand authentication patterns. TOTP, JWT refresh tokens, Argon2, and 80%+ test coverage.",
      longDescription: "Learning project to understand authentication deeply. Features TOTP, SMS, and Email verification with comprehensive documentation and tests. Active development with regular updates.",

      // Problem-Action-Result
      problem: "Wanted to understand authentication beyond tutorials—how TOTP works, why Argon2 beats bcrypt, how JWT refresh token rotation prevents theft.",
      action: "Built a complete 2FA service from scratch with multiple auth methods, proper security patterns, and 80%+ test coverage. Documented everything I learned.",
      result: "Gained hands-on experience with authentication patterns. Now applying these lessons to production systems at Andersen.",

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

      // Problem-Action-Result
      problem: "Swagger UI feels outdated, and I wanted offline docs without paying for hosted services.",
      action: "Built a Python static site generator using Jinja2 templates. Takes OpenAPI YAML files and generates searchable HTML with version management.",
      result: "Created a tool I actually use. Documented Aegis2FA and task-management-api with it. No servers needed, works offline.",

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

      // Problem-Action-Result
      problem: "Need to demonstrate mastery of JavaScript fundamentals, SOLID principles, and design patterns for technical interviews.",
      action: "Built a comprehensive REST API showcasing 15+ design patterns, clean architecture, and core JavaScript concepts with extensive documentation.",
      result: "Created an interview-ready codebase that demonstrates production coding standards and architectural best practices.",

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

      // Problem-Action-Result
      problem: "Complex systems simulation often lacks proper architecture and real-time visualization capabilities.",
      action: "Built an artificial life engine with clean package structure, dual UI interfaces (CLI + Web), and extensible behavior system.",
      result: "Created a production-ready simulation framework showcasing systems design, clean architecture, and data visualization.",

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

      // Problem-Action-Result
      problem: "Many password managers are GUI-only, lack modern crypto standards, or store master passwords insecurely.",
      action: "Built a CLI password manager in Rust using Argon2 key derivation and AES-256-GCM encryption with zero-knowledge architecture.",
      result: "Created a secure, memory-safe password manager that never stores the master password and leverages Rust's safety guarantees.",

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
