import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata = {
  metadataBase: new URL("https://anasx07.github.io/AutaKimi-Release"),
  title: "AutaKimi - The Ultimate Manga Reader",
  description: "The ultimate manga experience on Windows. Free, extensible, and built for speed.",
  keywords: ["Manga", "Reader", "Windows", "AutaKimi", "Anime", "Free", "Extensions", "Arabic localization"],
  icons: {
    icon: "/AutaKimi-Release/favicon.png",
    shortcut: "/AutaKimi-Release/favicon.png",
    apple: "/AutaKimi-Release/assets/icon.png",
  },
  openGraph: {
    title: "AutaKimi - The Ultimate Manga Reader",
    description: "The ultimate manga experience on Windows. Free, extensible, and built for speed.",
    url: "https://anasx07.github.io/AutaKimi-Release",
    siteName: "AutaKimi",
    images: [
      {
        url: "/AutaKimi-Release/assets/icon.png",
        width: 512,
        height: 512,
        alt: "AutaKimi Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://anasx07.github.io/AutaKimi-Release",
  },
  verification: {
    google: "oLob_47r8e6mHEe8beX6u_sSm-eGtaljDpJQkZ_jeuw",
  },
};

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import StarfieldShader from "@/components/backgrounds/StarfieldShader";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark scroll-smooth`}>
      <body className="antialiased min-h-screen flex flex-col relative">
        <StarfieldShader />
        <Navbar />
        <main className="flex-1 w-full flex flex-col items-center pt-32">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
