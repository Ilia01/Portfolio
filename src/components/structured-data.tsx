export function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ilia Goginashvili",
    jobTitle: "Backend Engineer",
    description:
      "Backend engineer building systems and open-source tools with TypeScript and Node.js",
    url: "https://ilia-goginashvili.dev",
    image: "https://ilia-goginashvili.dev/og-image.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tbilisi",
      addressCountry: "GE",
    },
    knowsAbout: [
      "TypeScript",
      "Node.js",
      "NestJS",
      "Express",
      "PostgreSQL",
      "Docker",
      "GitHub Actions",
      "Redis",
      "Prisma",
      "REST APIs",
      "CLI Tools",
      "Open Source",
    ],
    sameAs: [
      "https://github.com/Ilia01",
      "https://www.linkedin.com/in/ilia-goginashvili-066689305",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ilia Goginashvili",
    url: "https://ilia-goginashvili.dev",
    description:
      "Portfolio of Ilia Goginashvili, backend engineer based in Tbilisi, Georgia",
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
