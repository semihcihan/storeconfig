"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { CommandBlock } from "@/components/ui/command-block";
import { SnippetBlock } from "@/components/ui/snippet-block";
import {
  Terminal,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Plus,
  Link as LinkIcon,
} from "lucide-react";
import { NeedHelp } from "@/components/need-help";
import { CTACard } from "@/components/cta-card";
import {
  StructuredData,
  docsArticleSchema,
  docsHowToSchema,
} from "@/components/structured-data";
import { useState, useEffect } from "react";
import { JsonSyntaxHighlighter } from "@/components/ui/json-syntax-highlighter";
import exampleStoreConfigData from "../../../shared/example-storeconfig.json";

export function DocsPageClient() {
  const [showAppleCredentials, setShowAppleCredentials] = useState(false);
  const [showUpdateInstructions, setShowUpdateInstructions] = useState(false);
  const [expandedMcpClient, setExpandedMcpClient] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      if (id === "update-storeconfig") {
        setShowUpdateInstructions(true);
        const quickStartElement = document.getElementById("quick-start");
        if (quickStartElement) {
          quickStartElement.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, []);

  const toggleMcpClient = (client: string) => {
    setExpandedMcpClient(expandedMcpClient === client ? null : client);
  };

  const mcpConfig = {
    command: "storeconfig-mcp",
  };
  const mcpSnippets = {
    cursorConfig: JSON.stringify(
      {
        storeconfig: mcpConfig,
      },
      null,
      2
    ),
    vscodeConfig: `"mcp": {
  "servers": {
    "storeconfig": {
      "type": "stdio",
      "command": "storeconfig-mcp"
    }
  }
}`,
    vscodeCommand: `code --add-mcp '{"name":"storeconfig","command":"storeconfig-mcp"}'`,
    claudeCodeCommand: "claude mcp add storeconfig -- storeconfig-mcp",
    openaiCodexConfig: `[mcp_servers.storeconfig]
command = "storeconfig-mcp"`,
    vscodeSchemaSettings: `// root settings.json
{
  // Other settings (if any)...
  "json.schemas": [
    // Other schemas (if any)...
    {
      "fileMatch": ["*storeconfig*.json"],
      "url": "https://storeconfig.com/storeconfig-schema.json"
    }
  ]
}`,
    vscodeMcpConfig: {
      name: "storeconfig",
      type: "stdio",
      command: "storeconfig-mcp",
    },
    cursorInstallUrl: `cursor://anysphere.cursor-deeplink/mcp/install?name=storeconfig&config=${encodeURIComponent(btoa(JSON.stringify(mcpConfig)))}`,
  };

  const quickStartSteps = [
    {
      step: 1,
      title: "Install StoreConfig",
      command: "npm install -g storeconfig",
      description: "Install the CLI tool globally on your system.",
    },
    {
      step: 2,
      title: "Add Apple Credentials",
      command: "storeconfig apple --key-path /path/to/key.p8",
      description:
        "Set up your local App Store Connect API credentials. The command will prompt you for your <b>Issuer ID</b> and <b>Key ID</b>, while you provide the <b>Key Path</b> as an argument.",
      hasSubSteps: true,
    },
    {
      step: 3,
      title: "Fetch Your App",
      command: "storeconfig fetch",
      description:
        "Download your app configuration to get started (saves to <b>storeconfig.json</b> by default).",
    },
    {
      step: 4,
      title: "Edit and Validate",
      command: "storeconfig validate",
      description:
        "Edit <b>storeconfig.json</b>, then validate the file locally before applying changes.",
    },
    {
      step: 5,
      title: "Apply Changes",
      command: "storeconfig apply",
      description:
        "Apply your validated changes directly from your machine to App Store Connect (uses <b>storeconfig.json</b> by default).",
    },
  ];

  const appleCredentialsSteps = [
    {
      step: 1,
      title: "Open App Store Connect API Settings",
      command: "Visit App Store Connect",
      description:
        "Go to the App Store Connect API settings page.<br/>Make sure the <b>correct team</b> is selected on top right corner of the page.",
      link: "https://appstoreconnect.apple.com/access/integrations/api",
    },
    {
      step: 2,
      title: "Generate a New Team Key",
      command: "Click the Plus button",
      description:
        "Click the <b>'Plus' button</b> to create a new <b>Team Key</b> (Not Individual Key).<br/>Choose a <b>descriptive name</b> (e.g., 'StoreConfig') to easily identify it later.",
      hasIcon: true,
    },
    {
      step: 3,
      title: "Set Required Permissions",
      command: `Select "App Manager" Access`,
      description:
        "Select <b>App Manager</b> Access - this is required to manage prices and other app configurations.",
    },
    {
      step: 4,
      title: "Download and Copy Credentials",
      command: "Download .p8 file and copy IDs",
      description:
        "Download the <b>.p8 file</b>. Use its path as the <b>--key-path</b>.<br/><b>Key ID</b> is the <b>--key-id</b> for the apple command.<br/><b>Issuer ID</b> is the <b>--issuer-id</b>.",
    },
  ];

  const commands = [
    {
      command: "fetch",
      description: "Fetch current app configuration from App Store Connect",
      usage: "storeconfig fetch [--f my-app.json] [--id 1234567890] [--stdout]",
      options: [
        {
          flag: "--f, --file",
          description:
            "Output file path for the configuration (defaults to storeconfig.json)",
          required: false,
        },
        {
          flag: "--id",
          description:
            "Specific app ID to fetch (if not provided, you'll select from available apps)",
          required: false,
        },
        {
          flag: "--stdout",
          description:
            "Output JSON to stdout instead of a file: without --id prints app list [{id, name}]; with --id prints full app configuration",
          required: false,
        },
      ],
    },
    {
      command: "apply",
      description: "Apply changes from JSON file to App Store Connect",
      usage: "storeconfig apply [--f my-app.json] [--p]",
      options: [
        {
          flag: "--f, --file",
          description:
            "Input file path for the configuration (defaults to storeconfig.json)",
          required: false,
        },
        {
          flag: "--p, --preview",
          description: "Preview changes without applying them",
          required: false,
        },
      ],
    },
    {
      command: "set-price",
      description:
        "Set prices for your app, in-app purchases, and subscriptions interactively. This updates pricing only in your configuration file; changes won't be applied to App Store Connect until you run the `apply` command.",
      usage: "storeconfig set-price [--f my-app.json]",
      options: [
        {
          flag: "--f, --file",
          description:
            "Input file path for the configuration (defaults to storeconfig.json)",
          required: false,
        },
      ],
    },
    {
      command: "compare-price",
      description: "Compare prices across territories in USD",
      usage:
        "storeconfig compare-price [--f my-app.json] [--o price-analysis.csv]",
      options: [
        {
          flag: "--f, --file",
          description: "Input JSON file path (defaults to storeconfig.json)",
          required: false,
        },
        {
          flag: "--o, --output",
          description: "Output CSV file path (defaults to compare-price.csv)",
          required: false,
        },
      ],
    },
    {
      command: "validate",
      description:
        "Validate the JSON file format and structure. Useful to check if your configuration file is valid before applying changes.",
      usage: "storeconfig validate [--f my-app.json]",
      options: [
        {
          flag: "--f, --file",
          description:
            "Input file path for the configuration (defaults to storeconfig.json)",
          required: false,
        },
      ],
    },
    {
      command: "example",
      description: "Generate example JSON files for different data types",
      usage: "storeconfig example [--type minimal] [--file output.json]",
      options: [
        {
          flag: "--t, --type",
          description:
            "Type of example (minimal, full, subscription, iap) - if not provided, you'll select interactively",
          required: false,
        },
        {
          flag: "--f, --file",
          description:
            "Path to the output JSON file (defaults to storeconfig_example.json)",
          required: false,
        },
      ],
    },
    {
      command: "apple",
      description:
        "Add local Apple App Store Connect credentials. This is a one-time setup command to enter your App Store Connect Issuer ID, Key ID and API key path.",
      usage: "storeconfig apple --key-path /path/to/key.p8",
      options: [
        {
          flag: "--key-path",
          description: "Path to Apple private API key (.p8 file)",
          required: true,
        },
      ],
    },
  ];

  return (
    <div className="py-24">
      <StructuredData data={docsArticleSchema} />
      <StructuredData data={docsHowToSchema} />
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold">
              StoreConfig Documentation
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know to get started with StoreConfig and
              manage your App Store Connect configurations.
            </p>
          </div>

          {/* Quick Start Section */}
          <section className="mb-16">
            <h2
              id="quick-start"
              className="text-3xl font-bold mb-8 group relative pl-10 -ml-10"
            >
              <a
                href="#quick-start"
                className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center text-muted-foreground hover:text-foreground"
                aria-label="Link to Quick Start section"
              >
                <LinkIcon className="h-5 w-5" />
              </a>
              Quick Start
            </h2>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="h-5 w-5" />
                  Installation & Setup
                </CardTitle>
                <CardDescription>
                  Get up and running with StoreConfig in just a few minutes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {quickStartSteps.map((step, index) => (
                    <div key={index} className="space-y-4">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                            {step.step}
                          </div>
                        </div>
                        <div className="flex-1 space-y-2">
                          <h3 className="font-semibold">{step.title}</h3>
                          <CommandBlock command={step.command} />
                          <p
                            className="text-muted-foreground"
                            dangerouslySetInnerHTML={{
                              __html: step.description,
                            }}
                          />
                          {step.step === 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                setShowUpdateInstructions(
                                  !showUpdateInstructions
                                )
                              }
                              className="text-primary hover:text-primary/80"
                            >
                              How to update StoreConfig?
                              {showUpdateInstructions ? (
                                <ChevronDown className="ml-1 h-4 w-4" />
                              ) : (
                                <ChevronRight className="ml-1 h-4 w-4" />
                              )}
                            </Button>
                          )}
                          {step.hasSubSteps && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                setShowAppleCredentials(!showAppleCredentials)
                              }
                              className="text-primary hover:text-primary/80"
                            >
                              How to get these credentials?
                              {showAppleCredentials ? (
                                <ChevronDown className="ml-1 h-4 w-4" />
                              ) : (
                                <ChevronRight className="ml-1 h-4 w-4" />
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                      {step.step === 1 && showUpdateInstructions && (
                        <div
                          id="update-storeconfig"
                          className="ml-12 space-y-2 border-l-2 border-muted pl-6"
                        >
                          <CommandBlock command="npm install -g storeconfig@latest" />
                        </div>
                      )}

                      {step.hasSubSteps && showAppleCredentials && (
                        <div className="ml-12 space-y-4 border-l-2 border-muted pl-6">
                          {appleCredentialsSteps.map((subStep, subIndex) => (
                            <div key={subIndex} className="flex gap-4">
                              <div className="flex-shrink-0">
                                <div className="h-6 w-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-semibold">
                                  {subStep.step}
                                </div>
                              </div>
                              <div className="flex-1 space-y-2">
                                <h4 className="font-medium text-sm">
                                  {subStep.title}
                                </h4>
                                <div className="bg-muted/50 p-2 rounded flex items-center gap-2">
                                  {subStep.hasIcon && (
                                    <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                                      <Plus className="h-3 w-3 text-white" />
                                    </div>
                                  )}
                                  {subStep.link ? (
                                    <a
                                      href={subStep.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs font-mono text-primary hover:underline"
                                    >
                                      {subStep.command}
                                    </a>
                                  ) : (
                                    <span className="text-xs font-mono text-muted-foreground">
                                      {subStep.command}
                                    </span>
                                  )}
                                </div>
                                <p
                                  className="text-xs text-muted-foreground"
                                  dangerouslySetInnerHTML={{
                                    __html: subStep.description,
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                          <div className="mt-6 flex justify-center">
                            <Image
                              src="/team_id_show.jpg"
                              alt="App Store Connect API showing Issuer ID and Key ID fields"
                              width={800}
                              height={600}
                              className="rounded-lg border shadow-sm"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* MCP Server - AI Integration */}
          <section className="mb-16">
            <h2
              id="ai-support"
              className="text-3xl font-bold mb-8 group relative pl-10 -ml-10"
            >
              <Link
                href="#ai-support"
                className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center text-muted-foreground hover:text-foreground"
                aria-label="Link to MCP Server - AI Integration section"
              >
                <LinkIcon className="h-5 w-5" />
              </Link>
              MCP Server - AI Integration
            </h2>

            {/* MCP Server - AI Integration */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>MCP Server - AI Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <p className="text-muted-foreground mb-4">
                      StoreConfig includes a Model Context Protocol (MCP) server
                      that provides AI assistants with direct access to the JSON
                      schema, business rules, and CLI guidelines. This enables
                      AI tools to better understand and help you work with
                      StoreConfig files.
                    </p>
                    <p className="text-muted-foreground mb-4">
                      This is optional but recommended for the best experience.
                    </p>
                    <p className="text-muted-foreground mb-4">
                      <strong>Note:</strong> The MCP server requires StoreConfig
                      CLI version 0.0.23 or higher.{" "}
                      <a
                        href="#update-storeconfig"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowUpdateInstructions(true);
                          const quickStartElement =
                            document.getElementById("quick-start");
                          if (quickStartElement) {
                            quickStartElement.scrollIntoView({
                              behavior: "smooth",
                            });
                          }
                        }}
                        className="text-primary hover:underline"
                      >
                        Update StoreConfig
                      </a>{" "}
                      if needed.
                    </p>
                    <Button asChild>
                      <Link href="/blog/how-to-vibe-code-your-app-store-connect-setup">
                        Learn how to use StoreConfig with AI
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>

                  <div className="border-t pt-6">
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-sm mb-2">
                          Installation
                        </h5>
                        <p className="text-muted-foreground mb-2">
                          The MCP server is included when you install
                          StoreConfig globally. If you&apos;ve already completed{" "}
                          <a
                            href="#quick-start"
                            className="text-primary hover:underline"
                          >
                            Quick Start step 1
                          </a>
                          , the MCP server is already installed.
                        </p>
                      </div>

                      <div>
                        <h5 className="font-semibold text-sm mb-2">
                          Configuration
                        </h5>
                        <p className="text-muted-foreground mb-3">
                          Select your MCP client below for installation
                          instructions:
                        </p>

                        <div className="space-y-2">
                          {/* Claude Code */}
                          <div className="border rounded-lg">
                            <button
                              onClick={() => toggleMcpClient("claude-code")}
                              className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/50 transition-colors"
                            >
                              <span className="font-medium text-sm">
                                Claude Code
                              </span>
                              {expandedMcpClient === "claude-code" ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </button>
                            {expandedMcpClient === "claude-code" && (
                              <div className="px-3 pb-3 space-y-3">
                                <p className="text-xs text-muted-foreground">
                                  Run this command in your terminal:
                                </p>
                                <CommandBlock
                                  command={mcpSnippets.claudeCodeCommand}
                                />
                              </div>
                            )}
                          </div>

                          {/* Cursor */}
                          <div className="border rounded-lg">
                            <button
                              onClick={() => toggleMcpClient("cursor")}
                              className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/50 transition-colors"
                            >
                              <span className="font-medium text-sm">
                                Cursor
                              </span>
                              {expandedMcpClient === "cursor" ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </button>
                            {expandedMcpClient === "cursor" && (
                              <div className="px-3 pb-3 pt-1 space-y-3">
                                <a
                                  href={mcpSnippets.cursorInstallUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src="https://cursor.com/deeplink/mcp-install-light.svg"
                                    alt="Add storeconfig MCP server to Cursor"
                                    height="32"
                                  />
                                </a>
                                <p className="text-xs text-muted-foreground text-center">
                                  Or manually add this to{" "}
                                  <code className="bg-muted px-1 rounded">
                                    ~/.cursor/mcp.json
                                  </code>
                                  :
                                </p>
                                <SnippetBlock text={mcpSnippets.cursorConfig} />
                              </div>
                            )}
                          </div>

                          {/* VS Code */}
                          <div className="border rounded-lg">
                            <button
                              onClick={() => toggleMcpClient("vscode")}
                              className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/50 transition-colors"
                            >
                              <span className="font-medium text-sm">
                                VS Code
                              </span>
                              {expandedMcpClient === "vscode" ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </button>
                            {expandedMcpClient === "vscode" && (
                              <div className="px-3 pb-3 pt-1 space-y-3">
                                <a
                                  href={`vscode:mcp/install?${encodeURIComponent(JSON.stringify(mcpSnippets.vscodeMcpConfig))}`}
                                >
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src="https://img.shields.io/badge/VS_Code-Install_storeconfig-0098FF?style=flat-square&logo=visualstudiocode&logoColor=ffffff"
                                    alt="Install in VS Code"
                                  />
                                </a>
                                <p className="text-xs text-muted-foreground text-center">
                                  Or run this command in your terminal:
                                </p>
                                <CommandBlock
                                  command={mcpSnippets.vscodeCommand}
                                />
                                <p className="text-xs text-muted-foreground text-center">
                                  Or add this to your VS Code MCP config file.
                                  See{" "}
                                  <a
                                    href="https://code.visualstudio.com/docs/copilot/chat/mcp-servers"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                  >
                                    VS Code MCP docs
                                  </a>{" "}
                                  for more info.
                                </p>
                                <SnippetBlock text={mcpSnippets.vscodeConfig} />
                              </div>
                            )}
                          </div>

                          {/* OpenAI Codex */}
                          <div className="border rounded-lg">
                            <button
                              onClick={() => toggleMcpClient("openai-codex")}
                              className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/50 transition-colors"
                            >
                              <span className="font-medium text-sm">
                                OpenAI Codex
                              </span>
                              {expandedMcpClient === "openai-codex" ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </button>
                            {expandedMcpClient === "openai-codex" && (
                              <div className="px-3 pb-3 space-y-3">
                                <p className="text-xs text-muted-foreground">
                                  Add this to your Codex configuration:
                                </p>
                                <SnippetBlock
                                  text={mcpSnippets.openaiCodexConfig}
                                />
                              </div>
                            )}
                          </div>

                          {/* Google Antigravity */}
                          <div className="border rounded-lg">
                            <button
                              onClick={() => toggleMcpClient("antigravity")}
                              className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/50 transition-colors"
                            >
                              <span className="font-medium text-sm">
                                Google Antigravity
                              </span>
                              {expandedMcpClient === "antigravity" ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </button>
                            {expandedMcpClient === "antigravity" && (
                              <div className="px-3 pb-3 space-y-3">
                                <p className="text-xs text-muted-foreground">
                                  Add this to your Antigravity MCP config file:
                                </p>
                                <SnippetBlock text={mcpSnippets.cursorConfig} />
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg mt-4">
                          <p className="text-xs text-amber-800 dark:text-amber-200">
                            <strong>Not listed or troubleshooting?</strong>{" "}
                            Check your MCP client&apos;s official documentation.
                          </p>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg mt-3">
                          <p className="text-xs text-blue-800 dark:text-blue-200">
                            <strong>Note:</strong> After configuring, restart
                            your MCP client for the changes to take effect.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* VSCode Setup */}
            <Card>
              <CardHeader>
                <CardTitle className="mb-4">VSCode Setup</CardTitle>
                <CardDescription className="!text-base">
                  Enable validation, autocomplete, and IntelliSense support.
                  This is optional but recommended for the best experience.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Setup Steps</h4>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>Open VSCode Settings (Cmd/Ctrl + ,)</li>
                      <li>Search for &quot;json schema&quot;</li>
                      <li>Ensure Schema Download is enabled:</li>
                      <li>Click &quot;Edit in settings.json&quot;</li>
                      <li>Add the following configuration:</li>
                    </ol>
                  </div>

                  <SnippetBlock text={mcpSnippets.vscodeSchemaSettings} />

                  <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Note:</strong> You can add this configuration to
                      either:
                      <br />• <strong>User Settings</strong> (applies to all
                      your projects)
                      <br />• <strong>Workspace Settings</strong> (applies only
                      to the current project)
                    </p>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-2 text-sm">
                      JSON Schema URL
                    </h4>
                    <p className="text-muted-foreground mb-3">
                      The schema URL used in the configuration above:
                    </p>
                    <code className="bg-muted p-3 rounded-lg text-sm font-mono relative block">
                      <Link
                        href="/storeconfig-schema.json"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline pr-10"
                      >
                        https://storeconfig.com/storeconfig-schema.json
                      </Link>
                      <div className="absolute top-2 right-2">
                        <CopyButton text="https://storeconfig.com/storeconfig-schema.json" />
                      </div>
                    </code>
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-muted-foreground">
                        <strong>Note:</strong> If you don&apos;t want to use the
                        MCP server, you can still use AI tools with StoreConfig
                        by providing the schema URL directly. When using AI
                        tools to modify your StoreConfig JSON files, provide the
                        schema URL for more accurate and consistent results.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Commands Reference */}
          <section className="mb-16">
            <h2
              id="commands"
              className="text-3xl font-bold mb-8 group relative pl-10 -ml-10"
            >
              <a
                href="#commands"
                className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center text-muted-foreground hover:text-foreground"
                aria-label="Link to Commands Reference section"
              >
                <LinkIcon className="h-5 w-5" />
              </a>
              Commands Reference
            </h2>
            <div className="space-y-6">
              {commands.map((cmd, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-2xl">{cmd.command}</CardTitle>
                    </div>
                    <CardDescription>{cmd.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Usage</h4>
                        <CommandBlock command={cmd.usage} />
                      </div>

                      {cmd.options && cmd.options.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">Options</h4>
                          <div className="space-y-2">
                            {cmd.options.map((option, optIndex) => (
                              <div
                                key={optIndex}
                                className="flex gap-4 items-start"
                              >
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                                    {option.flag}
                                  </code>
                                  <span
                                    className={`text-xs px-2 py-0.5 rounded ${
                                      option.required
                                        ? "bg-red-500/10 text-red-400"
                                        : "bg-green-500/10 text-green-400"
                                    }`}
                                  >
                                    {option.required ? "Required" : "Optional"}
                                  </span>
                                </div>
                                <span className="text-muted-foreground flex-1 mt-1">
                                  {option.description}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Schema Reference */}
          <section className="mb-16">
            <h2
              id="schemas"
              className="text-3xl font-bold mb-8 group relative pl-10 -ml-10"
            >
              <a
                href="#schemas"
                className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center text-muted-foreground hover:text-foreground"
                aria-label="Link to Schema Reference section"
              >
                <LinkIcon className="h-5 w-5" />
              </a>
              Schema Reference
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>JSON Schema Documentation</CardTitle>
                <CardDescription className="!text-base">
                  Detailed schema documentation for all supported data
                  structures and configurations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  For comprehensive information about JSON schemas, data types,
                  and validation rules, visit our detailed schema documentation.
                </p>
                <Button asChild>
                  <Link href="/schemas">
                    View Schema Documentation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </section>

          {/* Example JSON Structure */}
          <section className="mb-16">
            <h2
              id="examples"
              className="text-3xl font-bold mb-8 group relative pl-10 -ml-10"
            >
              <a
                href="#examples"
                className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center text-muted-foreground hover:text-foreground"
                aria-label="Link to Example JSON Structure section"
              >
                <LinkIcon className="h-5 w-5" />
              </a>
              Example JSON Structure
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>Example JSON Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <JsonSyntaxHighlighter data={exampleStoreConfigData} />
              </CardContent>
            </Card>
          </section>

          {/* Limitations */}
          <section className="mb-16">
            <h2
              id="limitations"
              className="text-3xl font-bold mb-8 group relative pl-10 -ml-10"
            >
              <a
                href="#limitations"
                className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center text-muted-foreground hover:text-foreground"
                aria-label="Link to Current Limitations section"
              >
                <LinkIcon className="h-5 w-5" />
              </a>
              Current Limitations
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>App Store Connect API Restrictions</CardTitle>
                <CardDescription className="!text-base">
                  Due to current App Store Connect API limitations, some
                  features are not yet available.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Creating New Apps</h4>
                      <p className="text-muted-foreground">
                        New apps can only be created via the App Store Connect
                        website.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">App Privacy</h4>
                      <p className="text-muted-foreground">
                        App Privacy data can only be created or updated through
                        the App Store Connect website.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">State Management</h4>
                      <p className="text-muted-foreground">
                        Submitting apps, in-app purchases, and subscriptions is
                        not supported. These actions are usually performed as a
                        final step and are not repetitive or particularly
                        difficult to do manually.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Age Rating</h4>
                      <p className="text-muted-foreground">
                        Setting age ratings for apps is not currently supported.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Start and End Dates</h4>
                      <p className="text-muted-foreground">
                        Setting start and end dates for in-app purchases and
                        subscriptions is not supported.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Promo Offers</h4>
                      <p className="text-muted-foreground">
                        Promo offers for subscriptions are not supported.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Billing Grace Period</h4>
                      <p className="text-muted-foreground">
                        Billing grace period for subscriptions is not supported.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Planned Features */}
          <section className="mb-16">
            <h2
              id="planned-features"
              className="text-3xl font-bold mb-8 group relative pl-10 -ml-10"
            >
              <a
                href="#planned-features"
                className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center text-muted-foreground hover:text-foreground"
                aria-label="Link to Planned Features section"
              >
                <LinkIcon className="h-5 w-5" />
              </a>
              Planned Features
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Capabilities</CardTitle>
                <CardDescription className="!text-base">
                  Features we plan to add as soon as they become available
                  through the App Store Connect API.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">App Category</h4>
                      <p className="text-muted-foreground">
                        Support for setting app categories will be added soon.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Content Rights</h4>
                      <p className="text-muted-foreground">
                        Support for managing content rights will be added soon.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">iOS Platform</h4>
                      <p className="text-muted-foreground">
                        Currently, only the iOS platform is supported. We plan
                        to add support for additional platforms in the future.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Security */}
          <section className="mb-16">
            <h2
              id="security"
              className="text-3xl font-bold mb-8 group relative pl-10 -ml-10"
            >
              <a
                href="#security"
                className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center text-muted-foreground hover:text-foreground"
                aria-label="Link to Security section"
              >
                <LinkIcon className="h-5 w-5" />
              </a>
              Security
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Local Credentials</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    StoreConfig uses your local App Store Connect API key. No
                    separate StoreConfig access key is required.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Apple Credentials</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Apple credentials are stored on your machine and used by the
                    CLI to call App Store Connect directly. You can revoke the
                    API key at any time in App Store Connect.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <NeedHelp hideSections={{ documentation: true }} />

          {/* CTA */}
          <CTACard />
        </div>
      </div>
    </div>
  );
}
