# Repository Notes

StoreConfig is published as a local-only open-source monorepo. The npm CLI package lives in `cli`, while the local App Store Connect engine and shared model code live beside it.

## Workspaces

- `cli`: the `storeconfig` command and MCP server.
- `api`: the local App Store Connect engine used directly by the CLI.
- `shared`: schemas, models, validation, helpers, and logging.
- `app-store-connect-api-types`: generated App Store Connect API types.
- `web`: the documentation and marketing site.

The removed hosted product surface is intentionally not part of this repository. There is no Serverless package, admin app, Paddle or Mailgun flow, StoreConfig Secret Key, hosted account model, remote job queue, or server-side Apple credential storage.

## Local Runtime

The CLI stores one Apple credential set under the user's home directory and loads it before calling the local `api` engine. Price-point metadata is refreshed from public static snapshots and cached locally; currency data is bundled and cached locally.

Failure diagnostics are written locally while keeping CLI stdout reserved for command data. See [logging](logging.md).

## Development

```bash
npm install
npm run build
npm run build:noweb
npm run test
```

For local CLI development:

```bash
npm run link:cli
```

For the web app:

```bash
npm run start:web
```

Deploy the production web site through Netlify. See [web deployment](web-deployment.md).

## Maintainer Tasks

Publish the CLI package from the workspace:

```bash
npm run publish:cli
```

Refresh or configure price-point snapshots from the `api` workspace scripts. See [price-point snapshots](price-point-snapshots.md).
