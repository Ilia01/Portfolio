import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ConsoleEggs } from "@/components/console-eggs";
import { StructuredData } from "@/components/structured-data";
import { CustomCursor } from "@/components/custom-cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ilia Goginashvili | Backend Developer & Node.js Team Lead",
    template: "%s | Ilia Goginashvili",
  },
  description:
    "Backend engineer specializing in Node.js, TypeScript, and clean architecture. Currently leading Node.js team at Andersen. Built Aegis2FA, ApiFlow, and production-ready authentication systems. Available for full-time roles and consulting.",
  keywords: [
    "Backend Developer",
    "Node.js Team Lead",
    "TypeScript Expert",
    "NestJS Developer",
    "Express.js",
    "PostgreSQL",
    "Prisma ORM",
    "Authentication Expert",
    "Clean Architecture",
    "Software Engineer",
    "Backend Consultant",
    "API Development",
    "Microservices",
    "Tbilisi Georgia Developer",
  ],
  authors: [{ name: "Ilia Goginashvili", url: "https://github.com/Ilia01" }],
  creator: "Ilia Goginashvili",
  publisher: "Ilia Goginashvili",
  metadataBase: new URL("https://ilia-goginashvili.dev"), // Update with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ilia-goginashvili.dev", // Update with your actual domain
    title: "Ilia Goginashvili | Backend Developer & Node.js Team Lead",
    description:
      "Backend engineer with team leadership experience. Built Aegis2FA, ApiFlow, and production systems at Andersen. Specializing in Node.js, TypeScript, and authentication architecture.",
    siteName: "Ilia Goginashvili Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ilia Goginashvili - Backend Developer & Node.js Team Lead",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ilia Goginashvili | Backend Developer & Node.js Team Lead",
    description:
      "Backend engineer building production systems with Node.js, TypeScript, and clean architecture",
    images: ["/og-image.png"],
    creator: "@ilia_dev", // Update with your Twitter handle if you have one
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <CustomCursor />
          <ConsoleEggs />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
