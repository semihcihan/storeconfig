import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { ConditionalFooter } from "@/components/conditional-footer";
import { StructuredData } from "@/components/structured-data";
import { config } from "@/lib/config";

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
    default: "StoreConfig - Automate App Store Connect the Smart Way",
    template: "%s - StoreConfig",
  },
  description:
    "Free and open-source App Store Connect automation. StoreConfig runs locally, uses your own Apple credentials, and manages metadata, in-app purchases, subscriptions, pricing, and more with JSON.",
  keywords: [
    "App Store Connect",
    "app store connect automation",
    "automate app store connect",
    "iOS",
    "App Store Connect API",
    "CLI",
    "open source",
    "free developer tool",
    "local CLI",
    "in-app purchases",
    "subscriptions",
    "pricing",
    "automation",
    "developer tools",
    "JSON configuration",
    "App Store management",
    "fastlane",
  ],
  authors: [
    { name: "Semih Cihan", url: "https://semihcihan.dev" },
    { name: "Selçuk Cihan", url: "https://selcukcihan.com" },
  ],
  creator: "StoreConfig Team",
  publisher: "StoreConfig",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://storeconfig.com"),
  openGraph: {
    title: "StoreConfig - Automate App Store Connect the Smart Way",
    description:
      "Free and open-source App Store Connect automation. StoreConfig runs locally, uses your own Apple credentials, and manages App Store Connect with JSON.",
    type: "website",
    url: "https://storeconfig.com",
    siteName: "StoreConfig",
    images: [
      {
        url: "/ogimage.jpeg",
        width: 1200,
        height: 630,
        alt: "StoreConfig - App Store Connect Management Tool",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "StoreConfig - Automate App Store Connect the Smart Way",
    description:
      "Free and open-source App Store Connect automation that runs locally from your machine.",
    images: ["/ogimage.jpeg"],
    creator: "@scihan",
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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "StoreConfig",
  url: config.baseUrl,
  logo: `${config.baseUrl}/icon.png`,
  sameAs: [
    config.github.repository,
    "https://semihcihan.dev",
    "https://selcukcihan.com",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "StoreConfig",
  url: config.baseUrl,
  description:
    "Free and open-source App Store Connect automation. StoreConfig runs locally and manages metadata, localizations, in-app purchases, subscriptions, pricing, and availability with JSON-based configuration.",
  publisher: {
    "@type": "Organization",
    name: "StoreConfig",
    url: config.baseUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StructuredData data={organizationSchema} id="organization" />
        <StructuredData data={websiteSchema} id="website" />
        <Header />
        <main className="bg-page relative">
          <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-float-1"></div>
            <div className="absolute bottom-0 right-1/4 w-[32rem] h-[32rem] bg-accent/8 rounded-full blur-3xl animate-float-2"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/3 rounded-full blur-2xl animate-float-3"></div>
          </div>
          <div className="relative z-10">{children}</div>
        </main>
        <ConditionalFooter />
      </body>
    </html>
  );
}
