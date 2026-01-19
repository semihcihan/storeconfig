# MCP Server Development Guide

This guide explains how to run, test, and develop the StoreConfig MCP server locally.

## Quick Start

### 1. Build the MCP Server

```bash
cd cli
npm run build
```

Or use watch mode for development:

```bash
npm run build:watch
```

### 2. Run the MCP Server Locally

The MCP server uses STDIO transport, so it's designed to be run by an MCP client (like Cursor). However, you can test it directly:

```bash
# From the cli directory
npm run mcp
```

This will start the server and wait for STDIO input. It won't produce visible output on its own - it needs to communicate via the MCP protocol.

## Testing the MCP Server

### Option 1: MCP Inspector (Recommended)

The MCP Inspector is the official tool for testing MCP servers:

```bash
cd cli
npm run mcp:test
```

This will:
1. Start the MCP Inspector (a web UI)
2. Connect it to your local MCP server
3. Allow you to test all resources and tools interactively

**Note:** If you get an error about `@modelcontextprotocol/inspector` not being found, install it first:

```bash
npx @modelcontextprotocol/inspector --help
```

### Option 2: Test with Cursor IDE

1. **Build the server:**
   ```bash
   cd cli
   npm run build
   ```

2. **Configure Cursor:**
   
   The workspace already has a `.cursor/mcp.json` file configured to use the local build. If you need to update it, edit `.cursor/mcp.json`:

   ```json
   {
     "mcpServers": {
       "storeconfig": {
         "command": "node",
         "args": ["cli/dist/mcp.mjs"]
       }
     }
   }
   ```

   **Alternative:** Use npm script (if you have npm link set up):
   ```json
   {
     "mcpServers": {
       "storeconfig": {
         "command": "storeconfig-mcp"
       }
     }
   }
   ```

3. **Restart Cursor:**
   
   Completely quit and restart Cursor IDE for the MCP configuration to take effect.

4. **Verify Connection:**
   
   - Open Cursor Settings → Developer → MCP Servers
   - You should see "storeconfig" listed
   - Check that resources are available: `storeconfig://schema`, `storeconfig://rules`, `storeconfig://agent-guidelines`

5. **Test in Chat:**
   
   Try asking Cursor's AI to fetch the StoreConfig schema or rules. The AI should be able to access the MCP resources.

## Development Workflow

### Making Changes

1. **Edit source files** in `cli/src/mcp/`
2. **Rebuild:**
   ```bash
   npm run build
   ```
   Or use watch mode:
   ```bash
   npm run build:watch
   ```
3. **Restart Cursor** (if testing via Cursor) or restart MCP Inspector

## Using npm link for Development

If you want to use `storeconfig-mcp` command directly (like in production):

```bash
cd cli
npm link
```

Then in `.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "storeconfig": {
      "command": "storeconfig-mcp"
    }
  }
}
```

This makes development feel more like the production setup.

## Production vs Development

- **Development:** Use absolute path to `dist/mcp.mjs` in `.cursor/mcp.json`
- **Production:** Users install via `npm install -g storeconfig` and use `storeconfig-mcp` command
