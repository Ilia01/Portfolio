import type { Metadata } from 'next';
import { Instrument_Serif, Figtree, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { StructuredData } from '@/components/structured-data';

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

const figtree = Figtree({
  variable: '--font-figtree',
  subsets: ['latin'],
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Ilia Goginashvili | Backend Engineer',
    template: '%s | Ilia Goginashvili',
  },
  description:
    'Backend engineer based in Tbilisi, Georgia. Building systems and open-source tools with TypeScript, Node.js, and PostgreSQL.',
  keywords: [
    'Backend Engineer',
    'Software Engineer',
    'TypeScript',
    'Node.js',
    'NestJS',
    'PostgreSQL',
    'Open Source',
    'CLI Tools',
    'Tbilisi',
    'Georgia',
  ],
  authors: [{ name: 'Ilia Goginashvili', url: 'https://github.com/Ilia01' }],
  creator: 'Ilia Goginashvili',
  metadataBase: new URL('https://www.iliagoginashvili.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.iliagoginashvili.com',
    title: 'Ilia Goginashvili | Backend Engineer',
    description:
      'Backend engineer based in Tbilisi, Georgia. Building systems and open-source tools with TypeScript, Node.js, and PostgreSQL.',
    siteName: 'Ilia Goginashvili',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ilia Goginashvili - Backend Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ilia Goginashvili | Backend Engineer',
    description:
      'Backend engineer building systems and open-source tools with TypeScript and Node.js.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
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
      <body
        className={`${instrumentSerif.variable} ${figtree.variable} ${ibmPlexMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
