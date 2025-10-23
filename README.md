# Store Config CLI

A powerful command-line tool for managing apps on **App Store Connect**. Manage **in-app purchases**, **subscriptions**, **pricing**, **localizations**, **metadata**, **availability**, and more. Sync your app configurations from local JSON files to App Store Connect - the smart way. **No more manual work**.

[![npm version](https://badge.fury.io/js/storeconfig.svg)](https://badge.fury.io/js/storeconfig)

## 🚀 Quick Start

```bash
# Install globally
npm install -g storeconfig

# Or use with npx
npx storeconfig --help
```

## 📖 Documentation

For detailed documentation, visit [storeconfig.com/docs](https://storeconfig.com/docs)

## ✨ Features

- **😌 Easy to Use** - Prepare App Store Connect for your app in minutes instead of hours. What normally takes 2+ hours of manual work is now done in minutes.
- **⚡️ Quick App Duplication** - Copy App Store Connect data from an existing app to a new app in minutes.
- **📄 Configuration as Code** - Define your app structure in version-controlled JSON files.
- **🤖 AI-Powered Editing** - Use any AI tool to modify your JSON configuration for app descriptions, content updates, and more.
- **🌍 Multi-Language Support** - Easily manage localized content across all supported territories.
- **📊 Bulk Operations** - Make changes across multiple products, subscriptions, or territories at once.
- **🔄 Bidirectional Sync** - Fetch current state of your app and apply changes to App Store Connect.
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

First, sign up at [storeconfig.com](https://storeconfig.com) to get your Secret Key.

### 2. Authentication

Set up your App Store Connect API credentials:

```bash
# Configure StoreConfig with the StoreConfig Secret Key
storeconfig configure

# Add Apple credentials
# The command will prompt you for Issuer ID and Key ID
storeconfig apple --key-path /path/to/your/AuthKey_XXXXX.p8
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
   - Download the `.p8` file. Use its path as the `--key-path` argument.
   - **Key ID** - you'll be prompted to enter this.
   - **Issuer ID** - you'll be prompted to enter this.

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

Set prices for your app, in-app purchases, and subscriptions interactively. This updates pricing only in your configuration file; changes won't be applied to App Store Connect until you run the `apply` command.

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
  "pricing": {
    "baseTerritory": "USA",
    "prices": [
      {
        "price": "0",
        "territory": "USA"
      }
    ]
  },
  "availableTerritories": "worldwide",
  "inAppPurchases": [
    {
      "productId": "com.mycompany.myapp.premium",
      "type": "NON_CONSUMABLE",
      "referenceName": "Premium",
      "familySharable": false,
      "pricing": {
        "baseTerritory": "USA",
        "prices": [
          {
            "price": "49.99",
            "territory": "USA"
          }
        ]
      },
      "availability": {
        "availableInNewTerritories": true,
        "availableTerritories": "worldwide"
      },
      "localizations": [
        {
          "locale": "en-US",
          "name": "Premium Upgrade",
          "description": "Unlock all premium features"
        }
      ]
    }
  ],
  "primaryLocale": "en-US",
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
  ]
}
```

## 🧰 AI Integration - IDE Support - JSON Schema

StoreConfig provides a JSON Schema that enhances the development experience by offering validation, autocomplete, and IntelliSense support in your favorite IDE, while also improving results with AI tools.

### AI Integration

When using AI tools to modify your StoreConfig JSON files, provide the schema URL for more accurate and consistent results:

**JSON Schema URL:** `https://storeconfig.com/storeconfig-schema.json`

### VSCode Setup

1. **Open VSCode Settings** (Cmd/Ctrl + ,)
2. **Search for "json schema"**
3. **Ensure Schema Download is enabled:**
4. **Click "Edit in settings.json"**
5. **Add the following configuration:**

```json
// root settings.json
{
  // Other settings (if any)...
  "json.schemas": [
    // Other schemas (if any)...
    {
      "fileMatch": ["*storeconfig*.json"],
      "url": "https://storeconfig.com/storeconfig-schema.json"
    }
  ]
}
```

> **Note:** You can add this configuration to either:
>
> - **User Settings** (applies to all your projects)
> - **Workspace Settings** (applies only to the current project)

### Benefits

- ✅ **Real-time validation** - Catch errors as you type
- ✅ **Autocomplete** - Get suggestions for properties and values
- ✅ **Documentation** - Hover over properties to see descriptions
- ✅ **Type safety** - Ensure your JSON structure is correct

### Schema URL

The JSON Schema is available at: [https://storeconfig.com/storeconfig-schema.json](https://storeconfig.com/storeconfig-schema.json)

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
- Apple credentials and key are securely sent and stored on our servers for app management purposes. You can revoke access at any time through Apple or contact us to delete your user data and credentials.

## Support

- 📚 [Documentation](https://storeconfig.com/docs)
- 📄 [Schemas Documentation](https://storeconfig.com/schemas)
- 📄 [JSON Schema](https://storeconfig.com/storeconfig-schema.json)
- 🐛 [Report Issues](https://github.com/semihcihan/storeconfig/issues)

This CLI is proprietary software. Usage requires a valid subscription and Secret Key from [StoreConfig](https://storeconfig.com).
