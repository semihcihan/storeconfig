import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VideoPlayer } from "@/components/ui/video-player";
import { Infographic } from "@/components/infographic";
import { Footer } from "@/components/footer";
import {
  StructuredData,
  homepageProductSchema,
} from "@/components/structured-data";
import { ScrollSnapManager } from "@/components/scroll-snap-manager";
import { FeatureCard } from "@/components/feature-card";
import {
  Zap,
  Copy,
  DollarSign,
  CheckCircle,
  FileText,
  Bot,
  Languages,
  RefreshCw,
  Github,
  Terminal,
  ShieldCheck,
} from "lucide-react";
import { Metadata } from "next";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Terminal,
    title: "Runs Locally",
    description:
      "Install the CLI, add your own App Store Connect API key, and run fetch, validate, pricing, and apply from your machine.",
  },
  {
    icon: Copy,
    title: "Quick App Duplication",
    description:
      "Copy App Store Connect data from an existing app to a new app in minutes.",
  },
  {
    icon: FileText,
    title: "Configuration as Code",
    description:
      "Define your app's entire App Store Connect configuration in a single JSON file. Track every change with version control.",
  },
  {
    icon: Bot,
    title: "Vibe Code Your App Store Connect Setup",
    description:
      "Use the included MCP server so AI tools understand the schema, fetch current state, and help edit StoreConfig JSON.",
  },
  {
    icon: Languages,
    title: "Multi-Language Support",
    description:
      "Easily manage localized content across all supported territories.",
  },
  {
    icon: Zap,
    title: "Bulk Operations",
    description:
      "Make changes across multiple products, subscriptions, or territories at once.",
  },
  {
    icon: RefreshCw,
    title: "Bidirectional Sync",
    description:
      "Fetch current state of your app and apply changes to App Store Connect.",
  },
  {
    icon: DollarSign,
    title: "Interactive Pricing",
    description:
      "Use Apple’s standard pricing tiers or Purchasing Power based regional pricing to ensure fairness and maximize revenue.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col relative scroll-snap-container">
      <ScrollSnapManager />
      {/* Structured Data */}
      <StructuredData data={homepageProductSchema} />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative z-10 min-h-screen flex items-center"
      >
        <div className="container mx-auto px-4 py-24 lg:py-32 relative w-full">
          <div className="text-center space-y-8">
            <div className="flex justify-center gap-3">
              {["Free", "Open Source"].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary shadow-[0_0_24px_rgba(106,213,232,0.12)]"
                >
                  {label}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Automate App Store Connect
              <span className="block bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
                the Smart Way
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-foreground max-w-3xl mx-auto leading-snug">
              Transform{" "}
              <span className="font-semibold text-foreground">
                hours of manual work
              </span>{" "}
              into{" "}
              <span className="font-semibold text-foreground">
                minutes of automation
              </span>
              <br />
              Manage everything through simple, repeatable JSON configurations.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" asChild>
                <Link href="/docs">Install StoreConfig</Link>
              </Button>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <Badge variant="gradient" className="text-md">
                  metadata
                </Badge>
                <Badge variant="gradient" className="text-md">
                  localizations
                </Badge>
                <Badge variant="gradient" className="text-md">
                  in-app purchases
                </Badge>
                <Badge variant="gradient" className="text-md">
                  subscriptions
                </Badge>
                <Badge variant="gradient" className="text-md">
                  pricing
                </Badge>
                <Badge variant="gradient" className="text-md">
                  availability
                </Badge>
              </div>

              <div className="text-center space-y-6 mt-24">
                <p className="text-3xl md:text-4xl text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    Configuration as Code
                  </span>{" "}
                  for App Store Connect
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infographic Section */}
      <Infographic />

      {/* Demo Section */}
      <section
        id="demo"
        className="py-20 relative z-10 min-h-screen flex items-center"
      >
        <div className="container mx-auto px-4 w-full">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              See StoreConfig in Action
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Watch how easy it is to manage your App Store Connect apps
            </p>
          </div>

          <div className="max-w-xs md:max-w-md lg:max-w-xl xl:max-w-2xl mx-auto">
            <Card className="overflow-hidden border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-xl">
              <VideoPlayer src="/demo.mp4" title="StoreConfig Demo Video" />
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-12 md:py-16 relative z-10 min-h-screen flex items-center"
      >
        <div className="container mx-auto px-4 w-full">
          <div className="text-center space-y-3 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Powerful Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your App Store Connect apps
              efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto mb-10">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        id="get-started"
        className="py-20 relative z-10 flex items-center"
      >
        <div className="container mx-auto px-4 w-full">
          <div className="text-center space-y-3 mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join developers who have already saved hundreds of hours with
              StoreConfig.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Free
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                StoreConfig is free to use. There are no paid plans, trials, or
                checkout flows.
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Github className="h-5 w-5 text-primary" />
                  Open Source
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Inspect the code, file issues, and adapt the tool for your own
                App Store Connect workflow.
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  Local-Only
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Apple credentials stay on your machine and commands call App
                Store Connect directly.
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
            <Button size="lg" asChild>
              <Link href="/docs">Quick Start</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full pt-8">
        <Footer />
      </footer>
    </div>
  );
}
