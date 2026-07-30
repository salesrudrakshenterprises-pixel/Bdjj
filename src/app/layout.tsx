import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { SacredParticles } from "@/components/shared/SacredParticles";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Brahm Divya Jeewan Jyoti | Spiritual Guidance & Divine Blessings",
  description:
    "Discover divine peace and spiritual guidance with Gurudev at Brahm Divya Jeewan Jyoti. Join satsangs, meditation, events, and become part of a spiritual community.",
  keywords: ["spiritual", "gurudev", "meditation", "satsang", "divine", "blessings", "BDJJ"],
  manifest: "/manifest.json",
  openGraph: {
    title: "Brahm Divya Jeewan Jyoti",
    description: "Your path to divine peace and spiritual enlightenment",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#C8A45C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <ThemeProvider>
          <SacredParticles />
          <Navbar />
          <main className="relative z-10 min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
