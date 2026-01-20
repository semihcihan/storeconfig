import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getSchemaContent } from "./resources/schema";
import { getRulesContent } from "./resources/rules";
import { getGuidelinesContent } from "./resources/guidelines";
import { schemaContent } from "./generated/schemaContent";
import { version } from "../../package.json";

const instructions = "Use the 'schema' to understand and be able to edit the JSON configuration file. Use the 'rules' to understand constraints. Use the 'guidelines' to understand the CLI workflow and commands. Always validate JSON `storeconfig validate` after making changes.";
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
const schemaDescription = "defines the structure and validation rules for storeconfig.json files";
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

const rulesDescription = "important constraints and information NOT captured in the JSON schema that will cause apply to fail if violated";
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

const guidelinesDescription = "how to use and help users with StoreConfig CLI including workflow, commands";
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

const structuredContent = {
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
    outputSchema: {
      schema: z.any().describe(schemaTitle + " - " + schemaDescription),
      rules: z.string().describe(rulesDescription),
      guidelines: z.string().describe(guidelinesDescription),
    },
  },
  async () => {
    return {
      structuredContent: structuredContent,
      content: [
        {
          type: "text",
          text: JSON.stringify(structuredContent),
        },
      ],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("MCP server error:", error);
  process.exit(1);
});
