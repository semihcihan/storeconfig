import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getSchemaContent } from "./resources/schema";
import { getRulesContent } from "./resources/rules";
import { getGuidelinesContent } from "./resources/guidelines";
import { version } from "../../package.json";

const server = new McpServer(
  {
    name: "storeconfig-mcp",
    title: "StoreConfig MCP Server",
    version,
    description:
      "MCP server providing StoreConfig JSON Schema, business rules, and agent guidelines for App Store Connect automation. Use this server when working with storeconfig.json files, validating configurations, or helping users manage their App Store Connect apps using StoreConfig CLI.",
    websiteUrl: "https://storeconfig.com",
  },
  {
    instructions:
      "This MCP server provides context resources for StoreConfig CLI - a tool for managing App Store Connect apps. Use the schema resource when editing storeconfig.json files. Use the rules resource to understand constraints. Use the guidelines resource to understand the CLI workflow and commands. Always validate JSON `storeconfig validate` after making changes.",
  }
);

server.registerResource(
  "schema",
  "storeconfig://schema",
  {
    description:
      "StoreConfig JSON Schema - defines the structure and validation rules for storeconfig.json files",
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

server.registerResource(
  "rules",
  "storeconfig://rules",
  {
    description:
      "StoreConfig Business Rules - important constraints NOT captured in the JSON schema that will cause apply to fail if violated",
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

server.registerResource(
  "guidelines",
  "storeconfig://agent-guidelines",
  {
    description:
      "StoreConfig Agent Guidelines - how to help users with StoreConfig CLI including workflow, commands, and error handling",
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

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("MCP server error:", error);
  process.exit(1);
});
