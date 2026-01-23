## IMPORTANT: Use MCP Fetch Tools

- Use `storeconfig_fetch_list` to list apps (`[{id, name}]`).
- Use `storeconfig_fetch_app` with an `appId` to fetch the full config JSON.

For other CLI commands run in a shell, request network permissions with `required_permissions: ['network']`. `storeconfig validate` does not require network access.

## Initial Setup

1. **Configure** - Configure StoreConfig with your Secret Key (one-time setup)
2. **Authenticate** - Configure StoreConfig and Apple credentials (one-time setup)

_Note: Assume configure and authenticate have already run. If not, self-explanatory CLI errors will indicate what to do._

## Prerequisites

To use storeconfig, you need the storeconfig JSON configuration. Use `storeconfig_fetch_list` to get all apps, then use `storeconfig_fetch_app` with the chosen App Store Connect app ID to fetch the specific app. Do not ever start from scratch. Users may also fetch a similar app as a first draft and copy relevant fields over, but you must still fetch the target app (the app that needs to be configured).

## Workflow

1. **Fetch** - Download current app configuration from App Store Connect (Always the first step if you don't have the storeconfig JSON configuration)
2. **Edit** - Modify the JSON configuration file
3. **Validate** - Check the JSON is valid before applying (Optional as apply already validates first, but important for fast iteration)
4. **Apply** - Sync changes to App Store Connect (uses storeconfig.json by default)

## CLI Commands

**`--file`** defaults to `storeconfig.json` in the current directory when omitted.

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
storeconfig fetch [--id <app-store-connect-app-id>] [--file <output-file>] [--stdout]
```

**Agents**: use `storeconfig_fetch_list` and `storeconfig_fetch_app`.

### apply - Sync changes to App Store Connect

```bash
storeconfig apply [--file <config-file>] [--preview]
```

### validate - Check JSON validity

```bash
storeconfig validate [--file <config-file>]
```

**Does not require network access.** Always run `storeconfig validate` after making changes to the JSON file. Keep running validate and fixing errors until it passes.

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

**Agents**: use `storeconfig_user`.

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
