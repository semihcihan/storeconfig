# Price Point Snapshots

StoreConfig uses shared static price-point snapshots for Apple price-point metadata. Price points are resource-type and territory based, so one weekly shared snapshot per resource type can serve all local CLI users without requiring their accounts to contain representative app, in-app purchase, or subscription resources.

## Files

The GitHub Actions workflow publishes these files to GitHub Pages:

- `/price-points/app.json`
- `/price-points/iap.json`
- `/price-points/subscription.json`
- `/price-points/index.json`

Each resource file keeps the old serverless cache shape:

```json
{
  "updatedAt": "2026-06-19T00:00:00.000Z",
  "data": [
    {
      "territory": "USA",
      "resourceType": "iap",
      "pricePoints": [{ "priceIndex": "1", "customerPrice": "0.99" }]
    }
  ]
}
```

The published files contain price indexes and customer prices only. They do not publish the fallback resource IDs used to fetch the data.

## GitHub Setup

The price-point GitHub scripts target `semihcihan/storeconfig` by default. Set `STORECONFIG_PRICE_POINTS_REPO=OWNER/REPO` to target another repository. Set `STORECONFIG_PRICE_POINTS_REF` to run the workflow from a ref other than `main`. These values can be exported in the shell or stored in `api/.env`.

Configure GitHub Pages for the target repository with source `GitHub Actions`:

```bash
npm run price-points:setup-pages --workspace=api
```

Then add these repository secrets:

- `ASC_PRIVATE_KEY`: App Store Connect `.p8` private key content.
- `ASC_KEY_ID`: App Store Connect key ID.
- `ASC_ISSUER_ID`: App Store Connect issuer ID.
- `FALLBACK_APP_APPLE_ID`: App Store Connect app resource ID.
- `FALLBACK_IAP_APPLE_ID`: App Store Connect in-app purchase resource ID, not the product ID.
- `FALLBACK_SUBSCRIPTION_APPLE_ID`: App Store Connect subscription resource ID, not the product ID.

The workflow runs weekly and can also be run manually. Run it manually once after adding secrets so the initial Pages deployment exists:

```bash
npm run price-points:refresh --workspace=api
npm run price-points:watch --workspace=api
npm run price-points:verify --workspace=api
```

To see the snapshot endpoint derived from the current environment:

```bash
npm run price-points:url --workspace=api
```

## Local Refresh

The generator script also loads `.env` values for local/manual runs. It looks for `.env` in the current working directory, `api/.env`, and the repository root. Existing environment variables are not overwritten, so GitHub Actions secrets still win in CI.

Use the same names as the GitHub secrets:

```env
ASC_PRIVATE_KEY=
ASC_KEY_ID=
ASC_ISSUER_ID=
FALLBACK_APP_APPLE_ID=
FALLBACK_IAP_APPLE_ID=
FALLBACK_SUBSCRIPTION_APPLE_ID=
STORECONFIG_PRICE_POINTS_REPO=OWNER/REPO
```

Then build and run the generator:

```bash
npm run build --workspace=app-store-connect-api-types --workspace=shared --workspace=api
npm run refresh-price-points:pages --workspace=api
```

Generated output goes to `public/price-points` by default. Set `PRICE_POINTS_OUTPUT_DIR` to write somewhere else.

## Sync GitHub Secrets From .env

You can sync the local `api/.env` values into GitHub Actions secrets with GitHub CLI:

```bash
npm run price-points:secrets --workspace=api
```

The npm script runs from the `api` workspace, so it reads `api/.env`. It uses `STORECONFIG_PRICE_POINTS_REPO` to choose the target repository, then uploads only the six required ASC/fallback values as GitHub Actions secrets. Local config values such as `STORECONFIG_PRICE_POINTS_REPO` are not uploaded as secrets.

GitHub CLI encrypts secret values locally before sending them to GitHub.

## CLI Refresh

The CLI keeps local cache files under `~/.storeconfig/cache/price-points`. When a resource cache is missing or older than seven days, it refreshes from the shared static snapshot and saves the whole resource file locally. If refresh fails but stale local data exists for the requested territory, the CLI uses the stale data and logs a warning.

The default snapshot base URL is derived from `STORECONFIG_PRICE_POINTS_REPO`, which defaults to `semihcihan/storeconfig`:

```text
https://semihcihan.github.io/storeconfig/price-points
```

Set `STORECONFIG_PRICE_POINTS_BASE_URL` to use a custom Pages domain or another static host. This explicit base URL wins over `STORECONFIG_PRICE_POINTS_REPO`.
