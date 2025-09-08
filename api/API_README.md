# Developer Tool API

A REST API that provides the same functionality as the Developer Tool CLI, allowing you to interact with App Store Connect programmatically.

## Quick Start

### Prerequisites

- Node.js 18+
- App Store Connect API credentials (ASC_PRIVATE_KEY, ASC_KEY_ID, ASC_ISSUER_ID)

### Running the API

```bash
# Development mode
npm run dev:api

# Production mode
npm run build
npm run start:api
```

The API will be available at `http://localhost:3000`

### Health Check

```bash
curl http://localhost:3000/health
```

## API Endpoints

### POST /api/v1/fetch

Fetches app data from App Store Connect.

**Request:**

```json
{
  "appId": "6503259293"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "schemaVersion": "1.0.0",
    "appId": "6503259293",
    "primaryLocale": "en-US",
    "pricing": { ... },
    "availableTerritories": "worldwide",
    "inAppPurchases": [ ... ],
    "subscriptionGroups": [ ... ],
    "versionString": "2.2.10",
    "localizations": [ ... ]
  }
}
```

**Error Response:**

```json
{
  "success": false,
  "error": "Validation error",
  "details": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": ["appId"],
      "message": "Required"
    }
  ]
}
```

## Error Handling

The API uses standard HTTP status codes:

- `200` - Success
- `400` - Bad Request (validation errors)
- `404` - Not Found (invalid routes)
- `500` - Internal Server Error

All error responses include a `success: false` field and descriptive error information.

## Environment Variables

The API requires the following environment variables to be set:

- `ASC_PRIVATE_KEY` - App Store Connect private key
- `ASC_KEY_ID` - App Store Connect key ID
- `ASC_ISSUER_ID` - App Store Connect issuer ID

These can be set in a `.env` file or as system environment variables.

## Development

The API is built with:

- Express.js
- TypeScript
- Zod for validation
- Winston for logging
- CORS, Helmet, and Morgan for middleware

## Future Endpoints

Additional endpoints will be added to replicate all CLI functionality:

- `POST /api/v1/apply` - Apply changes to App Store Connect
- `POST /api/v1/set-price` - Interactive pricing tool
- `POST /api/v1/compare-price` - Price comparison analysis
- `POST /api/v1/validate` - Validate JSON file format
