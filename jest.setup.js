// Suppress console logs during tests to keep output clean

// Set environment variable to suppress dotenv logging
process.env.DOTENV_CONFIG_SILENT = "true";

// Set log level to error only for tests (suppresses debug, info, warn)
process.env.LOG_LEVEL = "error";

// Suppress console output immediately (before any modules load)
console.log = () => {};
console.warn = () => {};
console.error = () => {};
console.info = () => {};
console.debug = () => {};

// Store original console functions for potential restoration
const originalConsoleLog = console.log;
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;
const originalConsoleInfo = console.info;
const originalConsoleDebug = console.debug;

// If you need to see specific console output in a test, you can temporarily restore it:
// console.log = originalConsoleLog;
// console.log('This will show in the test output');

// If you need to see logger output in a specific test, you can:
// import { setLogLevel } from '../src/utils/logger';
// setLogLevel('debug');
