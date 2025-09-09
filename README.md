# Developer Tool CLI

CLI package for App Store Connect synchronization.

## Installation

```bash
npm install
```

## Development

```bash
# Build
npm run build

# Watch mode
npm run dev

# Run
npm start

# Test
npm test
```

## Usage

```bash
# Fetch app data
app-store-sync fetch --id <app-id> --f fetch.json

# Apply changes
app-store-sync apply --f apply.json

# Preview changes (dry run)
app-store-sync plan --f apply.json

# Validate format
app-store-sync validate-format --f apply.json

# Set prices interactively
app-store-sync set-price --f apply.json

# Compare prices
app-store-sync compare-price --i apply.json --o compare-price.csv

# Generate examples
app-store-sync example --t full
```

## Environment Variables

- `API_BASE_URL`: Base URL for the API server (default: http://localhost:3000)
- `LOG_LEVEL`: Log level (debug, info, warn, error)
