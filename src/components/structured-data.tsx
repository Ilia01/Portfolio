/**
 * Structured Data (JSON-LD) for SEO
 * Provides machine-readable information about the person and website
 */

export function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ilia Goginashvili",
    jobTitle: "Software Engineer Team Lead",
    description:
      "Backend developer specializing in Node.js, TypeScript, and clean architecture",
    url: "https://ilia-goginashvili.dev", // Update with your actual domain
    image: "https://ilia-goginashvili.dev/og-image.png",
    worksFor: {
      "@type": "Organization",
      name: "Andersen",
      url: "https://andersenlab.com",
    },
    knowsAbout: [
      "Node.js",
      "TypeScript",
      "JavaScript",
      "Python",
      "NestJS",
      "Express.js",
      "PostgreSQL",
      "Prisma ORM",
      "RESTful APIs",
      "Authentication Systems",
      "Clean Architecture",
      "Microservices",
      "Docker",
      "Git",
    ],
    sameAs: [
      "https://github.com/Ilia01",
      "https://linkedin.com/in/ilia-goginashvili", // Update with your LinkedIn
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Business and Technology University", // Update if different
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ilia Goginashvili Portfolio",
    url: "https://ilia-goginashvili.dev",
    description: "Portfolio and blog of Ilia Goginashvili, Backend Developer",
    author: {
      "@type": "Person",
      name: "Ilia Goginashvili",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
