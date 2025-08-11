import winston from "winston";

// Log levels in order of priority
export const LOG_LEVELS = ["debug", "info", "warn", "error"] as const;
export type LogLevel = (typeof LOG_LEVELS)[number];

// Default log level
export const DEFAULT_LOG_LEVEL: LogLevel = "info";

// Get current log level from environment or default to 'info'
function getInitialLogLevel(): LogLevel {
  const envLevel = process.env.LOG_LEVEL;
  if (envLevel && LOG_LEVELS.includes(envLevel as LogLevel)) {
    return envLevel as LogLevel;
  }
  return DEFAULT_LOG_LEVEL;
}

// Winston logger configuration
function createWinstonLogger(): winston.Logger {
  return winston.createLogger({
    exitOnError: true,
    level: getInitialLogLevel(),
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.errors({ stack: false }),
      winston.format.simple()
    ),
    transports: [new winston.transports.Console()],
  });
}

// Function to set log level
export function setLogLevel(level: LogLevel): void {
  if (LOG_LEVELS.includes(level)) {
    winstonLogger.level = level;
    // Also update the active logger instance
    if (activeLogger instanceof WinstonLogger) {
      activeLogger.setLevel(level);
    }
  } else {
    console.warn(
      `Invalid log level: ${level}. Using '${DEFAULT_LOG_LEVEL}' as default.`
    );
    winstonLogger.level = DEFAULT_LOG_LEVEL;
    if (activeLogger instanceof WinstonLogger) {
      activeLogger.setLevel(DEFAULT_LOG_LEVEL);
    }
  }
}

// Function to get current log level
export function getLogLevel(): LogLevel {
  return winstonLogger.level as LogLevel;
}

// Log format configuration
export interface LogConfig {
  colors?: boolean;
  timestamps?: boolean;
  format?: (level: LogLevel, message: string, args: any[]) => string;
}

// Function to configure logging
export function configureLogging(config: Partial<LogConfig>): void {
  // Winston handles most of this automatically, but we can extend if needed
  console.warn(
    "configureLogging is deprecated - Winston handles configuration automatically"
  );
}

// Logger interface with color support
export interface Logger {
  debug: (...args: any[]) => void;
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
  prompt: (message: string) => string;
}

// Winston-based logger implementation
class WinstonLogger implements Logger {
  private winstonLogger: winston.Logger;

  constructor() {
    this.winstonLogger = createWinstonLogger();
  }

  debug(message: any, ...meta: any[]) {
    this.winstonLogger.debug(message, ...meta);
  }

  info(message: any, ...meta: any[]) {
    this.winstonLogger.info(message, ...meta);
  }

  warn(message: any, ...meta: any[]) {
    this.winstonLogger.warn(message, ...meta);
  }

  error(message: any, ...meta: any[]) {
    this.winstonLogger.error(message, ...meta);
  }

  prompt(message: string): string {
    // Winston doesn't have a prompt method, so we'll use console for this
    return message;
  }

  // Add method to update log level
  setLevel(level: LogLevel): void {
    if (LOG_LEVELS.includes(level)) {
      this.winstonLogger.level = level;
    }
  }
}

// Create the Winston logger instance
let winstonLogger: winston.Logger = createWinstonLogger();

// Default logger instance (used throughout the app)
let activeLogger: WinstonLogger = new WinstonLogger();

// Export the logger instance
export const logger: Logger = activeLogger;

// Allow overriding the logger (for DI/testing/advanced use)
export function setLogger(newLogger: Logger) {
  activeLogger = newLogger as WinstonLogger;
  // Update the exported logger reference
  (exports as any).logger = activeLogger;
}

// Get the current logger instance
export function getLogger(): Logger {
  return activeLogger;
}
