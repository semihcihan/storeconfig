// Suppress console logs during tests to keep output clean

// Set environment variable to suppress dotenv logging
process.env.DOTENV_CONFIG_SILENT = "true";

// Set log level to error only for tests (suppresses debug, info, warn)
process.env.LOG_LEVEL = "error";

// Mock App Store Connect API credentials for tests
// Using environment variables for private key content (no files needed)

// Mock private key content directly in environment variables
const mockPrivateKey = `-----BEGIN PRIVATE KEY-----
MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQg+9z+vw9LihJF2jBN
NrI9Ql+OMGICXLGQfh2E1VaS0gegCgYIKoZIzj0DAQehRANCAASflxvvDFA4r3zn
L0nVdh0x7qs2+JfdRzwW1RgAjx1HpFJN2p8n5wL5vJfRj6L7Z0x7v2K3j5H8k9L2M
-----END PRIVATE KEY-----`;

// Default credentials
process.env.ASC_PRIVATE_KEY = mockPrivateKey; // Actual key content
process.env.ASC_KEY_ID = "test-key-id";
process.env.ASC_ISSUER_ID = "test-issuer-id";

// Fallback credentials
process.env.FALLBACK_ASC_PRIVATE_KEY = mockPrivateKey; // Actual key content
process.env.FALLBACK_ASC_KEY_ID = "test-fallback-key-id";
process.env.FALLBACK_ASC_ISSUER_ID = "test-fallback-issuer-id";

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

// Mock ora spinner
jest.mock("ora", () => {
  return jest.fn(() => ({
    start: jest.fn().mockReturnThis(),
    succeed: jest.fn().mockReturnThis(),
    fail: jest.fn().mockReturnThis(),
    warn: jest.fn().mockReturnThis(),
    info: jest.fn().mockReturnThis(),
    stop: jest.fn().mockReturnThis(),
    text: "",
    color: "cyan",
    spinner: "dots",
  }));
});
