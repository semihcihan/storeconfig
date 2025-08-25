# Services

## Authentication Retry Mechanism

The project includes an automatic authentication retry mechanism that handles 401 NOT_AUTHORIZED errors from the Apple App Store Connect API.

### How it works

1. **Automatic Integration**: All API calls through the `api` service automatically include authentication retry logic
2. **Single Retry**: On 401 errors, the system automatically refreshes the JWT token and retries the request once
3. **No Infinite Loops**: Each endpoint is limited to one retry attempt to prevent infinite loops
4. **Parallel Request Safety**: The mechanism safely handles parallel API requests without conflicts

### Components

- **`api.ts`**: Main API client that integrates with retry middleware
- **`auth-interceptor.ts`**: Simple interceptor that handles 401 errors with reauthentication
- **`retry-middleware.ts`**: Handles other retryable errors (rate limits, 5xx errors, network issues)
- **`auth.ts`**: Manages JWT token generation and refresh

### Usage

No changes needed to existing code! All API calls automatically benefit:

```typescript
// This will automatically retry on 401 errors
const response = await api.GET("/v1/apps/{id}");
```

### Error Handling

- **401 errors**: Automatically retried once after token refresh
- **Other errors**: Handled by existing retry middleware (rate limits, 5xx, network)
- **404 errors**: Never retried (not retryable)

### Benefits

- **Simple**: Minimal complexity, easy to understand and maintain
- **Transparent**: No changes needed to existing code
- **Safe**: Prevents infinite loops and handles parallel requests correctly
- **Efficient**: Only refreshes tokens when actually needed
