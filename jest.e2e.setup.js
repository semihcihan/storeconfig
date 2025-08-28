// E2E test setup - allows info logging and longer timeouts

// Set environment variable to suppress dotenv logging
process.env.DOTENV_CONFIG_SILENT = "true";

// Set log level to info for e2e tests (no debug)
process.env.LOG_LEVEL = "info";

// Allow all console output for e2e tests
// console.log = console.log;
// console.warn = console.warn;
// console.error = console.error;
// console.info = console.info;
// console.debug = console.debug;

// If you need to see logger output in e2e tests:
// import { setLogLevel } from '../src/utils/logger';
// setLogLevel('info');
