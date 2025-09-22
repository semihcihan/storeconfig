# Store Config CLI

A powerful command-line tool for managing apps on **App Store Connect**. Manage **in-app purchases**, **subscriptions**, **pricing**, **localizations**, **metadata**, **availability**, and more. Sync your app configurations from local JSON files to App Store Connect with ease. **No more manual work**.

[![npm version](https://badge.fury.io/js/storeconfig.svg)](https://badge.fury.io/js/storeconfig)

## 🚀 Quick Start

```bash
# Install globally
npm install -g storeconfig

# Or use with npx
npx storeconfig --help
```

## 📖 Documentation

For detailed documentation, visit [www.storeconfig.com/docs](https://www.storeconfig.com/docs)

## ✨ Features

- **😌 Easy to Use** - Prepare App Store Connect for your app in minutes instead of hours. What normally takes 2+ hours of manual work is now done in minutes.
- **⚡️ Quick App Duplication** - Copy App Store Connect data from an existing app to a new app in minutes.
- **📄 Configuration as Code** - Define your app structure in version-controlled JSON files.
- **🤖 AI-Powered Editing** - Use any AI tool to modify your JSON configuration for app descriptions, content updates, and more.
- **🌍 Multi-Language Support** - Easily manage localized content across all supported territories.
- **📊 Bulk Operations** - Make changes across multiple products, subscriptions, or territories at once.
- **🔄 Bidirectional Sync** - Fetch current state and apply changes to App Store Connect.
- **💰 Interactive Pricing** - Set prices across territories based on Purchasing Power Parity (PPP) for fair pricing to increase revenue. Also supports Apple's standard pricing tiers.

## 🛠 Installation

### Global Installation

```bash
npm install -g storeconfig
```

### Local Installation

```bash
npm install storeconfig
npx storeconfig --help
```

## 🔧 Setup

### 1. Sign Up & Get Secret Key

First, sign up at [www.storeconfig.com](https://www.storeconfig.com) to get your Secret Key.

### 2. Authentication

Set up your App Store Connect API credentials:

```bash
# Configure StoreConfig with the StoreConfig Secret Key
storeconfig auth configure

# Configure Apple credentials
# See below for how to get the key and IDs.
storeconfig auth apple \
  --issuer-id YOUR_ISSUER_ID \
  --key-id YOUR_KEY_ID \
  --key-path /path/to/your/AuthKey_XXXXX.p8
```

#### Get App Store Connect Key and IDs

This is required for store config to manage your apps on App Store Connect.

1. **Open App Store Connect API Settings**

   - Go to [https://appstoreconnect.apple.com/access/integrations/api](https://appstoreconnect.apple.com/access/integrations/api)
   - Make sure the correct team is selected on top right corner of the page

2. **Create a New Team Key**

   - Click the "Plus" button to create a new `Team Key` (Not Individual Key)
   - Choose a descriptive name (e.g., "StoreConfig") to easily identify it later

3. **Set Required Permissions**

   - Select **App Manager Access** - this is required to manage prices and other app configurations

4. **Download and Copy Credentials**
   - Download the `.p8` file. This is the `--key-path` for the `auth apple` command.
   - **Key ID** is the `--key-id` for the `auth apple` command.
   - **Issuer ID** is the `--issuer-id` for the `auth apple` command.

## 📋 Commands

#### `fetch`

Fetch current app configuration from App Store Connect. Easiest way to get started. Fetch the app you want to manage or fetch another app to use as a template for your new app.

```bash
# Show all your apps to select from (saves to storeconfig.json by default)
storeconfig fetch

# Fetch specific app by ID
storeconfig fetch --id 1234567890
```

#### `apply`

Apply changes from JSON file to App Store Connect after making changes on it. It will preview the changes and ask for approval before applying them.

```bash
# Apply changes (uses storeconfig.json by default)
storeconfig apply
```

#### `set-price`

Set prices for your app, in-app purchases, and subscriptions interactively. Easiest way to manage pricing.

```bash
# Set prices (uses storeconfig.json by default)
storeconfig set-price
```

#### `compare-price`

Compare prices across territories in USD. Useful to see how your pricing compares to other territories.

```bash
# Compare prices (uses storeconfig.json and outputs to compare-price.csv by default)
storeconfig compare-price
```

#### `example`

Generate example JSON files for different data types. Useful to get started or to see how to structure your JSON file.

```bash
# Interactive selection of example type
storeconfig example

# Generate minimal app example
storeconfig example --type minimal

# Generate full app example
storeconfig example --type full

# Generate subscription example
storeconfig example --type subscription

# Generate in-app purchase example
storeconfig example --type iap
```

## 📁 Example JSON Structure

```json
{
  "schemaVersion": "1.0.0",
  "appId": "1234567890",
  "versionString": "2.1.17",
  "primaryLocale": "en-US",
  "availableTerritories": "worldwide",
  "localizations": [
    {
      "locale": "en-US",
      "name": "My Awesome App",
      "subtitle": "The best app ever",
      "description": "The best app ever in the whole world",
      "keywords": "best,app,ever",
      "promotionalText": "The best app ever in the whole world",
      "whatsNew": "Bug fixes and improvements"
    }
  ],
  "pricing": {
    "baseTerritory": "USA",
    "prices": [
      {
        "price": "0",
        "territory": "USA"
      }
    ]
  },
  "inAppPurchases": [
    {
      "productId": "com.mycompany.myapp.premium",
      "type": "NON_CONSUMABLE",
      "referenceName": "Premium",
      "familySharable": false,
      "localizations": [
        {
          "locale": "en-US",
          "name": "Premium Upgrade",
          "description": "Unlock all premium features"
        }
      ],
      "availability": {
        "availableInNewTerritories": true,
        "availableTerritories": "worldwide"
      },
      "priceSchedule": {
        "baseTerritory": "USA",
        "prices": [
          {
            "price": "49.99",
            "territory": "USA"
          }
        ]
      }
    }
  ],
  "subscriptionGroups": [
    {
      "referenceName": "Premium Subscriptions",
      "localizations": [
        {
          "locale": "en-US",
          "name": "Premium Subscriptions"
        }
      ],
      "subscriptions": [
        {
          "productId": "com.mycompany.myapp.premium.monthly",
          "referenceName": "Monthly Premium",
          "groupLevel": 2,
          "subscriptionPeriod": "ONE_MONTH",
          "familySharable": false,
          "availability": {
            "availableInNewTerritories": true,
            "availableTerritories": "worldwide"
          },
          "prices": {
            "baseTerritory": "USA",
            "prices": [
              {
                "price": "3.99",
                "territory": "USA"
              }
            ]
          },
          "localizations": [
            {
              "locale": "en-US",
              "name": "Monthly Premium",
              "description": "Monthly access to premium features"
            }
          ]
        }
      ]
    }
  ]
}
```

### Tool Limitations

Due to current App Store Connect API restrictions, some features are not yet available in the CLI. As soon as these capabilities are supported by the API, we will update the CLI accordingly.

- **Creating a New App**: New apps can only be created via the App Store Connect website.
- **App Privacy**: App Privacy data can only be created or updated through the App Store Connect website. This process is repetitive, and we plan to add support once the API allows it.
- **State Management**: Submitting apps, in-app purchases, and subscriptions is not supported. These actions are usually performed as a final step and are not repetitive or particularly difficult to do manually.
- **Age Rating**: Setting age ratings for apps is not currently supported.
- **Start and End Dates**: Setting start and end dates for in-app purchases and subscriptions is not supported.
- **Promo Offers**: Promo offers for subscriptions are not supported.
- **Billing Grace Period**: Billing grace period for subscriptions is not supported.

### Planned Features

- **App Category**: Support for setting app categories will be added soon.
- **Content Rights**: Support for managing content rights will be added soon.
- **iOS Platform**: Currently, only the iOS platform is supported. We plan to add support for additional platforms in the future.

### Security

- StoreConfig Secret Keys are stored in your local machine
- Apple credentials and key are securely sent and stored on our servers for app management purposes. You can revoke access at any time through Apple or use the `auth delete` command to remove them from our servers.

## Support

- 📚 [Documentation](https://www.storeconfig.com/docs)
- 🐛 [Report Issues](https://github.com/semihcihan/storeconfig/issues)

This CLI is proprietary software. Usage requires a valid subscription and Secret Key from [StoreConfig](https://www.storeconfig.com).
