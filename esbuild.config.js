const esbuild = require("esbuild");
const path = require("path");

const buildConfig = {
  entryPoints: ["src/cli.ts"],
  bundle: true,
  platform: "node",
  target: "node18",
  outfile: "dist/cli.js",
  format: "cjs",
  external: [
    // External dependencies (they will be installed with the package)
    "axios",
    "dotenv",
    "inquirer",
    "ora",
    "yargs",
    "zod",
    "zod-validation-error",
  ],
  packages: "bundle",
  sourcemap: true,
  minify: true,
};

const watchConfig = {
  ...buildConfig,
  plugins: [
    {
      name: "path-mapping",
      setup(build) {
        build.onResolve({ filter: /^@semihcihan\/shared/ }, (args) => {
          return {
            path: path.resolve(__dirname, "../shared/src/index.ts"),
            watchFiles: ["../shared/src/**/*"],
          };
        });
      },
    },
  ],
};

async function build() {
  try {
    console.log("Building CLI with esbuild...");
    await esbuild.build(buildConfig);
    console.log("Build completed successfully!");
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
