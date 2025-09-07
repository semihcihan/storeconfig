import * as readline from "readline";
import { logger } from "../utils/logger";
import type { PricingStrategy } from "../models/pricing-request";

function displayStrategyOptions(): void {
  const separator = "=".repeat(50);
  const lines = [
    "Select pricing strategy:",
    "1. Apple (uses Apple's standard pricing tiers)",
    "2. Purchasing Power (uses local purchasing power parity for fair pricing)",
  ];
  logger.info(`\n${separator}\n${lines.join("\n")}\n${separator}`);
}

export async function promptForPricingStrategy(): Promise<PricingStrategy> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  displayStrategyOptions();
  return await new Promise((resolve) => {
    const ask = () => {
      rl.question(
        logger.prompt("Select pricing strategy (1 or 2): "),
        (answer) => {
          const trimmed = String(answer ?? "").trim();
          if (trimmed === "1") {
            rl.close();
            resolve("apple");
            return;
          }
          if (trimmed === "2") {
            rl.close();
            resolve("purchasingPower");
            return;
          }
          logger.error("❌ Invalid selection. Please enter 1 or 2.");
          displayStrategyOptions();
          ask();
        }
      );
    };
    ask();
  });
}
