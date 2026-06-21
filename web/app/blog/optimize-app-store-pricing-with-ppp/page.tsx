import { Metadata } from "next";
import { StructuredData } from "@/components/structured-data";
import { config } from "@/lib/config";
import { getBlogPostBySlug } from "@/lib/blog/posts";
import { CommandBlock } from "@/components/ui/command-block";
import { JsonSyntaxHighlighter } from "@/components/ui/json-syntax-highlighter";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PricingComparisonTable } from "./pricing-comparison-table";
import { FetchDemo } from "./fetch-demo";
import { SetPriceDemo } from "./set-price-demo";
import { CTACard } from "@/components/cta-card";
import storeconfigBeforeApply from "./before-apply.json";
import storeconfigAfterApply from "./after-apply.json";

const slug = "optimize-app-store-pricing-with-ppp";

function getPost() {
  const post = getBlogPostBySlug(slug);
  if (!post) {
    throw new Error(`Missing blog post: ${slug}`);
  }
  return post;
}

function getCanonicalPath() {
  return `/blog/${slug}`;
}

export const metadata: Metadata = {
  title:
    "App Store Pricing Mistake Costing You 35% Revenue (And How to Fix It in 5 Minutes) | StoreConfig",
  description:
    "Learn how to maximize revenue and user acquisition globally using StoreConfig's set-price command with Purchasing Power Parity (PPP) strategy. See up to 35% revenue increase with fair, automated pricing.",
  alternates: {
    canonical: getCanonicalPath(),
  },
  openGraph: {
    title:
      "App Store Pricing Mistake Costing You 35% Revenue (And How to Fix It in 5 Minutes) | StoreConfig",
    description:
      "Learn how to maximize revenue and user acquisition globally using StoreConfig's set-price command with Purchasing Power Parity (PPP) strategy. See up to 35% revenue increase with fair, automated pricing.",
    type: "article",
    url: getCanonicalPath(),
    siteName: "StoreConfig",
    images: [
      {
        url: "/ogimage-blog2.jpeg",
        width: 1200,
        height: 630,
        alt: "StoreConfig - App Store Connect Management Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "App Store Pricing Mistake Costing You 35% Revenue (And How to Fix It in 5 Minutes) | StoreConfig",
    description:
      "Learn how to maximize revenue and user acquisition globally using StoreConfig's set-price command with Purchasing Power Parity (PPP) strategy. See up to 35% revenue increase with fair, automated pricing.",
    images: ["/ogimage-blog2.jpeg"],
    creator: "@scihan",
  },
};

const comparisonRows = [
  {
    territory: "United States",
    localCurrency: "$9.99 USD",
    appleUsd: "$9.99 USD",
    pppUsd: "$9.99 USD",
  },
  {
    territory: "India",
    localCurrency: "₹999.00 INR",
    appleUsd: "$11.06 USD",
    pppUsd: "$2.27 USD",
  },
  {
    territory: "Japan",
    localCurrency: "¥1,500 JPY",
    appleUsd: "$9.49 USD",
    pppUsd: "$5.95 USD",
  },
  {
    territory: "Germany",
    localCurrency: "€9.99 EUR",
    appleUsd: "$11.62 USD",
    pppUsd: "$8.36 USD",
  },
  {
    territory: "China",
    localCurrency: "¥68 CNY",
    appleUsd: "$9.73 USD",
    pppUsd: "$4.84 USD",
  },
];

export default function BlogPostPage() {
  const post = getPost();
  const canonicalUrl = `${config.baseUrl}${getCanonicalPath()}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    author: {
      "@type": "Organization",
      name: "StoreConfig",
      url: config.baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "StoreConfig",
      url: config.baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${config.baseUrl}/icon.png`,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    image: `${config.baseUrl}/ogimage-blog2.jpeg`,
    about: {
      "@type": "SoftwareApplication",
      name: "StoreConfig CLI",
      description:
        "A CLI tool for automating App Store Connect app management with JSON-based workflows.",
    },
  };

  return (
    <div className="py-24 relative">
      <StructuredData data={articleSchema} />
      <div className="container mx-auto px-4 relative z-10">
        <article className="max-w-4xl mx-auto">
          <header className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold">{post.title}</h1>
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              <span className="text-foreground/90 font-medium">
                {post.authorName}
              </span>
              <span>·</span>
              <time dateTime={post.publishedAt}>{post.publishedAt}</time>
            </div>
          </header>

          <Card className="border-primary/10 bg-background/60 backdrop-blur-md shadow-lg">
            <CardContent className="p-6 md:p-10">
              <div className="prose-content blog-prose mx-auto">
                <h2>Introduction</h2>
                <p>
                  Apple&apos;s default pricing relies on simple exchange rates.
                  While easy, this ignores a critical factor:{" "}
                  <strong>Purchasing Power Parity (PPP)</strong>. By not
                  adjusting for local spending power, you are effectively
                  overcharging users in emerging markets and leaving revenue on
                  the table.
                </p>

                <h2>The Problem: Why Default Pricing Fails Globally</h2>

                <p>
                  <strong>Apple&apos;s approach:</strong> $9.99 USD in the US,
                  ₹999.00 INR ($11.06 USD) in India—same price tier, wildly
                  different purchasing power.
                </p>
                <p>
                  To a user in India, that $11.06 might feel like paying $50 for
                  a $10 item. It&apos;s simply unaffordable for the mass market.
                </p>

                <p>
                  <strong>With Purchasing Power Parity:</strong> $9.99 USD in
                  the US, $2.27 USD (₹999.00 INR) in India—fair pricing that
                  reflects what people can actually afford.
                </p>

                <h3>Understanding Purchasing Power Parity</h3>
                <p>
                  States that the same amount of money should buy the same
                  things in different countries, once exchange rates are
                  accounted for.
                </p>

                <h3>Real-World Price Discrepancies</h3>
                <p>
                  Let&apos;s compare what happens when you set a $9.99 USD price
                  using Apple&apos;s default pricing strategy versus Purchasing
                  Power Parity:
                </p>
                <PricingComparisonTable
                  rows={comparisonRows}
                  showPppColumn={true}
                  className="my-8"
                />

                <h2>The Solution: StoreConfig&apos;s set-price Command</h2>
                <p>
                  StoreConfig&apos;s <code>set-price</code> command provides an
                  interactive way to set prices for your app, in-app purchases,
                  and subscriptions. It supports two pricing strategies:
                </p>
                <ol>
                  <li>
                    <strong>Apple Strategy</strong>: Uses Apple&apos;s default
                    pricing tiers (exchange rate based)
                  </li>
                  <li>
                    <strong>Purchasing Power Strategy</strong>: Adjusts prices
                    based on purchasing power parity
                  </li>
                </ol>
                <p>Let&apos;s see it in action.</p>

                <h2>Demo: Using set-price to Optimize Your Pricing</h2>

                <h3>Prerequisites</h3>
                <p>Before we begin, make sure you have:</p>
                <ul>
                  <li>StoreConfig installed and configured</li>
                  <li>
                    A <code>storeconfig.json</code> file (you can create one by
                    running <code>storeconfig fetch</code>)
                  </li>
                </ul>
                <p>
                  For this example, we&apos;ll be working with an in-app
                  purchase from a demo app.
                </p>

                <h3>Step 1: Fetch Your Current App Configuration</h3>
                <p>
                  First, let&apos;s fetch the current state of your app from App
                  Store Connect:
                </p>
                <CommandBlock command="storeconfig fetch" />

                <div className="my-6">
                  <FetchDemo />
                </div>
                <p>
                  The command creates a <code>storeconfig.json</code> file with
                  your app&apos;s current configuration.
                </p>
                <div className="my-4">
                  <details className="group">
                    <summary className="flex items-center gap-2 cursor-pointer text-base font-medium text-muted-foreground hover:text-foreground transition-colors select-none mb-2">
                      <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                      <span>Show storeconfig.json</span>
                    </summary>
                    <div className="mt-2">
                      <JsonSyntaxHighlighter data={storeconfigBeforeApply} />
                    </div>
                  </details>
                </div>

                <h3>
                  Step 2: Set Prices with Purchasing Power Parity Strategy
                </h3>
                <p>
                  Now, let&apos;s use the <code>set-price</code> command to
                  optimize pricing with the Purchasing Power Parity strategy:
                </p>
                <CommandBlock command="storeconfig set-price" />
                <p className="mt-4">
                  The interactive command will guide you through:
                </p>
                <ol>
                  <li>
                    <strong>Selecting what to price</strong>: Price of the app,
                    in-app purchases, or subscriptions.
                  </li>
                  <li>
                    <strong>Choosing a base price</strong>: Enter your base
                    price in USD.
                  </li>
                  <li>
                    <strong>Selecting a pricing strategy</strong>: Apple or PPP.
                  </li>
                  <li>
                    <strong>Setting minimum price (optional)</strong>:
                    Optionally set a minimum price to avoid prices that are too
                    low in certain territories.
                  </li>
                </ol>
                <div className="my-6">
                  <SetPriceDemo />
                </div>
                <p>
                  The command automatically updates your{" "}
                  <code>storeconfig.json</code> file with optimized pricing for
                  all territories.
                </p>
                <div className="my-4">
                  <details className="group">
                    <summary className="flex items-center gap-2 cursor-pointer text-base font-medium text-muted-foreground hover:text-foreground transition-colors select-none mb-2">
                      <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                      <span>
                        Show storeconfig.json (after set-price with PPP)
                      </span>
                    </summary>
                    <div className="mt-2">
                      <JsonSyntaxHighlighter data={storeconfigAfterApply} />
                    </div>
                  </details>
                </div>

                <p>
                  You can see how PPP pricing adjusts prices to be more
                  affordable in emerging markets. This creates a fairer pricing
                  structure that maximizes both user acquisition and revenue.
                </p>

                <h3>Step 3: Apply Your Changes</h3>
                <p>
                  Once you&apos;re satisfied with your pricing strategy, apply
                  the changes to App Store Connect:
                </p>
                <CommandBlock command="storeconfig apply" />
                <p className="mt-4">
                  This command will apply your pricing configuration to App
                  Store Connect.
                </p>

                <h2>Best Practices &amp; Tips</h2>

                <h3>When to Use Each Strategy</h3>
                <p>
                  <strong>Use Apple Strategy when:</strong>
                </p>
                <ul>
                  <li>
                    You want to maintain consistent USD-equivalent prices across
                    all territories
                  </li>
                  <li>You prefer Apple&apos;s standard pricing tiers</li>
                </ul>
                <p>
                  <strong>Use Purchasing Power Strategy when:</strong>
                </p>
                <ul>
                  <li>You want to maximize global user acquisition</li>
                  <li>Your app targets emerging markets</li>
                  <li>You want to optimize revenue across all territories</li>
                  <li>
                    You&apos;re willing to adjust prices based on local
                    purchasing power
                  </li>
                </ul>

                <h3>Setting Minimum Prices</h3>
                <p>
                  The <code>set-price</code> command allows you to set a minimum
                  price to prevent prices from going too low in certain
                  territories. This is useful if:
                </p>
                <ul>
                  <li>
                    You want to maintain a certain price floor for brand
                    positioning
                  </li>
                  <li>You need to account for costs</li>
                </ul>

                <h3>Version Control Your Pricing</h3>
                <p>
                  Store your <code>storeconfig.json</code> file in version
                  control (Git). This gives you:
                </p>
                <ul>
                  <li>
                    <strong>Historical reference</strong>: See how your pricing
                    and your app configuration has evolved over time
                  </li>
                  <li>
                    <strong>Easy rollback</strong>: Revert to previous pricing
                    if needed
                  </li>
                  <li>
                    <strong>Analytics correlation &amp; A/B testing</strong>:
                    When analyzing your app&apos;s performance, you can
                    reference your Git history to see what pricing was active
                    during specific time periods
                  </li>
                  <li>
                    <strong>Collaboration</strong>: Share your pricing strategy
                  </li>
                </ul>

                <h2>Conclusion</h2>
                <p>
                  Optimizing your App Store pricing with Purchasing Power Parity
                  can significantly impact your app&apos;s success. By aligning
                  prices with local purchasing power, you can:
                </p>
                <ul>
                  <li>
                    <strong>Increase conversions</strong> in emerging markets
                    where users were previously priced out
                  </li>
                  <li>
                    <strong>Achieve up to 35% revenue increase</strong> compared
                    to exchange-rate-based pricing
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12">
            <CTACard />
          </div>
        </article>
      </div>
    </div>
  );
}
