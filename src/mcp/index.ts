import "../load-env";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { runStoreConfigCommand, toMcpToolResult } from "./run-storeconfig";
import { getSchemaContent } from "./resources/schema";
import { getRulesContent } from "./resources/rules";
import { getGuidelinesContent } from "./resources/guidelines";
import { schemaContent } from "./generated/schemaContent";
import { version } from "../../package.json";

const instructions =
  "Use the 'schema' to understand and be able to edit the JSON configuration file. Use the 'rules' to understand constraints. Use the 'guidelines' to understand the CLI workflow and commands. Always validate JSON `storeconfig validate` after making changes. IMPORTANT: Use `storeconfig_fetch_list` to list apps and `storeconfig_fetch_app` to fetch a specific app's configuration. Other CLI commands run in a shell need network permissions; `storeconfig validate` does not.";
const server = new McpServer(
  {
    name: "storeconfig-mcp",
    title: "StoreConfig MCP Server",
    version,
    description:
      "StoreConfig is a CLI tool that manages and automates App Store Connect app listings (IAPs, subscriptions, pricing, localizations, metadata, availability, etc.). This MCP instructs how to use StoreConfig CLI and how to edit StoreConfig JSON configuration files. Use this when working with storeconfig.json (or any other StoreConfig JSON config) files, validating configurations, or helping users with StoreConfig CLI.",
    websiteUrl: "https://storeconfig.com",
  },
  {
    instructions: instructions,
  }
);

const schemaTitle = "StoreConfig JSON Schema";
const schemaDescription =
  "defines the structure and validation rules for storeconfig.json files";
server.registerResource(
  "schema",
  "storeconfig://schema",
  {
    title: schemaTitle,
    description: schemaDescription,
    mimeType: "application/json",
  },
  async (uri: URL) => ({
    contents: [
      {
        uri: uri.href,
        text: getSchemaContent(),
        mimeType: "application/json",
      },
    ],
  })
);

const rulesDescription =
  "important constraints and information NOT captured in the JSON schema that will cause apply to fail if violated";
server.registerResource(
  "rules",
  "storeconfig://rules",
  {
    title: "StoreConfig Business Rules",
    description: rulesDescription,
    mimeType: "text/markdown",
  },
  async (uri: URL) => ({
    contents: [
      {
        uri: uri.href,
        text: getRulesContent(),
        mimeType: "text/markdown",
      },
    ],
  })
);

const guidelinesDescription =
  "how to use and help users with StoreConfig CLI including workflow, commands";
server.registerResource(
  "guidelines",
  "storeconfig://guidelines",
  {
    title: "StoreConfig Guidelines",
    description: guidelinesDescription,
    mimeType: "text/markdown",
  },
  async (uri: URL) => ({
    contents: [
      {
        uri: uri.href,
        text: getGuidelinesContent(),
        mimeType: "text/markdown",
      },
    ],
  })
);

const contextPayload = {
  schema: schemaContent,
  rules: getRulesContent(),
  guidelines: getGuidelinesContent(),
};

server.registerTool(
  "getStoreConfigContext",
  {
    title: "How to use the StoreConfig CLI and edit StoreConfig JSON",
    description: instructions,
    inputSchema: {},
  },
  async () => {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(contextPayload),
        },
      ],
    };
  }
);

server.registerTool(
  "storeconfig_fetch_list",
  {
    title: "List all apps from App Store Connect",
    description:
      "Fetches the list of all iOS apps from the user's App Store Connect account. Returns JSON array of {id, name} objects. ALWAYS use this tool instead of running `storeconfig fetch` in a shell",
    inputSchema: {},
  },
  async () => {
    const result = await runStoreConfigCommand(["fetch", "--stdout"]);
    return toMcpToolResult(result);
  }
);

server.registerTool(
  "storeconfig_fetch_app",
  {
    title: "Fetch a specific app's configuration from App Store Connect",
    description:
      "Fetches the full StoreConfig JSON for the given App Store Connect app ID. ALWAYS use this tool instead of running `storeconfig fetch --id` in a shell.",
    inputSchema: z.object({
      appId: z.string().min(1),
    }),
  },
  async (args: { appId: string }) => {
    const appId = args.appId;
    const result = await runStoreConfigCommand([
      "fetch",
      "--stdout",
      "--id",
      appId,
    ]);
    return toMcpToolResult(result);
  }
);

server.registerTool(
  "storeconfig_user",
  {
    title: "Display current user and apply status",
    description:
      "Shows the current user email, latest apply job status, and whether Apple credentials are configured. Use if you get Authentication errors. Use this instead of running `storeconfig user` in a shell.",
    inputSchema: {},
  },
  async () => {
    const result = await runStoreConfigCommand(["user"]);
    return toMcpToolResult(result);
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("MCP server error:", error);
  process.exitCode = 1;
});
