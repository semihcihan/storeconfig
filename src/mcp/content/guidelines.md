## Initial Setup

1. **Configure** - Configure StoreConfig with your Secret Key (one-time setup)
2. **Authenticate** - Configure StoreConfig and Apple credentials (one-time setup)

*Note: Assume configure and authenticate have already run. If not, self-explanatory CLI errors will indicate what to do.*

## Prerequisites

**Network Access**: All storeconfig commands require network access. When running any storeconfig command, ensure network permissions are enabled. When executing commands, if you encounter ENOTFOUND or network errors, request network permissions.

To use storeconfig, you need the storeconfig JSON configuration. Start with `storeconfig fetch` if you don't already have its storeconfig JSON available. `storeconfig fetch` (without `--id`) returns all apps on the account - either show the list to the user or select it yourself if you know the name. Users may also fetch a similar app as a first draft and copy relevant fields over.

## Workflow

1. **Fetch** - Download current app configuration from App Store Connect (Always the first step if you don't have the storeconfig JSON configuration)
2. **Edit** - Modify the JSON configuration file
3. **Validate** - Check the JSON is valid before applying (Optional as apply already validates first, but important for fast iteration)
4. **Apply** - Sync changes to App Store Connect (uses storeconfig.json by default)

## CLI Commands

### configure - Configure StoreConfig with your Secret Key (One-time setup)
```bash
storeconfig configure
```

### apple - Add Apple credentials (One-time setup)
```bash
storeconfig apple --key-path <path-to-p8-file>
```

### fetch - Download app configuration
```bash
storeconfig fetch [--id <app-id>] [--file <output-file>]
```

Run `storeconfig fetch` without `--id` to fetch all app names and prompt the user to select an app (useful when the Apple app ID is unknown).

### apply - Sync changes to App Store Connect
```bash
storeconfig apply [--file <config-file>] [--preview]
```

### validate - Check JSON validity
```bash
storeconfig validate [--file <config-file>]
```

**IMPORTANT**: Always run `storeconfig validate` after making changes to the JSON file. Keep running validate and fixing errors until it passes.

### example - Generate example JSON files
```bash
storeconfig example [--type <type>] [--file <output-file>]
```

### set-price - Interactive pricing tool
```bash
storeconfig set-price [--file <config-file>]
```

### compare-price - Compare prices across territories
```bash
storeconfig compare-price [--file <config-file>] [--output <output-file>]
```

### user - Display current user information, latest 'apply' status, and Apple credentials status if not configured
```bash
storeconfig user
```

## JSON Editing Tips

### Use the JSON Schema

When editing StoreConfig JSON files, reference the schema for better accuracy.

### Validate After Every Change

After making any change to the JSON:

1. Run `storeconfig validate`
2. If errors occur, fix them
3. Repeat until validation passes

### Docs

- Documentation: https://storeconfig.com/docs
