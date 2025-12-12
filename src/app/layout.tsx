import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
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
    default: "Ilia Goginashvili | Backend Developer",
    template: "%s | Ilia Goginashvili",
  },
  description:
    "Backend-focused Software Engineer Trainee with hands-on experience in TypeScript, Node.js, and secure API development. Building production systems with clean architecture at Andersen. Open to opportunities.",
  keywords: [
    "Backend Developer",
    "Software Engineer Trainee",
    "TypeScript",
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
    title: "Ilia Goginashvili | Backend Developer",
    description:
      "Backend-focused Software Engineer Trainee building secure APIs and production systems with Node.js, TypeScript, and clean architecture at Andersen.",
    siteName: "Ilia Goginashvili Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ilia Goginashvili - Backend Developer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ilia Goginashvili | Backend Developer",
    description:
      "Backend-focused Software Engineer Trainee building production systems with Node.js, TypeScript, and clean architecture",
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
