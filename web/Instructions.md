# StoreConfig Web App Requirements

Name: StoreConfig
Github: https://github.com/semihcihan/storeconfig

## Overview

Next.js documentation and marketing site for the local-only StoreConfig CLI.

StoreConfig should be described as a free, open-source tool that runs on the
user's machine with their own App Store Connect credentials.

## Core Features

### 1. Landing Page & Marketing

- Explain the local App Store Connect automation workflow.
- Mention that StoreConfig is free and open source.
- CTAs should point to documentation and GitHub.

### 2. Demo Section

- Keep the product demo video and local CLI workflow positioning.

### 3. Documentation

- Install instructions.
- Local Apple credential setup with `storeconfig apple --key-path`.
- Fetch, edit, validate, compare-price, set-price, and apply workflow.
- MCP/AI usage docs.
- JSON schema docs and examples.

### 4. Support

- GitHub Issues: https://github.com/semihcihan/storeconfig/issues

### 5. Static Pages

- About
- FAQ
- Privacy Policy
- Terms
- Blog
- Schema documentation

## Removed Hosted Product Flows

- No signup, waitlist, beta access, or email capture.
- No legacy access-key request or reveal pages.
- No Paddle, payment, subscription, customer portal, or billing copy.
- No hosted StoreConfig account messaging.
- No API routes, middleware, hosted backend calls, or Firebase analytics.

## Technical Requirements

- Next.js App Router.
- TypeScript.
- Tailwind CSS.
- Static-first pages suitable for local development and public hosting.
- Environment config limited to base URL, GitHub URLs, and contact email.

Quick Reference on CLI README: ../cli/README.md
