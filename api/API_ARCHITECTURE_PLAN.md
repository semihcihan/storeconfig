# API Architecture Plan: Separating CLI from Business Logic

## Overview

This document outlines a simplified plan to add an HTTP API layer to the existing CLI tool. The goal is to create API endpoints that replicate the functionality of the current CLI commands, starting with the fetch command. This approach keeps the existing codebase intact while adding API capabilities.

## Current Architecture Analysis

### Current Structure

- **CLI Commands**: Located in `src/commands/` - handle argument parsing and orchestration
- **Business Logic**: Located in `src/services/` and `src/domains/` - contains core functionality
- **Models**: Located in `src/models/` - data structures and validation schemas
- **Helpers**: Located in `src/helpers/` - utility functions

### Current Commands

1. **fetch** - Fetches app data from App Store Connect
2. **apply** - Applies changes to App Store Connect
3. **set-price** - Interactive pricing tool
4. **compare-price** - Price comparison analysis
5. **validate-format** - Validates JSON file format
6. **example** - Generates example JSON files

## Architecture Decisions

### 1. API Server Technology Stack

**Decision Required**: What technology should we use for the API server?
**Decision**: Express.js (Node.js)

- **Rationale**:
  - Same language as existing codebase
  - Easy migration of existing services
  - Shared type definitions and models
  - Minimal learning curve for team
  - Can reuse existing authentication and API client logic

### 2. API Server Location

**Decision Required**: Where should the API server be located?
**Decision**: Same repository, different folder (`api/`) with different package.json

### 3. API Design Pattern

**Decision**: RPC-style (Function-based) API

- **Rationale**:
  - Matches current function-based architecture
  - Direct mapping from CLI commands to API endpoints
  - Simpler for internal consumption
  - More intuitive for our use case
  - Easier migration from existing service functions

**API Endpoint Pattern**:

- Each service function becomes an API endpoint
- Function name maps directly to endpoint path
- All endpoints use POST method for consistency
- Request/response bodies contain function parameters and return values
- Example: `fetchAppStoreState(appId)` → `POST /api/v1/fetchAppStoreState`

**Current CLI Commands → API Endpoints Mapping**:

- `fetch` command → `POST /api/v1/fetchAppStoreState`
- `apply` command → `POST /api/v1/applyChanges` + `POST /api/v1/generatePlan`
- `set-price` command → `POST /api/v1/startInteractivePricing` + `POST /api/v1/applyPricing`
- `compare-price` command → `POST /api/v1/analyzePricing` + `POST /api/v1/exportAnalysis`
- `validate-format` command → `POST /api/v1/validateAppStoreModel`
- `example` command → **CLI-only** (no API endpoint needed)

### 4. Authentication Strategy

**Decision Required**: How should the API server authenticate with App Store Connect?
**Recommendation**: No authentication for now.

### 5. Data Transfer Format

**Decision Required**: How should data be transferred between CLI and API?
**Decision**: JSON over HTTP

### 6. Error Handling Strategy

**Decision Required**: How should errors be handled and communicated?
**Decision**: HTTP status codes + JSON error body

- **Rationale**:
  - Standard REST practice
  - Easy to handle in CLI
  - Clear error categorization
  - Good debugging experience

### 7. API Versioning Strategy

**Decision Required**: How should we handle API versioning?
**Decision**: URL versioning (`/api/v1/`)

- **Rationale**:
  - Simple and clear
  - Easy to implement
  - Allows breaking changes
  - Good for CLI tools

### 8. Configuration Management

**Decision Required**: How should the API server be configured?
**Decision**: Environment variables + optional config file

## Implementation Plan

### Step 1: Rename CLI Folder to API ✅ COMPLETED

- ✅ Renamed the `cli/` folder to `api/`
- ✅ Updated all references and configurations accordingly
- This is now the location for the API server

### Step 2: Add Express.js Setup ✅ COMPLETED

- ✅ Added Express.js and all necessary configurations under the `api/` folder
- ✅ Set up middlewares (CORS, JSON parsing, error handling, helmet, morgan)
- ✅ Configured the basic Express app structure with health check endpoint
- ✅ Added dotenv configuration to load environment variables
- **Note**: Authentication is handled via existing App Store Connect API credentials

### Step 3: Create Fetch API Endpoint ✅ COMPLETED

- ✅ Created fetch endpoint that replicates the current fetch command functionality
- ✅ Endpoint: `POST /api/v1/fetch`
- ✅ This endpoint does exactly what the current fetch command does, but via API
- ✅ Request: `{ appId: string }`
- ✅ Response: `{ success: boolean, data: AppStoreModel, error?: string }`
- ✅ Added proper validation using Zod schema
- ✅ Added comprehensive error handling

### Step 4: Ensure Fetch API Works Correctly ✅ COMPLETED

- ✅ Tested the fetch API endpoint thoroughly
- ✅ Verified it produces the same results as the current fetch command
- ✅ Ensured proper error handling and response formatting
- ✅ Confirmed the API can be called and returns expected data
- ✅ Tested validation scenarios (missing appId, empty appId, invalid appId)
- ✅ Tested health check and 404 handling

### Step 5: Use the new HTTP API on the related command

- ✅ Within the fetch cli command, instead of using the internal servers, we should now use the fetch http api
- ✅ "const appStoreState = useShortcuts(await fetchAppStoreState(appId));" this line will now get the appStoreState through the API

### Step 6: Next Steps

- ✅ **COMPLETED**: Basic API implementation with fetch, compare-price, apply endpoints
- **Next**: Add remaining API endpoints (set-price, validate-format)
- **Future**: Add authentication middleware, rate limiting, API documentation
- **Future**: Add monitoring, logging, and deployment configuration
