import chalk from "chalk";

// Log levels in order of priority
export const LOG_LEVELS = ["debug", "info", "warn", "error"] as const;
export type LogLevel = (typeof LOG_LEVELS)[number];

// Default log level
export const DEFAULT_LOG_LEVEL: LogLevel = "info";

// Performance optimization: Cache level indices
const levelIndices = new Map(LOG_LEVELS.map((level, index) => [level, index]));

// Get current log level from environment or default to 'info'
function getInitialLogLevel(): LogLevel {
  const envLevel = process.env.LOG_LEVEL;
  if (envLevel && LOG_LEVELS.includes(envLevel as LogLevel)) {
    return envLevel as LogLevel;
  }
  return DEFAULT_LOG_LEVEL;
}

let currentLevel: LogLevel = getInitialLogLevel();
let currentLevelIndex = levelIndices.get(currentLevel) ?? 1; // Default to 'info' index

// Check if a log level should be displayed based on current level (optimized)
function shouldLog(targetLevel: LogLevel): boolean {
  const targetIndex = levelIndices.get(targetLevel) ?? 1;
  return targetIndex >= currentLevelIndex;
}

// Function to set log level
export function setLogLevel(level: LogLevel): void {
  if (LOG_LEVELS.includes(level)) {
    currentLevel = level;
    currentLevelIndex = levelIndices.get(level) ?? 1;
  } else {
    console.warn(
      `Invalid log level: ${level}. Using '${DEFAULT_LOG_LEVEL}' as default.`
    );
    currentLevel = DEFAULT_LOG_LEVEL;
    currentLevelIndex = 1;
  }
}

// Function to get current log level
export function getLogLevel(): LogLevel {
  return currentLevel;
}

// Log format configuration
export interface LogConfig {
  colors?: boolean;
  timestamps?: boolean;
  format?: (level: LogLevel, message: string, args: any[]) => string;
}

// Default log configuration
const defaultConfig: LogConfig = {
  colors: true,
  timestamps: false,
  format: (level, message, args) => {
    const timestamp = defaultConfig.timestamps
      ? `[${new Date().toISOString()}] `
      : "";
    const prefix = `[${level}]`;
    return `${timestamp}${prefix} ${message}`;
  },
};

let logConfig: LogConfig = { ...defaultConfig };

// Function to configure logging
export function configureLogging(config: Partial<LogConfig>): void {
  logConfig = { ...logConfig, ...config };
}

// Logger interface with color support
export interface Logger {
  debug: (...args: any[]) => void;
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
  prompt: (message: string) => string;
}

// Console logger implementation with log level filtering and customization
class ConsoleLogger implements Logger {
  private formatMessage(level: LogLevel, args: any[]): string {
    const message = args.join(" ");

    if (logConfig.format) {
      return logConfig.format(level, message, args);
    }

    const timestamp = logConfig.timestamps
      ? `[${new Date().toISOString()}] `
      : "";
    const prefix = `[${level}]`;
    return `${timestamp}${prefix} ${message}`;
  }

  private getColor(level: LogLevel) {
    if (!logConfig.colors) return (text: string) => text;

    switch (level) {
      case "debug":
        return chalk.gray;
      case "info":
        return chalk.blue;
      case "warn":
        return chalk.yellow;
      case "error":
        return chalk.red;
      default:
        return (text: string) => text;
    }
  }

  debug(...args: any[]) {
    if (shouldLog("debug")) {
      const message = this.formatMessage("debug", args);
      const color = this.getColor("debug");
      console.debug(color(message));
    }
  }

  info(...args: any[]) {
    if (shouldLog("info")) {
      const message = this.formatMessage("info", args);
      const color = this.getColor("info");
      console.info(color(message));
    }
  }

  warn(...args: any[]) {
    if (shouldLog("warn")) {
      const message = this.formatMessage("warn", args);
      const color = this.getColor("warn");
      console.warn(color(message));
    }
  }

  error(...args: any[]) {
    if (shouldLog("error")) {
      const message = this.formatMessage("error", args);
      const color = this.getColor("error");
      console.error(color(message));
    }
  }

  prompt(message: string): string {
    return logConfig.colors ? chalk.cyan(message) : message;
  }
}

// Placeholder for other loggers (e.g., FileLogger, RemoteLogger)
// class FileLogger implements Logger { ... }
// class RemoteLogger implements Logger { ... }

// Logger provider/factory
function createLogger(): Logger {
  // You can enhance this logic to check process.env, config files, etc.
  if (
    process.env.NODE_ENV === "development" ||
    process.env.LOG_TO_CONSOLE === "true"
  ) {
    return new ConsoleLogger();
  }
  // Add more conditions for other loggers as needed
  // e.g., return new FileLogger();
  return new ConsoleLogger(); // fallback
}

// Default logger instance (used throughout the app)
let activeLogger: Logger = createLogger();

// Export the logger instance
export const logger: Logger = activeLogger;

// Allow overriding the logger (for DI/testing/advanced use)
export function setLogger(newLogger: Logger) {
  activeLogger = newLogger;
  // Update the exported logger reference
  (exports as any).logger = activeLogger;
}

// Get the current logger instance
export function getLogger(): Logger {
  return activeLogger;
}
