import { Metadata } from "next";
import { StructuredData } from "@/components/structured-data";
import { config } from "@/lib/config";
import { getBlogPostBySlug } from "@/lib/blog/posts";
import { CommandBlock } from "@/components/ui/command-block";
import { SnippetBlock } from "@/components/ui/snippet-block";
import { JsonSyntaxHighlighter } from "@/components/ui/json-syntax-highlighter";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CTACard } from "@/components/cta-card";
import { starterStoreConfigJson, endStoreConfigJson } from "./storeconfig-data";

const slug = "how-to-vibe-code-your-app-store-connect-setup";

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
  title: "How to vibe code your App Store Connect setup",
  description:
    "Use AI to localize your app, create subscriptions and in-app purchases, and configure App Store Connect—all by editing a single JSON file. Fetch your current state, edit with AI, validate, and apply safely.",
  alternates: {
    canonical: getCanonicalPath(),
  },
  openGraph: {
    title: "How to vibe code your App Store Connect setup",
    description:
      "Use AI to localize your app, create subscriptions and in-app purchases, and configure App Store Connect—all by editing a single JSON file. Fetch your current state, edit with AI, validate, and apply safely.",
    type: "article",
    url: getCanonicalPath(),
    siteName: "StoreConfig",
    images: [
      {
        url: "/ogimage.jpeg",
        width: 1200,
        height: 630,
        alt: "StoreConfig - App Store Connect Automation Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to vibe code your App Store Connect setup",
    description:
      "Use AI to localize your app, create subscriptions and in-app purchases, and configure App Store Connect—all by editing a single JSON file. Fetch your current state, edit with AI, validate, and apply safely.",
    images: ["/ogimage.jpeg"],
    creator: "@scihan",
  },
};

export default function BlogPostPage() {
  const post = getPost();
  const canonicalUrl = `${config.baseUrl}${getCanonicalPath()}`;
  const mcpPromptText = `Set up storeconfig.json for my app. Here's what I need:

This is an AI Calorie Tracker app, localize for English, Spanish, French and Turkish.

Make the app available worldwide.
Make it free.
Setup 1 in app purchase for $99.99 USD for lifetime access.
Setup 2 subscriptions:
- Weekly subscription for $2.99 USD
- Yearly subscription for $49.99 USD
- Give 1 week free trial introductory offer for the yearly subscription.`;

  const manualPromptText = `Use the JSON schema https: https://storeconfig.com/storeconfig-schema.json for the storeconfig.json file to set it up. Fill all the fields.

Make the IDs unique by prepending dev.semihcihan.caltracker (our bundle id), except for the app ID.
Make the app available worldwide.
Make it free.
Setup 1 in app purchase for $99.99 USD for lifetime access.
Setup 2 subscriptions:
- Weekly subscription for $2.99 USD
- Yearly subscription for $49.99 USD
- Give 1 week free trial introductory offer for the yearly subscription.

Root Level Localizations:
- This is an AI Calorie Tracker app, fill in the localization for en-US. Then translate it to Spanish, French and Turkish.
- Make description long and beautiful, talk about the benefits. Use line breaks to make it more readable. Do not use emojis.
- Separate keywords with a single comma and no space. Do not repeat title and subtitle words in the keywords within the same localization.
- Note that missing fields for additional root localizations will be filled with the values from the primary locale. Skip instead of repeating to use the same values.

After updating the file, validate it by running:
storeconfig validate

If validation fails, fix the JSON and repeat until it passes.
`;

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
    image: `${config.baseUrl}/ogimage.jpeg`,
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
                <p>
                  Configuring App Store Connect is painful. Now that we vibe
                  code applications, why not vibe code the App Store Connect
                  setup too?
                </p>

                <p>
                  This post shows how to{" "}
                  <strong>
                    use AI to localize your app, create subscriptions and in-app
                    purchases, and configure App Store Connect
                  </strong>
                  —all by editing a single JSON file. Fetch, edit with AI,
                  validate, and apply.
                </p>

                <h2>What do you need?</h2>
                <ul>
                  <li>
                    <strong>An App Store Connect account</strong>
                  </li>
                  <li>
                    <strong>
                      VSCode, Cursor, your favorite IDE, or just a terminal
                    </strong>
                  </li>
                  <li>
                    <strong>StoreConfig</strong>
                  </li>
                </ul>

                <h2>What is StoreConfig?</h2>
                <p>
                  StoreConfig is a CLI tool for automating App Store Connect app
                  management with JSON-based workflows. You manage your app’s
                  configuration in a single JSON file and apply it to App Store
                  Connect. This makes App Store Connect configuration
                  reproducible, reviewable, and AI-friendly.
                </p>

                <h2>Let&apos;s begin</h2>
                <p>
                  I created a new App ID on Apple Developer (
                  <a
                    href="https://developer.apple.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    developer.apple.com
                  </a>
                  ) and created a new app in App Store Connect.
                </p>
                <p>
                  I now have an empty iOS app in App Store Connect. Let’s call
                  it <strong>“Vibe Coded Calorie Tracker”</strong>, because I
                  don’t want to be the only one without a calorie tracker app.
                </p>

                <h2>Set up StoreConfig</h2>
                <p>
                  StoreConfig is now free, open source, and local-only. Install
                  the CLI and configure your own App Store Connect API key.
                </p>
                <p>
                  Then follow the first 3 steps in the{" "}
                  <a
                    href="/docs#quick-start"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Quick Start
                  </a>
                  .
                </p>

                <h3>Set up the MCP Server (Recommended)</h3>
                <p>
                  StoreConfig includes a{" "}
                  <a
                    href="/docs#ai-support"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Model Context Protocol (MCP) server
                  </a>{" "}
                  that gives AI assistants direct access to the JSON schema,
                  validation tools, and your app configuration. This makes the
                  AI workflow much smoother.
                </p>
                <p className="text-sm">
                  <strong>Note:</strong> The MCP server requires StoreConfig CLI
                  version 0.0.23 or higher.{" "}
                  <a
                    href="/docs#update-storeconfig"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Update StoreConfig
                  </a>{" "}
                  if needed.
                </p>

                <h2>Let’s vibe code the App Store Connect setup</h2>

                <h3>Option 1: Using the MCP Server (Recommended)</h3>
                <p>
                  With the MCP server, the AI knows the schema, can fetch your
                  app configuration, and validate changes automatically.
                </p>

                <h4>1) Ask your AI to fetch and set up your app</h4>
                <p>
                  Ask your AI assistant to fetch your app configuration and set
                  it up. The MCP server provides everything needed—no schema
                  URLs or manual validation required.
                </p>
                <p>Here&apos;s an example prompt:</p>
                <SnippetBlock text={mcpPromptText} />
                <p>The AI will automatically:</p>
                <ul>
                  <li>Fetch your app configuration from App Store Connect</li>
                  <li>Understand the JSON schema</li>
                  <li>Make the requested changes</li>
                  <li>Iterate and fine tune the configuration</li>
                </ul>

                <div className="mt-4">
                  <details className="group">
                    <summary className="flex items-center gap-2 cursor-pointer text-base font-medium text-muted-foreground hover:text-foreground transition-colors select-none mb-2">
                      <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                      <span>Show Vibe coded updated config</span>
                    </summary>
                    <div className="mt-2">
                      <JsonSyntaxHighlighter data={endStoreConfigJson} />
                    </div>
                  </details>
                </div>

                <h4>2) Apply changes to App Store Connect</h4>
                <p>
                  When satisfied, ask the AI to apply it or run the command
                  yourself:
                </p>
                <CommandBlock command="storeconfig apply" />
                <p>
                  You may see errors; the terminal messages will guide you. Fix
                  them yourself or ask your AI to fix the config. Common errors:
                </p>
                <ul>
                  <li>&quot;Product ID is already in use&quot;</li>
                  <li>&quot;Product ID is too long&quot;</li>
                  <li>&quot;Price point is not valid&quot;</li>
                </ul>
                <p>
                  Applying takes ~10 minutes. With AI and StoreConfig, we can
                  automate one of the most tedious parts of App Store setup.
                </p>

                <details className="group">
                  <summary className="flex items-center gap-2 cursor-pointer text-2xl font-bold mb-4 hover:text-foreground transition-colors select-none">
                    <ChevronRight className="h-5 w-5 transition-transform group-open:rotate-90" />
                    <span>Option 2: Manual Method (Without MCP Server)</span>
                  </summary>
                  <div className="mt-4">
                    <p>
                      Without an MCP-compatible AI client, provide the schema
                      URL and handle validation manually.
                    </p>

                    <h4>1) Fetch your app config from App Store Connect</h4>
                    <p>Open your terminal and run:</p>
                    <CommandBlock command="storeconfig fetch" />
                    <p>
                      Select the app you want to work on. This creates a{" "}
                      <code>storeconfig.json</code> in the current directory.
                    </p>
                    <p>
                      At this point, there isn’t much to see. Here’s what a
                      freshly fetched, mostly empty configuration looks like:
                    </p>
                    <JsonSyntaxHighlighter data={starterStoreConfigJson} />

                    <h4>
                      2) Ask your favorite agent to fill out storeconfig.json
                    </h4>
                    <p>
                      The key is giving the agent the StoreConfig JSON schema,
                      so it knows what fields exist and how the JSON should be
                      structured This turns App Store Connect into a{" "}
                      <em>typed interface</em> the AI can reason about, instead
                      of vague instructions.
                    </p>
                    <p>
                      Here’s the prompt I use (copy/paste it and adjust as
                      needed):
                    </p>
                    <SnippetBlock text={manualPromptText} />

                    <h4>3) Fine tune the configuration</h4>
                    <p>
                      Once the agent is done, you can fine tune anything you
                      want. The agent will have made some assumptions for you.
                      For example, it might set a random privacy policy and
                      marketing URL. Or you may not like the description it
                      wrote. Ask for a change, iterate on the configuration.
                    </p>

                    <h4>4) Apply changes to App Store Connect</h4>
                    <CommandBlock command="storeconfig apply" />
                    <p>
                      This applies your changes to App Store Connect. You may
                      see some errors before or during the process; the terminal
                      messages will tell you what to do.
                    </p>
                    <p>
                      You can fix them yourself, or paste the error logs into
                      your agent and have it fix the config. Common examples:
                    </p>
                    <ul>
                      <li>“Product ID is already in use”</li>
                      <li>“Product ID is too long”</li>
                      <li>“Price point is not valid”</li>
                    </ul>
                    <p>
                      Applying can take around 10 minutes. This is unfortunately
                      due to Apple’s API limitations. Each territory (there are
                      a lot) has to be applied separately for availability,
                      subscriptions, etc. Apple being Apple, they don’t want to
                      make it easy for us.
                    </p>
                    <p>
                      But thanks to AI and StoreConfig, we can automate one of
                      the most boring parts of creating apps for the App Store.
                    </p>
                    <p>
                      Congratulations! You have now set up your app on App Store
                      Connect with AI and StoreConfig.
                    </p>
                  </div>
                </details>

                <h2>Use another app as a template</h2>
                <p>
                  You probably already have an app in App Store Connect that’s
                  similar in pricing, subscriptions, in-app purchases, etc.
                  Fetch that as a template instead of your new app and use its
                  configuration as a starting point.
                </p>
                <p>After fetching the template configuration:</p>
                <ul>
                  <li>
                    Change the template’s app ID to the new app ID (in my case,
                    the app ID of Vibe Coded Calorie Tracker).
                  </li>
                  <li>
                    Change all IDs for in-app purchases, subscription groups,
                    and subscriptions. IDs must be universally unique, not just
                    unique within your account. (That’s why we used the bundle
                    id as a prefix)
                  </li>
                  <li>
                    Change names, descriptions, keywords, promotional text,
                    what’s new, etc. to your own.
                  </li>
                </ul>
                <p>
                  Make sure you don’t do all this manually while your agent is
                  sitting idle. Tell it to do it for you.
                </p>
                <p>
                  Then apply your changes with <code>storeconfig apply</code>.
                </p>

                <h2>Conclusion</h2>
                <p>
                  App Store Connect is slow, click-heavy, and not repeatable.
                  StoreConfig turns it into a versioned, reviewable, AI-editable
                  configuration. With the MCP server, the AI has direct access
                  to your configuration, schema, and validation tools. Instead
                  of clicking through dozens of screens, describe what you want
                  and let the AI handle it.
                </p>
                <p>This workflow is especially useful if you:</p>
                <ul>
                  <li>Ship and maintain multiple iOS apps</li>
                  <li>
                    Regularly update localizations, metadata, and ASO content
                    across multiple languages
                  </li>
                  <li>Want a repeatable App Store Connect setup</li>
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
