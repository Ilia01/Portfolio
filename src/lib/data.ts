export const profileData = {
  name: "Ilia Goginashvili",
  tagline: "I use Arch btw. I ship backends — and sometimes, the tools that document them.",
  role: "Backend Developer",
  roleExtended: "Node.js (NestJS/Express) · TypeScript · Python",
  focus: "clean architecture, auth & security, PostgreSQL/Prisma, performance",

  contact: {
    email: "iliagoginashvili16@gmail.com",
    linkedin: "https://www.linkedin.com/in/ilia-goginashvili-066689305",
    github: "https://github.com/Ilia01",
    cvAvailable: true,
  },

  about: {
    intro: "Backend Developer — Node.js (NestJS/Express) · TypeScript · Python",
    focus: "clean architecture, auth & security, PostgreSQL/Prisma, performance",
    philosophy: [
      "Ship one high-quality public repo (backend first, frontend minimal)",
      "Prioritize correctness, observability, docs over flash",
      "Keep configs reproducible (Docker) and predictable (scripts)",
    ],
    tagline: "Tools minimal. Docs automated. Code speaks.",
  },

  skills: {
    languages: [
      { name: "TypeScript", proficiency: 95 },
      { name: "JavaScript", proficiency: 95 },
      { name: "Python", proficiency: 85 },
      { name: "Rust", proficiency: 70 },
    ],
    backend: [
      { name: "NestJS", proficiency: 90 },
      { name: "Express", proficiency: 95 },
      { name: "Fastify", proficiency: 60 },
      { name: "Django", proficiency: 75 },
    ],
    data: [
      { name: "PostgreSQL", proficiency: 90 },
      { name: "Prisma", proficiency: 90 },
      { name: "Redis", proficiency: 80 },
      { name: "MongoDB", proficiency: 75 },
    ],
    frontend: [
      { name: "Next.js", proficiency: 80 },
      { name: "React", proficiency: 80 },
      { name: "Tailwind CSS", proficiency: 85 },
    ],
    infrastructure: [
      { name: "Docker", proficiency: 85 },
      { name: "GitHub Actions", proficiency: 80 },
      { name: "Nginx", proficiency: 75 },
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
      subtitle: "Two-Factor Authentication Service",
      description: "Production-ready 2FA service with enterprise-grade security, multiple 2FA methods, and comprehensive API.",
      longDescription: "Enterprise-grade two-factor authentication service with TOTP, SMS, and Email verification. Features comprehensive documentation, 80%+ test coverage, and zero-budget deployment options.",

      // Problem-Action-Result
      problem: "Companies need secure, cost-effective 2FA solutions but existing services cost $99+/month and lock you into their platforms.",
      action: "Built a production-ready, self-hosted 2FA service with multiple auth methods, enterprise security standards, and comprehensive documentation.",
      result: "Created a zero-cost alternative saving businesses $1,188/year while maintaining enterprise-grade security with 80%+ test coverage and automated CI/CD.",

      // Impact Metrics
      impact: {
        performance: { value: "99.9%", label: "Uptime", description: "High availability" },
        quality: { value: "80%+", label: "Test Coverage", description: "Comprehensive testing" },
        security: { value: "Zero", label: "CVEs", description: "No known vulnerabilities" },
        cost: { value: "$1,188", label: "Cost Savings", description: "vs paid alternatives/year" },
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
        "Production-ready backend API",
        "Enterprise security standards",
        "Full test coverage (80%+)",
        "Automated CI/CD pipeline",
        "Comprehensive documentation",
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
      description: "Python static site generator for OpenAPI specs with version management and offline support.",
      longDescription: "Beautiful API documentation generator that converts OpenAPI specifications into interactive static HTML sites. Built first as a tool, then used to document other projects.",

      // Problem-Action-Result
      problem: "Swagger UI is outdated and paid doc services like ReadMe cost $99/month minimum, locking developers into expensive platforms.",
      action: "Built a Python static site generator that converts OpenAPI specs into beautiful, searchable HTML with version management and offline support.",
      result: "Created a free, open-source alternative that generates docs 90% faster than manual writing, saving $1,188/year vs paid services.",

      // Impact Metrics
      impact: {
        performance: { value: "90%", label: "Faster", description: "vs manual documentation" },
        cost: { value: "$1,188", label: "Saved/Year", description: "vs ReadMe/Stoplight" },
        adoption: { value: "Self", label: "Dogfooding", description: "Used for own projects" },
        quality: { value: "3", label: "Themes", description: "Premium design options" },
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
        "First project built",
        "Used for own documentation needs",
        "Zero-cost alternative to paid services",
        "Static output for easy deployment",
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
