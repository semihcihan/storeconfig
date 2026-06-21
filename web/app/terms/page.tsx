import { config } from "@/lib/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms for using the StoreConfig website and local open-source CLI.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold">Terms of Service</h1>
            <p className="text-xl text-muted-foreground">
              Last updated: June 17, 2026
            </p>
          </div>

          <div className="prose-content">
            <h2>Agreement to Terms</h2>
            <p>
              These Terms govern your use of the StoreConfig website and
              documentation. StoreConfig itself is free and open-source
              command-line software; your use, modification, and distribution of
              the software are also governed by the license included in the
              repository.
            </p>

            <h2>Description</h2>
            <p>
              StoreConfig helps developers manage App Store Connect
              configuration through local JSON workflows. It can fetch current
              app state, validate configuration files, compare or set prices,
              and apply supported changes directly from your machine using your
              own App Store Connect API credentials.
            </p>
            <p>
              StoreConfig is not affiliated with or endorsed by Apple Inc. App
              Store Connect is a trademark of Apple Inc. Features may be limited
              by Apple APIs, permissions, and policies.
            </p>

            <h2>Local Open-Source Tool</h2>
            <p>
              StoreConfig is provided as a local open-source tool. The website
              is documentation and marketing content for that tool, not a
              hosted account, billing, or subscription service.
            </p>

            <h2>Your Responsibilities</h2>
            <p>You are responsible for:</p>
            <ul>
              <li>Using StoreConfig only for lawful purposes</li>
              <li>Complying with Apple&apos;s terms, policies, and API limits</li>
              <li>
                Protecting your local App Store Connect API keys and
                configuration files
              </li>
              <li>
                Reviewing generated or AI-assisted changes before applying them
                to App Store Connect
              </li>
              <li>Keeping backups or version history for important files</li>
            </ul>

            <h2>Open-Source Software</h2>
            <p>
              The source code is available through the public repository linked
              on this site. Contributions, issues, and feature requests are
              welcome through GitHub. The repository license controls the rights
              granted for the software itself.
            </p>

            <h2>Disclaimers</h2>
            <p>
              STORECONFIG IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF
              ANY KIND. We do not guarantee that the software or website will be
              error-free, uninterrupted, secure, or suitable for your specific
              use case.
            </p>
            <p>
              StoreConfig relies on third-party systems including App Store
              Connect, npm, hosting providers, and GitHub. We are not
              responsible for outages, policy changes, API changes, or
              limitations in those systems.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, we will not be liable for
              indirect, incidental, special, consequential, or punitive damages,
              or for loss of profits, revenue, data, or use arising from your
              use of StoreConfig, the website, or these Terms.
            </p>

            <h2>Changes</h2>
            <p>
              We may update these Terms from time to time by posting a new
              version on this page. Continued use of the website after changes
              are posted means you accept the updated Terms.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these Terms? Contact us at {config.contact.email}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
