# Store Config CLI

A powerful command-line tool for managing apps on **App Store Connect**. Manage **in-app purchases**, **subscriptions**, **pricing**, **localizations**, **metadata**, **availability**, and more. Sync your app configurations from local JSON files to App Store Connect with ease. **No more manual work**.

[![npm version](https://badge.fury.io/js/storeconfig.svg)](https://badge.fury.io/js/storeconfig)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

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
- **📄 JSON-Based Configuration** - Define your app structure in version-controlled JSON files.
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

### 1. Sign Up & Get API Key

First, sign up at [www.storeconfig.com](https://www.storeconfig.com) to get your API key.

### 2. Authentication

Set up your App Store Connect API credentials:

```bash
# Login with your API key
storeconfig auth login

# Configure Apple
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
# Show all your apps to select from
storeconfig fetch --f my-app.json

# Fetch specific app by ID
storeconfig fetch --id 1234567890 --f my-app.json
```

#### `apply`

Apply changes from JSON file to App Store Connect after making changes on it. It will preview the changes and ask for approval before applying them.

```bash
# Apply changes
storeconfig apply --f my-app.json
```

#### `set-price`

Set prices for your app, in-app purchases, and subscriptions interactively. Easiest way to manage pricing.

```bash
storeconfig set-price --f my-app.json
```

#### `compare-price`

Compare prices across territories in USD. Useful to see how your pricing compares to other territories.

```bash
storeconfig compare-price --input my-app.json --output price-analysis.csv
```

#### `example`

Generate example JSON files for different data types. Useful to get started or to see how to structure your JSON file.

```bash
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
  "appId": "1234567890",
  "name": "My Awesome App",
  "bundleId": "com.example.myapp",
  "inAppPurchases": [
    {
      "productId": "com.example.premium",
      "referenceName": "Premium Upgrade",
      "type": "NON_CONSUMABLE",
      "priceSchedule": {
        "baseTerritory": "USA",
        "prices": [
          { "price": "9.99", "territory": "USA" },
          { "price": "12.99", "territory": "CAN" }
        ]
      }
    }
  ],
  "subscriptions": [
    {
      "productId": "com.example.monthly",
      "referenceName": "Monthly Premium",
      "prices": [
        { "price": "4.99", "territory": "USA" },
        { "price": "5.99", "territory": "CAN" }
      ]
    }
  ]
}
```

## 🚨 Important Notes

### API Limitations

There are some limitations with the App Store Connect APIs. When these are supported, we will update the CLI to support them too.

- **Creating a New App**: You can only create a new app through the App Store Connect website.
- **App Privacy**: You can only create/update App Privacy data through the App Store Connect website. This is a very repetitive work and we will add support for it in the future when it is supported by the API.
- **State Management**: We don't support submitting apps, in-app-purchases, subscriptions etc. This is usually the last step of the process and is not repetitive nor hard to do manually.

### Security

- StoreConfig API keys are stored in your local machine
- Apple credentials and keys are securely sent and stored on our servers for app management purposes. You can revoke access at any time through Apple or use the `auth logout` command to remove them from our servers.

## 🆘 Support

- 📚 [Documentation](https://www.storeconfig.com/docs)
- 🐛 [Report Issues](https://github.com/semihcihan/storeconfig/issues)

⚠️ This CLI is proprietary software. Usage requires a valid subscription and API key from [StoreConfig](https://www.storeconfig.com).
