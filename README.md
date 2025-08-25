# App Store Sync CLI

A Node.js CLI tool to synchronize in-app purchases and subscriptions with the App Store from a local JSON file.

## Testing

This project uses Jest with multiple configurations to support different types of tests:

### Test Types

- **Unit Tests**: Fast, isolated tests with minimal logging (errors only)
- **Integration Tests**: Tests that interact with external APIs, with info-level logging
- **E2E Tests**: End-to-end tests with full system integration, with info-level logging

### Running Tests

```bash
# Run only unit tests (default)
npm test
npm run test:unit

# Run only integration tests
npm run test:integration

# Run only e2e tests
npm run test:e2e

# Run tests with coverage (unit tests only)
npm run test:coverage
```

### Test Configuration

The project uses separate Jest configurations for different test types:

- `jest.config.js` - Base configuration
- `jest.unit.config.js` - Unit tests (excludes integration and e2e tests)
- `jest.integration.config.js` - Integration tests only
- `jest.e2e.config.js` - E2E tests only

### Test File Naming Convention

- Unit tests: `*.test.ts` or `*.spec.ts`
- Integration tests: `*.integration.test.ts`
- E2E tests: `*.e2e.test.ts`

### Log Levels

- **Unit Tests**: Error logs only (minimal output)
- **Integration Tests**: Info logs and above (no debug)
- **E2E Tests**: Info logs and above (no debug)

### Test Timeouts

- **Unit Tests**: Default Jest timeout
- **Integration Tests**: 2 minutes
- **E2E Tests**: 5 minutes

## Development
