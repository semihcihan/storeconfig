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

## JSON File Format (Initial Proposal)

We will need to define a JSON structure to represent IAPs and subscriptions. Based on the App Store Connect API's general structure, we can propose a starting point.

## CLI Commands

- `app-store-sync new`: Creates a sample `iaps.json` file.
- `app-store-sync validate --file <path>`: Validates the JSON file.
- `app-store-sync fetch --file <path>`: Fetches the current IAPs and subscriptions from App Store Connect and writes them to the specified JSON file. This is useful for bootstrapping or updating the local state.
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
