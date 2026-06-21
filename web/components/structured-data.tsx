import Script from "next/script";

interface StructuredDataProps {
  data: Record<string, unknown>;
  id?: string;
}

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

function buildStructuredDataId(data: Record<string, unknown>, id?: string) {
  if (id) {
    return `structured-data-${id}`;
  }
  return `structured-data-${hashString(JSON.stringify(data))}`;
}

export function StructuredData({ data, id }: StructuredDataProps) {
  return (
    <Script
      id={buildStructuredDataId(data, id)}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 2),
      }}
    />
  );
}

export const homepageProductSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "StoreConfig CLI",
  description:
    "Free and open-source App Store Connect automation that runs locally. Manage metadata, localizations, in-app purchases, subscriptions, pricing, and availability with JSON-based configuration.",
  url: "https://storeconfig.com",
  applicationCategory: "Developer Application",
  featureList: [
    "Easy to Use - Prepare App Store Connect in minutes instead of hours",
    "Quick App Duplication - Copy configurations between apps",
    "Configuration as Code - Define everything in JSON files",
    "Vibe Code Your App Store Connect Setup - Use our MCP server and AI to vibe code your JSON configuration for app descriptions, content updates, in-app purchases, subscriptions, and more.",
    "Multi-Language Support - Manage localized content",
    "Bulk Operations - Make changes across multiple products",
    "Bidirectional Sync - Fetch and apply changes",
    "Interactive Pricing - Set prices based on Purchasing Power Parity",
    "Local-Only - Use your own App Store Connect credentials from your machine",
    "Free and Open Source - No subscription required",
  ],
  screenshot: "https://storeconfig.com/demo.mp4",
  author: {
    "@type": "Organization",
    name: "StoreConfig",
    url: "https://storeconfig.com",
  },
  publisher: {
    "@type": "Organization",
    name: "StoreConfig",
    url: "https://storeconfig.com",
  },
  datePublished: "2025-10-07",
  dateModified: new Date().toISOString().split("T")[0],
  version: "1.0.0",
};

// FAQ page schema
export const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is StoreConfig?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "StoreConfig is a powerful CLI tool that automates App Store Connect management. It allows you to manage in-app purchases, subscriptions, pricing, localizations, and metadata using JSON-based configuration files, saving you hours of manual work.",
      },
    },
    {
      "@type": "Question",
      name: "How does StoreConfig work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "StoreConfig uses JSON configuration files to define your app structure. You can fetch existing configurations from App Store Connect, modify them locally, and then apply changes back to App Store Connect. The tool handles all the complex interactions for you using the App Store Connect API.",
      },
    },
    {
      "@type": "Question",
      name: "How much does StoreConfig cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "StoreConfig is free and open source. There are no StoreConfig subscriptions, trials, payment flows, or hosted account requirements.",
      },
    },
    {
      "@type": "Question",
      name: "What can I manage with StoreConfig?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "StoreConfig can manage in-app purchases, subscriptions, app pricing, localizations, metadata, availability, and more. You can also duplicate app configurations and perform bulk operations across multiple territories.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get started with StoreConfig?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Install the CLI, configure your local App Store Connect API credentials with storeconfig apple, fetch your app configuration, edit and validate the JSON, then apply changes directly from your machine.",
      },
    },
  ],
};

// About page schemas
export const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About StoreConfig",
  description:
    "We're on a mission to make App Store Connect management effortless for developers worldwide.",
  url: "https://storeconfig.com/about",
  mainEntity: {
    "@type": "Organization",
    name: "StoreConfig",
    description:
      "Free and open-source App Store Connect automation that runs locally with your own Apple credentials.",
    url: "https://storeconfig.com",
    foundingDate: "2025",
    founder: [
      {
        "@type": "Person",
        name: "Semih Cihan",
        jobTitle: "Developer",
        url: "https://semihcihan.dev",
        sameAs: "https://semihcihan.dev",
      },
      {
        "@type": "Person",
        name: "Selçuk Cihan",
        jobTitle: "Developer, ex-Amazon",
        url: "https://selcukcihan.com",
        sameAs: "https://selcukcihan.com",
      },
    ],
  },
};

// Docs page schemas
export const docsArticleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "StoreConfig Documentation",
  description:
    "Everything you need to know to get started with StoreConfig and manage your App Store Connect configurations.",
  url: "https://storeconfig.com/docs",
  author: {
    "@type": "Organization",
    name: "StoreConfig",
    url: "https://storeconfig.com",
  },
  publisher: {
    "@type": "Organization",
    name: "StoreConfig",
    url: "https://storeconfig.com",
    logo: {
      "@type": "ImageObject",
      url: "https://storeconfig.com/icon.png",
    },
  },
  datePublished: "2025-10-07",
  dateModified: new Date().toISOString().split("T")[0],
  mainEntityOfPage: "https://storeconfig.com/docs",
  about: {
    "@type": "SoftwareApplication",
    name: "StoreConfig CLI",
    description:
      "Automate App Store Connect app management with a powerful CLI tool",
  },
};

export const docsHowToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Get Started with StoreConfig",
  description:
    "Step-by-step guide to install and configure StoreConfig for App Store Connect management",
  totalTime: "PT15M",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "USD",
    value: "0",
  },
  supply: [
    {
      "@type": "HowToSupply",
      name: "Apple Developer Account",
    },
    {
      "@type": "HowToSupply",
      name: "App Store Connect API Key (.p8 file)",
    },
  ],
  tool: [
    {
      "@type": "HowToTool",
      name: "Terminal/Command Line",
    },
    {
      "@type": "HowToTool",
      name: "Text Editor",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      name: "Install StoreConfig",
      text: "Install the CLI tool globally on your system using npm install -g storeconfig",
      url: "https://storeconfig.com/docs#install",
    },
    {
      "@type": "HowToStep",
      name: "Add Apple Credentials",
      text: "Set up your App Store Connect API credentials using storeconfig apple command with your issuer ID, key ID, and key path",
      url: "https://storeconfig.com/docs#apple-credentials",
    },
    {
      "@type": "HowToStep",
      name: "Fetch Your App",
      text: "Download your app configuration to get started using storeconfig fetch",
      url: "https://storeconfig.com/docs#fetch",
    },
    {
      "@type": "HowToStep",
      name: "Apply Changes",
      text: "Upload your changes back to App Store Connect using storeconfig apply",
      url: "https://storeconfig.com/docs#apply",
    },
  ],
};

// Schemas page schema
export const schemasPageSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "StoreConfig JSON Schema Documentation",
  description:
    "Comprehensive JSON schema documentation for StoreConfig data structures, validation rules, and configuration options.",
  url: "https://storeconfig.com/schemas",
  author: {
    "@type": "Organization",
    name: "StoreConfig",
    url: "https://storeconfig.com",
  },
  publisher: {
    "@type": "Organization",
    name: "StoreConfig",
    url: "https://storeconfig.com",
    logo: {
      "@type": "ImageObject",
      url: "https://storeconfig.com/icon.png",
    },
  },
  datePublished: "2025-10-07",
  dateModified: new Date().toISOString().split("T")[0],
  mainEntityOfPage: "https://storeconfig.com/schemas#appstoremodel",
  about: {
    "@type": "SoftwareApplication",
    name: "StoreConfig CLI",
    description:
      "Automate App Store Connect app management with a powerful CLI tool",
  },
  isPartOf: {
    "@type": "WebSite",
    name: "StoreConfig Documentation",
    url: "https://storeconfig.com/docs",
  },
};
