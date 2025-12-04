# Portfolio

My personal portfolio and technical blog built with Next.js 15, showcasing backend development projects and writing about authentication, security, and software architecture.

## Features

- **Blog** - Technical articles on JWT, TOTP, rate limiting, testing, and Docker
- **Portfolio** - Project showcases with live stats and detailed case studies
- **Interactive Terminal** - Easter eggs and terminal emulator
- **Table of Contents** - Sticky TOC with scroll spy for blog posts
- **Dark Mode** - Full theme support

## Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Styling:** Tailwind CSS v4
- **Content:** Velite (MDX compilation)
- **Animations:** Framer Motion
- **Code Editor:** Monaco Editor
- **Deployment:** Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Visit `http://localhost:3000`

## Blog Infrastructure

- Posts written in MDX with frontmatter
- Automatic TOC generation from headings
- Syntax highlighting with rehype-pretty-code
- SEO metadata generation
- Tag filtering and sorting

## Lab Feature

The `/lab` route contains an interactive code playground with Monaco editor. Currently hidden from production navigation but accessible via direct URL for development.

To enable in production, uncomment the lab link in `src/components/navigation.tsx`.

## Development

```bash
# Run Velite to process MDX content
npx velite

# Check for TypeScript errors
npm run build

# Lint code
npm run lint
```

## License

MIT
