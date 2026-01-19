# StoreConfig Agent Guidelines

This guide explains how AI agents should help users with the StoreConfig CLI for managing App Store Connect.

## Overview

StoreConfig is a CLI tool that manages App Store Connect configurations via JSON files. It handles in-app purchases, subscriptions, pricing, localizations, metadata, availability, and more.

## Workflow

The standard workflow for using StoreConfig is:

1. **Configure** - Configure StoreConfig with your Secret Key (one-time setup)
2. **Authenticate** - Configure StoreConfig and Apple credentials (one-time setup)
3. **Fetch** - Download current app state from App Store Connect
4. **Edit** - Modify the JSON configuration file
5. **Validate** - Check the JSON is valid before applying (Optional as apply already validates first, but important for fast iteration)
6. **Apply** - Sync changes to App Store Connect

## CLI Commands

### configure - Configure StoreConfig with your Secret Key (One-time setup)

```bash
# Configure StoreConfig with your Secret Key
storeconfig configure
```

The configure command prompts you for your Secret Key.

### Authentication (One-time setup)

```bash
# Add Apple credentials (prompts for Issuer ID and Key ID)
storeconfig apple --key-path /path/to/AuthKey_XXXXX.p8
```

### fetch - Download app configuration

```bash
# Interactive: shows all app names to select from
storeconfig fetch

# Fetch specific app by app ID
storeconfig fetch --id 1234567890

# Save to custom file
storeconfig fetch --file myapp.json
```

The fetch command creates a `storeconfig.json` file with the current App Store Connect configuration.

### apply - Sync changes to App Store Connect

```bash
# Apply changes (uses storeconfig.json by default)
storeconfig apply

# Preview changes without applying (dry run)
storeconfig apply --preview

# Apply from custom file
storeconfig apply --file myapp.json
```

The apply command shows a preview of changes and asks for confirmation before applying.

### validate - Check JSON validity

```bash
# Validate configuration (uses storeconfig.json by default)
storeconfig validate

# Validate custom file
storeconfig validate --file myapp.json
```

**IMPORTANT**: Always run `storeconfig validate` after making changes to the JSON file. Keep running validate and fixing errors until it passes.

### example - Generate example JSON files

```bash
# Interactive: select example type
storeconfig example

# Generate specific example type
storeconfig example --type minimal    # Basic app structure
storeconfig example --type full       # Complete app with all features
storeconfig example --type subscription  # Subscription-focused example
storeconfig example --type iap        # In-app purchase example
```

### set-price - Interactive pricing tool

```bash
# Set prices interactively using purchasing power parity for fair pricing (uses storeconfig.json by default)
storeconfig set-price
```

### compare-price - Compare prices across territories

```bash
# Compare prices converting them to USD for comparison to US Pricing (outputs to compare-price.csv)
storeconfig compare-price
```

## JSON Editing Tips

### Use the JSON Schema

When editing StoreConfig JSON files, reference the schema for better accuracy:

**Schema URL**: `https://storeconfig.com/storeconfig-schema.json`

### Validate After Every Change

After making any change to the JSON:

1. Run `storeconfig validate`
2. If errors occur, fix them
3. Repeat until validation passes
4. Only then run `storeconfig apply`

## Tool Limitations

These features are NOT supported by the CLI due to App Store Connect API limitations:

- **Creating new apps** - Must be done via App Store Connect website
- **App Privacy** - Must be configured via website
- **State management** - Submitting apps/IAPs/subscriptions for review
- **Age ratings** - Must be set via website
- **Start/end dates** - For IAPs and subscriptions
- **Promo offers** - For subscriptions
- **Billing grace period** - For subscriptions

## Error Handling

### Common Errors and Solutions

**"In-app purchase cannot be deleted"**
- IAPs cannot be removed once created
- Solution: Remove availability territories instead of deleting the IAP

**"Subscription cannot be deleted"**
- Subscriptions cannot be removed once created
- Solution: Remove availability territories instead

**"Type cannot be changed"**
- IAP types are immutable after creation
- Solution: Create a new IAP with a different productId

**"Family sharing cannot be turned off"**
- Once enabled, family sharing cannot be disabled
- Solution: This is permanent, plan accordingly

**"Validation failed"**
- The JSON structure is invalid
- Solution: Run `storeconfig validate` and fix reported issues

### Getting Help

- Documentation: https://storeconfig.com/docs
- Schema docs: https://storeconfig.com/schemas
- Report issues: https://github.com/semihcihan/storeconfig/issues
