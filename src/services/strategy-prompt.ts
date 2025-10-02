import inquirer from "inquirer";
import type { PricingStrategy } from "@semihcihan/shared";

export async function promptForPricingStrategy(): Promise<PricingStrategy> {
  const { strategy } = await inquirer.prompt([
    {
      type: "list",
      name: "strategy",
      message: "Select pricing strategy:",
      choices: [
        {
          name: "Apple (uses Apple's standard pricing tiers)",
          value: "apple",
        },
        {
          name: "Purchasing Power (uses local purchasing power parity for fair pricing)",
          value: "purchasingPower",
        },
      ],
    },
  ]);

  return strategy;
}
