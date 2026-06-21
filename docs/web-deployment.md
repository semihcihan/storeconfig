# Web Deployment

The public web site is a static Next.js export hosted on Netlify.

## Netlify Project

- Project name: `storeconfig`
- Site ID: `464c8d96-3579-40bb-b386-326a23f64be5`
- Team slug: `semihcihan`
- Production domain target: `storeconfig.com`

## Build

Netlify reads the root `netlify.toml`:

- build command: `npm run build`
- publish directory: `web/out`
- Node version: `24`

The root build runs all workspaces in order. The `web` workspace uses Next.js static export, so no hosted Node server or API runtime is deployed for the site.

## Environment

Production builds use public site metadata only:

- `NEXT_PUBLIC_BASE_URL`
- `NEXT_PUBLIC_GITHUB_REPOSITORY_URL`
- `NEXT_PUBLIC_GITHUB_ISSUES_URL`
- `NEXT_PUBLIC_CONTACT_EMAIL`

These values are configured on the Netlify project for production builds.

## Deploy Flow

Production deploys should come from the connected Git branch in Netlify. `npm run deploy:web` is only a manual fallback and requires an authenticated Netlify CLI.
