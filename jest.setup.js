// Suppress console logs during tests to keep output clean

// Set environment variable to suppress dotenv logging
process.env.DOTENV_CONFIG_SILENT = "true";

// Suppress console output immediately (before any modules load)
console.log = () => {};
console.warn = () => {};
console.error = () => {};
console.info = () => {};

// Store original console functions for potential restoration
const originalConsoleLog = console.log;
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;
const originalConsoleInfo = console.info;

// If you need to see specific console output in a test, you can temporarily restore it:
// console.log = originalConsoleLog;
// console.log('This will show in the test output');
