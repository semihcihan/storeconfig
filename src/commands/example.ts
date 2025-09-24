import type { CommandModule } from "yargs";
import { logger, DEFAULT_CONFIG_FILENAME } from "@semihcihan/shared";
import type {
  AppStoreModel,
  SubscriptionSchema,
  SubscriptionGroupSchema,
  InAppPurchaseSchema,
} from "@semihcihan/shared";
import { z } from "zod";
import * as readline from "readline";
import * as fs from "fs";
import * as path from "path";

// Type definitions for individual examples
type SubscriptionExample = z.infer<typeof SubscriptionSchema>;
type SubscriptionGroupExample = z.infer<typeof SubscriptionGroupSchema>;
type InAppPurchaseExample = z.infer<typeof InAppPurchaseSchema>;

// Available example types
const exampleTypes = [
  { key: "minimal", name: "Minimal App" },
  { key: "full", name: "Full App" },
  { key: "subscription", name: "Subscription" },
  { key: "in-app-purchase", name: "In-App Purchase" },
];

function createExampleFilename(filename: string): string {
  const parsedPath = path.parse(filename);
  const extension = parsedPath.ext;
  const nameWithoutExt = parsedPath.name;

  if (extension) {
    return `${nameWithoutExt}_example${extension}`;
  } else {
    return `${filename}_example`;
  }
}

async function selectType(): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    var logs: string[] = [];
    logs.push("Available example types are below:");
    exampleTypes.forEach((type, index) => {
      logs.push(`${index + 1}. ${type.name}`);
    });
    logger.info(logs.join("\n"));

    const askForSelection = () => {
      rl.question(
        "\nEnter the number of the example type you want to generate (1-" +
          exampleTypes.length +
          "): ",
        (answer) => {
          const selection = parseInt(answer, 10);

          if (
            isNaN(selection) ||
            selection < 1 ||
            selection > exampleTypes.length
          ) {
            logger.error(
              "Invalid selection. Please enter a number between 1 and " +
                exampleTypes.length
            );
            askForSelection();
            return;
          }

          const selectedType = exampleTypes[selection - 1];
          rl.close();
          resolve(selectedType.key);
        }
      );
    };

    askForSelection();
  });
}

// Subscription example
const subscriptionExample: SubscriptionExample[] = [
  {
    productId: "com.mycompany.myapp.premium.monthly",
    referenceName: "Monthly Premium",
    groupLevel: 2,
    subscriptionPeriod: "ONE_MONTH",
    familySharable: false,
    reviewNote: "Monthly premium subscription with free trial",
    pricing: {
      baseTerritory: "USA",
      prices: [
        {
          price: "3.99",
          territory: "USA",
        },
      ],
    },
    introductoryOffers: [
      {
        type: "FREE_TRIAL",
        duration: "ONE_WEEK",
        availableTerritories: "worldwide",
      },
    ],
    availability: {
      availableInNewTerritories: true,
      availableTerritories: "worldwide",
    },
    localizations: [
      {
        locale: "en-US",
        name: "Monthly Premium",
        description: "Monthly access to premium features",
      },
      {
        locale: "es-ES",
        name: "Premium Mensual",
        description: "Acceso mensual a funciones premium",
      },
    ],
  },
  {
    productId: "com.mycompany.myapp.premium.yearly",
    referenceName: "Yearly Premium",
    groupLevel: 1,
    subscriptionPeriod: "ONE_YEAR",
    familySharable: false,
    reviewNote: "Yearly premium subscription with pay as you go",
    pricing: {
      baseTerritory: "USA",
      prices: [
        {
          price: "20.99",
          territory: "USA",
        },
      ],
    },
    introductoryOffers: [
      {
        type: "PAY_AS_YOU_GO",
        numberOfPeriods: 1,
        pricing: {
          baseTerritory: "USA",
          prices: [
            {
              price: "10.99",
              territory: "USA",
            },
          ],
        },
        availableTerritories: "worldwide",
      },
    ],
    availability: {
      availableInNewTerritories: true,
      availableTerritories: "worldwide",
    },
    localizations: [
      {
        locale: "en-US",
        name: "Yearly Premium",
        description: "Yearly access to premium features",
      },
      {
        locale: "es-ES",
        name: "Premium Anual",
        description: "Acceso anual a funciones premium",
      },
    ],
  },
];

// Subscription group example
const subscriptionGroupExample: SubscriptionGroupExample = {
  referenceName: "Premium Subscriptions",
  localizations: [
    {
      locale: "en-US",
      name: "Premium Subscriptions",
    },
    {
      locale: "es-ES",
      name: "Suscripciones Premium",
    },
  ],
  subscriptions: subscriptionExample,
};

// In-app purchase example
const inAppPurchaseExample: InAppPurchaseExample[] = [
  {
    productId: "com.mycompany.myapp.premium",
    type: "NON_CONSUMABLE",
    referenceName: "Premium",
    familySharable: false,
    reviewNote: "Premium features unlock",
    pricing: {
      baseTerritory: "USA",
      prices: [
        {
          price: "49.99",
          territory: "USA",
        },
      ],
    },
    availability: {
      availableInNewTerritories: true,
      availableTerritories: "worldwide",
    },
    localizations: [
      {
        locale: "en-US",
        name: "Premium Upgrade",
        description: "Unlock all premium features",
      },
      {
        locale: "es-ES",
        name: "Premium",
        description: "Acceso a todas las funciones premium",
      },
    ],
  },
  {
    productId: "com.mycompany.myapp.consumable",
    type: "CONSUMABLE",
    referenceName: "Coins",
    familySharable: false,
    reviewNote: "Coins",
    pricing: {
      baseTerritory: "USA",
      prices: [
        {
          price: "2.99",
          territory: "USA",
        },
      ],
    },
    availability: {
      availableInNewTerritories: true,
      availableTerritories: "worldwide",
    },
    localizations: [
      {
        locale: "en-US",
        name: "Coins",
        description: "Coins to spend in the app",
      },
    ],
  },
];

// Full app example
const fullAppExample: AppStoreModel = {
  schemaVersion: "1.0.0",
  appId: "1234567890",
  versionString: "2.1.17",
  pricing: {
    baseTerritory: "USA",
    prices: [
      {
        price: "0.99",
        territory: "USA",
      },
    ],
  },
  availableTerritories: "worldwide",
  inAppPurchases: inAppPurchaseExample,
  subscriptionGroups: [subscriptionGroupExample],
  primaryLocale: "en-US",
  localizations: [
    {
      locale: "en-US",
      name: "My App",
      subtitle: "The best app ever",
      description: "The best app ever in the whole world",
      keywords: "best,app,ever",
      promotionalText: "The best app ever in the whole world",
      privacyPolicyUrl: "https://mycompany.com/privacy",
      privacyChoicesUrl: "https://mycompany.com/privacy-choices",
      marketingUrl: "https://mycompany.com/marketing",
      supportUrl: "https://mycompany.com/support",
      whatsNew: "Bug fixes and improvements",
    },
  ],
  copyright: "© 2025 My Company",
};

// Minimal app example
const minimalAppExample: AppStoreModel = {
  ...fullAppExample,
  pricing: {
    baseTerritory: "USA",
    prices: [
      {
        price: "0.0",
        territory: "USA",
      },
    ],
  },
  inAppPurchases: undefined,
  subscriptionGroups: undefined,
};

const exampleCommand: CommandModule = {
  command: "example",
  describe: "Generate example JSON files for different data types",
  builder: {
    type: {
      alias: "t",
      describe: "Type of example to generate",
      choices: ["minimal", "full", "subscription", "iap", "in-app-purchase"],
      type: "string",
    },
    file: {
      alias: "f",
      describe: `Path to the output JSON file. Defaults to ${createExampleFilename(
        DEFAULT_CONFIG_FILENAME
      )} in current directory.`,
      demandOption: false,
      type: "string",
    },
  },
  handler: async (argv) => {
    let type = argv.type as string;
    const outputFile =
      (argv.file as string) || createExampleFilename(DEFAULT_CONFIG_FILENAME);

    if (!type) {
      type = await selectType();
    }

    const examples = {
      minimal: minimalAppExample,
      full: fullAppExample,
      subscription: subscriptionExample,
      iap: inAppPurchaseExample,
      "in-app-purchase": inAppPurchaseExample,
    };

    const example = examples[type as keyof typeof examples];
    if (!example) {
      logger.error(`Unknown example type: ${type}`);
      process.exit(1);
    }

    try {
      fs.writeFileSync(outputFile, JSON.stringify(example, null, 2));
      logger.info(`Successfully generated example and wrote to ${outputFile}`);
    } catch (error) {
      logger.error(`Failed to write example file`, error);
      process.exit(1);
    }
  },
};

export default exampleCommand;
