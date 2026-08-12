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
    icon: "/brand/icon-512.png",
    apple: "/brand/icon-180.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

const THEME_SCRIPT = `(function(){try{document.documentElement.classList.remove("dark")}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: Readonly<React.ReactNode> }>) {
  return (
    <html lang="en-IN" className="light" style={{ colorScheme: "light" }}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
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
        </ToastProvider>
      </body>
    </html>
  );
}
