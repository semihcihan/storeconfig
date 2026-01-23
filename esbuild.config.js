const esbuild = require("esbuild");
const path = require("path");

const sharedPathMappingPlugin = {
  name: "path-mapping",
  setup(build) {
    build.onResolve({ filter: /^@semihcihan\/shared/ }, () => {
      return {
        path: path.resolve(__dirname, "../shared/src/index.ts"),
        watchFiles: ["../shared/src/**/*"],
      };
    });
  },
};

const cliBuildConfig = {
  entryPoints: ["src/cli.ts"],
  bundle: true,
  platform: "node",
  target: "node18",
  outfile: "dist/cli.js",
  format: "cjs",
  external: [
    "axios",
    "dotenv",
    "yargs",
    "zod",
    "zod-validation-error",
  ],
  packages: "bundle",
  sourcemap: true,
  minify: true,
};

const mcpBuildConfig = {
  entryPoints: ["src/mcp/index.ts"],
  bundle: true,
  platform: "node",
  target: "node18",
  outfile: "dist/mcp.js",
  format: "cjs",
  banner: {
    js: "#!/usr/bin/env node",
  },
  packages: "bundle",
  sourcemap: true,
  minify: true,
};

const buildConfig = cliBuildConfig;

const watchConfig = {
  ...buildConfig,
  plugins: [sharedPathMappingPlugin],
};

async function build() {
  try {
    console.log("Building CLI with esbuild...");
    await esbuild.build(cliBuildConfig);
    console.log("CLI build completed successfully!");

    console.log("Building MCP server with esbuild...");
    await esbuild.build(mcpBuildConfig);
    console.log("MCP server build completed successfully!");
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

async function watch() {
  try {
    console.log("Watching CLI files for changes...");
    const context = await esbuild.context(watchConfig);
    await context.watch();
    console.log("Watching for changes...");
  } catch (error) {
    console.error("Watch failed:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.includes("--watch")) {
    watch();
  } else {
    build();
  }
}

module.exports = { buildConfig, build, watch };
