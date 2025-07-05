# Project: App Store Sync CLI

A Node.js CLI tool to synchronize in-app purchases and subscriptions with the App Store from a local JSON file.

## Objective

The primary objective of this project is to create a command-line tool that simplifies managing App Store Connect in-app purchases (IAPs) and subscriptions by syncing them from a local JSON file. This will allow for easier version control, automation, and management of IAPs and subscriptions as code. Each JSON file will belong to a single APP.

## Technology Stack

- **Runtime:** Node.js
- **Core Libraries:**
  - `jsonwebtoken` for generating JWT tokens for App Store Connect API authentication.
  - `axios` or a similar HTTP client for making API requests.
  - `yargs` or `commander` for creating the CLI interface.
  - `dotenv` for managing environment variables for configuration.

## Core Features

- **Authentication:** Securely authenticate with the App Store Connect API using a private key (`.p8` file), Key ID, and Issuer ID.
- **JSON Definition:** Define a clear and easy-to-use JSON schema for specifying IAPs and subscriptions.
- **Syncing:**
  - Create, update, or delete in-app purchases.
  - Create, update, or delete subscriptions.
- **Validation:** Validate the JSON file against the defined schema before syncing.
- **Dry Runs:** Allow users to perform a "dry run" to see what changes would be made without actually applying them.
- **Fetching:** Fetch the current state of IAPs and subscriptions from App Store Connect to generate a local JSON file or to compare with the local state.

## Configuration

The tool will be configured using a `.env` file in the project root. The following variables will be required:

- `ASC_ISSUER_ID`: Your issuer ID from App Store Connect.
- `ASC_KEY_ID`: Your private key ID from App Store Connect.
- `ASC_PRIVATE_KEY_PATH`: The path to your private key (`.p8`) file.

### Pricing Model

The pricing model is designed for both simplicity and control. You will specify a concrete `price` for each territory you wish to configure.

- **Base Territory Price:** You must define a `baseTerritory` and set a `price` for it. This price is used to find a corresponding price on the App Store, which then determines the prices for all other territories.
- **Manual Price Overrides:** To set a specific price for a country that differs from the automatically calculated price, simply add a price entry for that territory. This gives you granular control over your pricing strategy in key markets.

Internally, the tool will query the App Store Connect API's `/v1/appPricePoints` endpoint to find the price point that matches your specified price. It will then use the ID of that price point when creating or updating IAPs and subscriptions.

**Example:**

```json
"priceSchedule": {
  "baseTerritory": "USA",
  "prices": [
    {
      "price": "9.99",
      "territory": "USA"
    },
    {
      "price": "12.99",
      "territory": "CAN"
    }
  ]
}
```

In this example:

1. The price for the USA is set to $9.99. This price will be used to determine the price for all other territories except Canada.
2. The price for Canada is manually set to $12.99, overriding the automatic calculation.

## CLI Commands

- `app-store-sync new`: Creates a sample `iaps.json` file.
- `app-store-sync validate --file <path>`: Validates the JSON file.
- `app-store-sync fetch --id <app-id> --file <path>`: Fetches the current IAPs and subscriptions from App Store Connect for a specific app and writes them to the specified JSON file. This is useful for bootstrapping or updating the local state.
- `app-store-sync plan --file <path>`: Shows a plan of changes (dry run). **Note:** This command will use the `fetch` method internally to retrieve the current state from App Store Connect and compare it with the local JSON file to determine what changes would be made.
- `app-store-sync apply --file <path>`: Applies the changes to App Store Connect. **Note:** This command will also use the `fetch` method internally to ensure it is applying only the necessary changes based on the current state.

## Project Structure

```
/
├── .env
├── .gitignore
├── package.json
├── iaps.json
├── src/
│   ├── cli.js
│   ├── commands/
│   │   ├── new.js
│   │   ├── validate.js
│   │   ├── fetch.js
│   │   ├── plan.js
│   │   └── apply.js
│   ├── services/
│   │   ├── auth.js
│   │   └── api.js
│   └── utils/
│       └── logger.js
└── README.md
```

## Command Workflow

- **new:** Bootstraps a new JSON file with sample IAPs/subscriptions.
- **validate:** Checks the local JSON file for schema and data validity.
- **fetch:** Retrieves the current state from App Store Connect and writes it to a local JSON file. This is useful for initializing or updating the local representation.
- **plan:** Compares the local JSON file with the current state fetched from App Store Connect (using the fetch method) and shows a summary of what would change if you applied the local file.
- **apply:** Applies the necessary changes to App Store Connect to make its state match the local JSON file. It uses the fetch method to determine the current state and only applies the required changes.

## Development Plan / Next Steps

1.  **Setup Project:** Initialize a Node.js project, install dependencies, and set up the basic project structure.
2.  **Authentication:** Implement the JWT generation for App Store Connect API authentication.
3.  **CLI Scaffolding:** Set up the basic CLI commands using `yargs` or `commander`.
4.  **API Service:** Create a service to interact with the App Store Connect API. Initially, focus on a single endpoint to test the connection (e.g., listing apps).
5.  **IAP/Subscription Models:** Refine the JSON schema and implement the logic for creating/updating IAPs and subscriptions based on the actual API specification.
6.  **Implement Commands:** Build out the full functionality for the `new`, `fetch`, `validate`, `plan`, and `apply` commands.
7.  **Documentation:** Write a comprehensive `README.md` with usage instructions.

## Example .env

# App Store Connect API Credentials

ASC_ISSUER_ID=your-issuer-id-goes-here
ASC_KEY_ID=your-key-id-goes-here
ASC_PRIVATE_KEY_PATH=/path/to/your/AuthKey_YOUR_KEY_ID.p8

## References

- **Managing In-App Purchases:** [Managing In-App Purchases](https://developer.apple.com/documentation/appstoreconnectapi/managing-in-app-purchases) - Core documentation for using the App Store Connect API to manage IAPs.
- **API Keys and Tokens:**
  - [Creating API Keys for App Store Connect API](httpss://developer.apple.com/documentation/appstoreconnectapi/creating-api-keys-for-app-store-connect-api)
  - [Generating Tokens for API Requests](httpss://developer.apple.com/documentation/appstoreconnectapi/generating-tokens-for-api-requests)
