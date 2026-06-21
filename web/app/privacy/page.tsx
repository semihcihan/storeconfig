import { config } from "@/lib/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How StoreConfig handles privacy for the local open-source CLI and documentation website.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground">
              Last updated: June 17, 2026
            </p>
          </div>

          <div className="prose-content">
            <h2>Overview</h2>
            <p>
              StoreConfig is a free, open-source command-line tool for managing
              App Store Connect configuration from your own machine. The CLI no
              longer depends on an account system, payment flow, or remote
              processing service.
            </p>

            <h2>CLI Data</h2>
            <p>
              The StoreConfig CLI stores your App Store Connect API credentials
              locally on your machine. It uses those credentials to call App
              Store Connect directly. StoreConfig does not receive, host, or
              store your Apple private key, Key ID, Issuer ID, app
              configuration files, or apply jobs.
            </p>
            <p>
              You are responsible for protecting local files on your machine and
              for revoking or rotating App Store Connect API keys if needed.
            </p>

            <h2>Website Data</h2>
            <p>
              The StoreConfig website is documentation and marketing content.
              We do not use the website to create accounts, process payments, or
              upload Apple credentials.
            </p>
            <p>
              Like most websites, hosting providers may process basic technical
              information such as IP address, browser type, requested pages, and
              timestamps to serve the site, monitor reliability, and prevent
              abuse.
            </p>

            <h2>Communications</h2>
            <p>
              If you contact us by email or through GitHub, we process the
              information you choose to provide so we can respond, troubleshoot,
              and improve the project.
            </p>

            <h2>Third-Party Services</h2>
            <p>
              StoreConfig interacts with App Store Connect when you run CLI
              commands locally. GitHub may process information when you view the
              repository, open issues, or contribute. Those services are
              governed by their own privacy policies.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about privacy? Contact us at {config.contact.email}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
