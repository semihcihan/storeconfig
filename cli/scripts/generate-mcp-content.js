const fs = require("fs");
const path = require("path");

const contentDir = path.join(__dirname, "../src/mcp/content");
const generatedDir = path.join(__dirname, "../src/mcp/generated");

if (!fs.existsSync(generatedDir)) {
  fs.mkdirSync(generatedDir, { recursive: true });
}

function generateTsFromMd(mdFileName, exportName) {
  const mdPath = path.join(contentDir, mdFileName);
  if (!fs.existsSync(mdPath)) {
    console.error(`Error: ${mdPath} does not exist.`);
    process.exit(1);
  }
  const content = fs.readFileSync(mdPath, "utf8");
  const tsContent = `export const ${exportName} = ${JSON.stringify(content)};\n`;
  const tsPath = path.join(generatedDir, `${exportName}.ts`);
  fs.writeFileSync(tsPath, tsContent);
  console.log(`Generated ${tsPath}`);
}

function copySchema() {
  const schemaSource = path.join(__dirname, "../../shared/docs/storeconfig-schema.json");
  if (!fs.existsSync(schemaSource)) {
    console.error(`Error: ${schemaSource} does not exist. Run npm run build in shared package first.`);
    process.exit(1);
  }
  const schemaContent = fs.readFileSync(schemaSource, "utf8");
  const schema = JSON.parse(schemaContent);
  const tsContent = `export const schemaContent = ${JSON.stringify(schema)};\n`;
  const tsPath = path.join(generatedDir, "schemaContent.ts");
  fs.writeFileSync(tsPath, tsContent);
  console.log(`Generated ${tsPath}`);
}

generateTsFromMd("rules.md", "rulesContent");
generateTsFromMd("guidelines.md", "guidelinesContent");
copySchema();

console.log("MCP content generation complete.");
