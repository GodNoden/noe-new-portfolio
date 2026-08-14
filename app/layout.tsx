import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/app/components/ThemeToggle"
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "./lib/context";
import LanguageSelector from "@/app/components/LanguageSelector";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Noe's Portfolio",
  description: "Showcasing my work and skills as a backend developer.",
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors"
        suppressHydrationWarning
      >
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
