#!/usr/bin/env node

import { zod2md } from "zod2md";
import { resolve } from "path";
import { existsSync, mkdirSync } from "fs";
import { z } from "zod";

function removePromotionalOfferSections(markdown: string): string {
  const lines = markdown.split("\n");
  const filteredLines: string[] = [];
  let skipSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if this line starts a PromotionalOffer section
    if (line.startsWith("## PromotionalOffer")) {
      skipSection = true;
      continue;
    }

    // If we're in a section to skip, continue until we hit the next section
    if (skipSection && line.startsWith("## ")) {
      skipSection = false;
    }

    // Skip lines that are part of the PromotionalOffer section
    if (skipSection) {
      continue;
    }

    // Remove promotionalOffers field from Subscription table
    if (
      line.includes("`promotionalOffers`") &&
      line.includes("_Array of [PromotionalOffer]")
    ) {
      continue;
    }

    filteredLines.push(line);
  }

  return filteredLines.join("\n");
}

function reorderSchemas(markdown: string): string {
  const lines = markdown.split("\n");
  const titleLine = lines[0]; // "# App Store Connect API Schemas"

  // Find the AppStoreModel section
  const appStoreModelStart = lines.findIndex((line) =>
    line.startsWith("## AppStoreModel")
  );
  if (appStoreModelStart === -1) {
    return markdown; // If AppStoreModel not found, return original
  }

  // Find the end of AppStoreModel section (next ## or end of file)
  let appStoreModelEnd = appStoreModelStart + 1;
  while (
    appStoreModelEnd < lines.length &&
    !lines[appStoreModelEnd].startsWith("## ")
  ) {
    appStoreModelEnd++;
  }

  // Extract AppStoreModel section
  const appStoreModelSection = lines.slice(
    appStoreModelStart,
    appStoreModelEnd
  );

  // Extract everything else (before and after AppStoreModel)
  const beforeAppStoreModel = lines.slice(1, appStoreModelStart);
  const afterAppStoreModel = lines.slice(appStoreModelEnd);

  // Reconstruct with AppStoreModel at the top
  const reordered = [
    titleLine,
    ...appStoreModelSection,
    ...beforeAppStoreModel,
    ...afterAppStoreModel,
  ];

  return reordered.join("\n");
}

async function generateJSONSchema() {
  try {
    console.log("🚀 Generating JSON Schema...");

    // Import the AppStoreModelSchema
    const { AppStoreModelSchema } = await import("../src/models/app-store");

    // Generate JSON Schema using Zod's toJSONSchema function

    const jsonSchema = z.toJSONSchema(AppStoreModelSchema, {
      unrepresentable: "any",
      target: "draft-7",
      io: "input",
      reused: "ref",
    });
    const schema = {
      $schema: "http://json-schema.org/draft-07/schema#",
      $id: "https://storeconfig.com/storeconfig-schema.json",
      title: "StoreConfig JSON Schema",
      description:
        "JSON Schema for storeconfig JSON file to be used with StoreConfig CLI",
      ...jsonSchema,
    };

    return JSON.stringify(schema);
  } catch (error) {
    console.error("❌ Error generating JSON Schema:", error);
    throw error;
  }
}

async function generateDocs() {
  try {
    console.log("🚀 Generating Zod schema documentation and JSON Schema...");

    // Ensure docs directory exists
    const docsDir = resolve(process.cwd(), "docs");
    if (!existsSync(docsDir)) {
      mkdirSync(docsDir, { recursive: true });
      console.log("📁 Created docs directory");
    }

    // Generate documentation
    const markdown = await zod2md({
      entry: "src/models/app-store.ts",
      title: "StoreConfig JSON Schema",
      transformName: (name: string | undefined, path: string) => {
        // Remove 'Schema' suffix and convert to PascalCase
        if (name && name.endsWith("Schema")) {
          return name.slice(0, -6);
        }
        // For default exports, use the file name
        if (!name) {
          const fileName =
            path.split("/").pop()?.replace(".ts", "") || "Unknown";
          return fileName.charAt(0).toUpperCase() + fileName.slice(1);
        }
        return name;
      },
    });

    // Remove PromotionalOffer sections and reorder schemas to put AppStoreModel at the top
    const filteredMarkdown = removePromotionalOfferSections(markdown);
    const reorderedMarkdown = reorderSchemas(filteredMarkdown);

    // Generate JSON Schema
    const jsonSchema = await generateJSONSchema();

    // Write files
    const fs = await import("fs/promises");

    // Write markdown documentation
    const markdownPath = resolve(docsDir, "schemas.md");
    await fs.writeFile(markdownPath, reorderedMarkdown, "utf8");

    // Write JSON schema
    const jsonSchemaPath = resolve(docsDir, "storeconfig-schema.json");
    await fs.writeFile(jsonSchemaPath, jsonSchema, "utf8");

    console.log(`✅ Documentation generated successfully at: ${markdownPath}`);
    console.log(`✅ JSON Schema generated successfully at: ${jsonSchemaPath}`);
  } catch (error) {
    console.error("❌ Error generating documentation:", error);
    process.exit(1);
  }
}

// Run the script
generateDocs();
