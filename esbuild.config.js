const esbuild = require("esbuild");

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

if (require.main === module) {
  build();
}

module.exports = { buildConfig, build };
