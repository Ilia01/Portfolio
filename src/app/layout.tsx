import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ConsoleEggs } from "@/components/console-eggs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ilia Goginashvili | Backend Developer",
  description: "Backend Developer specializing in Node.js, TypeScript, and Python. Building production-ready APIs with clean architecture.",
  keywords: ["Backend Developer", "Node.js", "TypeScript", "Python", "NestJS", "Express", "PostgreSQL", "Prisma"],
  authors: [{ name: "Ilia Goginashvili" }],
  openGraph: {
    title: "Ilia Goginashvili | Backend Developer",
    description: "Backend Developer specializing in Node.js, TypeScript, and Python",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ConsoleEggs />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
