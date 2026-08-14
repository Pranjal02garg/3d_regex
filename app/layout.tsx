import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import SearchOverlay from "@/components/layout/SearchOverlay";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { CartProvider } from "@/lib/cart";
import { ToastProvider } from "@/components/ui/Toast";
import { SITE } from "@/content/site";
import MetaPixel from "@/components/MetaPixel";
import { Suspense } from "react";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Regex Remedies — Natural Remedies For A Better You | Official Store",
    template: "%s · Regex Remedies",
  },
  description: SITE.description,
  applicationName: "Regex Remedies",
  keywords: [
    "Regex Remedies",
    "Regex Remedies Ayurveda",
    "Regex Remedies Official Store",
    "Livgex",
    "Kabzraj",
    "Gas-O-Gex",
    "Pilegex",
    "Lucogex",
    "Ayurvedic medicine India",
    "Natural remedies for a better you",
    "GMP certified ayurveda",
    "Digestive health remedies",
    "NABL lab tested supplements",
    "Ayurvedic liver support",
  ],
  authors: [{ name: "Regex Remedies" }],
  creator: "Regex Remedies",
  publisher: "Regex Remedies",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: "Regex Remedies",
    title: "Regex Remedies — Natural Remedies For A Better You",
    description: SITE.description,
    images: [{ url: "/images/banner-natural-remedies.jpg", width: 1200, height: 630, alt: "Regex Remedies Range" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Regex Remedies — Natural Remedies For A Better You",
    description: SITE.description,
    images: ["/images/banner-natural-remedies.jpg"],
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
  icons: {
    icon: "/favicon.ico",
    apple: "/brand/icon-180.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf8f3",
  colorScheme: "light",
};

import { Inter, Playfair_Display, IBM_Plex_Sans_Devanagari, IBM_Plex_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const plexDevanagari = IBM_Plex_Sans_Devanagari({
  subsets: ["devanagari"],
  display: "swap",
  variable: "--font-plex-deva",
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plex-mono",
  weight: ["400", "500", "600", "700"],
});

/* The site ships one theme: light Alabaster Parchment. */
const THEME_SCRIPT = `(function(){try{document.documentElement.classList.remove("dark");document.documentElement.classList.add("light")}catch(e){}})();`;

/* Load-in motion is anchored to the first paint, not to element creation.
   A bare CSS animation starts the moment the element exists — measured at
   334ms here, against a first paint of 376ms — so the hero cascade was
   30-70% spent before anything was on screen. Two rAFs after DOMContentLoaded
   puts the start just after the user can actually see the hero. */
const MOTION_READY_SCRIPT = `(function(){function g(){requestAnimationFrame(function(){requestAnimationFrame(function(){document.documentElement.setAttribute("data-motion-ready","")})})}if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",g)}else{g()}})();`;

/* suppressHydrationWarning on <html>: the theme and motion-ready scripts both
   stamp the element before React hydrates, so the server markup intentionally
   differs from the client DOM. It is scoped to this element's own attributes
   and does not suppress anything in the tree below. */
export default function RootLayout({
  children,
}: Readonly<{ children: Readonly<React.ReactNode> }>) {
  return (
    <html lang="en-IN" className="light" style={{ colorScheme: "light" }} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: MOTION_READY_SCRIPT }} />
        {/* Load-in holds elements at opacity 0 until the ready flag lands, so
            without JS they would never appear. Restore them outright. */}
        <noscript>
          <style>{`.rise-in,.stagger-item,.reveal,.reveal--fast{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${plexDevanagari.variable} ${plexMono.variable} font-sans`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-brand-fg"
        >
          Skip to content
        </a>
        <ToastProvider>
          <CartProvider>
            <Header />
            <main id="main" className="pt-22 sm:pt-24">
              {children}
            </main>
            <Footer />
            <CartDrawer />
            <SearchOverlay />
            <WhatsAppButton />
          </CartProvider>
          <Suspense fallback={null}>
            <MetaPixel />
          </Suspense>
        </ToastProvider>
      </body>
    </html>
  );
}
