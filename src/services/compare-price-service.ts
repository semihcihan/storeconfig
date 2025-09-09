import * as fs from "fs";
import type { PricingAnalysis } from "@semihcihan/shared";

function sheetName(analysis: PricingAnalysis): string {
  return analysis.item.name;
}

const headers = [
  "Territory",
  "Local Price",
  "Local Currency",
  "USD Price",
  "Relative to USA (%)",
];

export function exportAnalysisToCSV(
  analysis: PricingAnalysis[],
  outputPath: string
): void {
  const csvRows: string[] = [];

  csvRows.push(["Name", ...headers].join(","));

  analysis.forEach((item) => {
    item.prices.forEach((price) => {
      csvRows.push(
        `${sheetName(item)},${price.territory},${price.localPrice},${
          price.localCurrency
        },${price.usdPrice.toFixed(2)},${price.usdPercentage.toFixed(0)}`
      );
    });
  });

  const csvContent = csvRows.join("\n");
  fs.writeFileSync(outputPath, csvContent, "utf8");
}

export function exportAnalysis(
  analysis: PricingAnalysis[],
  outputPath: string
): void {
  const fileExtension = outputPath.toLowerCase().split(".").pop();

  if (!fileExtension || fileExtension !== "csv") {
    throw new Error(
      `Unsupported file format. Please use ".csv" extension: "${outputPath}"`
    );
  }

  exportAnalysisToCSV(analysis, outputPath);
}
