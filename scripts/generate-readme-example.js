const fs = require("fs");
const path = require("path");

// Read the example JSON from shared
const exampleJsonPath = path.join(__dirname, "..", "..", "shared", "example-storeconfig.json");
const exampleData = JSON.parse(fs.readFileSync(exampleJsonPath, "utf8"));
const exampleJson = JSON.stringify(exampleData, null, 2);

// Read the current README
const readmePath = path.join(__dirname, "..", "README.md");
let readmeContent = fs.readFileSync(readmePath, "utf8");

// Replace the example JSON section in the README
const exampleStartMarker = "```json";
const exampleEndMarker = "```";

const startIndex = readmeContent.indexOf(exampleStartMarker);
const endIndex = readmeContent.indexOf(
  exampleEndMarker,
  startIndex + exampleStartMarker.length
);

if (startIndex !== -1 && endIndex !== -1) {
  const beforeExample = readmeContent.substring(
    0,
    startIndex + exampleStartMarker.length
  );
  const afterExample = readmeContent.substring(endIndex);

  readmeContent = beforeExample + "\n" + exampleJson + "\n" + afterExample;

  // Write the updated README
  fs.writeFileSync(readmePath, readmeContent, "utf8");
  console.log("README.md updated with latest example JSON");
} else {
  console.error("Could not find example JSON section in README.md");
  process.exit(1);
}
