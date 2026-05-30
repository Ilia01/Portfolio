import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/structured-data";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ilia Goginashvili | Full-Stack Developer",
    template: "%s | Ilia Goginashvili",
  },
  description:
    "Full-stack developer based in Tbilisi. I design and build product-grade web platforms end-to-end with TypeScript, Next.js, Node, and PostgreSQL.",
  keywords: [
    "Full-Stack Developer",
    "Frontend Developer",
    "Backend Engineer",
    "TypeScript",
    "Next.js",
    "Node.js",
    "React",
    "NestJS",
    "PostgreSQL",
    "Freelance",
    "Tbilisi",
    "Georgia",
  ],
  authors: [{ name: "Ilia Goginashvili", url: "https://github.com/Ilia01" }],
  creator: "Ilia Goginashvili",
  metadataBase: new URL("https://www.iliagoginashvili.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.iliagoginashvili.com",
    title: "Ilia Goginashvili | Full-Stack Developer",
    description:
      "Full-stack developer based in Tbilisi. Designing and building product-grade web platforms end-to-end.",
    siteName: "Ilia Goginashvili",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ilia Goginashvili, Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ilia Goginashvili | Full-Stack Developer",
    description:
      "Full-stack developer building product-grade web platforms end-to-end.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body className={`${geist.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
