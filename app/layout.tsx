import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/app/components/ThemeToggle"
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "./lib/context";
import LanguageSelector from "@/app/components/LanguageSelector";
import { personJsonLd, site, siteUrl } from "./lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: `${site.name} — Portfolio`,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  category: 'technology',
  keywords: [
    'Noe Quezada',
    'Backend Engineer',
    'Backend Developer',
    'Java',
    'Spring Boot',
    'AWS',
    'AWS Lambda',
    'Serverless',
    'Apache Kafka',
    'PostgreSQL',
    'Microservices',
    'Event-driven architecture',
    'Fintech',
    'Guadalajara',
    'Remote backend engineer',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'profile',
    url: siteUrl,
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: 'en_US',
    alternateLocale: ['es_MX', 'fr_FR'],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          // Serialised once at build time from a static object: no user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem>
          <LanguageProvider>
            <header className="flex justify-end items-center gap-3 p-4 max-w-5xl mx-auto">
              <LanguageSelector />
              <ThemeToggle />
            </header>
            <main className="max-w-5xl mx-auto p-4 md:p-8">
              {children}
            </main>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html >
  );
}
