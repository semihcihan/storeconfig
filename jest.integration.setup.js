// Integration test setup - allows info logging and longer timeouts

// Set environment variable to suppress dotenv logging
process.env.DOTENV_CONFIG_SILENT = "true";

// Set log level to info for integration tests (no debug)
process.env.LOG_LEVEL = "info";

// Allow console output for integration tests
// console.log = console.log;
// console.warn = console.warn;
// console.error = console.error;
// console.info = console.info;
// console.debug = console.debug;

// Set longer timeout for integration tests
jest.setTimeout(120000); // 2 minutes

// If you need to see logger output in integration tests:
// import { setLogLevel } from '../src/utils/logger';
// setLogLevel('info');
