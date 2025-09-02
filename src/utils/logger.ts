import winston from "winston";
import util from "util";

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
  const { combine, printf } = winston.format;

  const RESET = "\x1b[0m";
  const GREEN = "\x1b[32m";
  const YELLOW = "\x1b[33m";
  const RED = "\x1b[31m";

  const consoleFormat = combine(
    printf((info) => {
      const { level, message } = info as any;
      let visiblePrefix: string;
      let coloredPrefix: string;
      switch (level) {
        case "debug":
          visiblePrefix = "d";
          coloredPrefix = visiblePrefix;
          break;
        case "info":
          visiblePrefix = "i";
          coloredPrefix = `${GREEN}${visiblePrefix}${RESET}`;
          break;
        case "warn":
          visiblePrefix = "warn";
          coloredPrefix = `${YELLOW}${visiblePrefix}${RESET}`;
          break;
        case "error":
          visiblePrefix = "error";
          coloredPrefix = `${RED}${visiblePrefix}${RESET}`;
          break;
        default:
          visiblePrefix = `${level}:`;
          coloredPrefix = visiblePrefix;
      }

      const indent = " ".repeat(visiblePrefix.length + 1);
      const content = String(message);
      const indentedContent = String(content).replace(/\n/g, `\n${indent}`);

      return `${coloredPrefix} ${indentedContent}\n`;
    })
  );

  return winston.createLogger({
    exitOnError: true,
    level: getInitialLogLevel(),
    format: consoleFormat,
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
    winstonLogger.warn(
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

  private renderValue = (value: unknown): string => {
    if (typeof value === "string") return value;
    if (value instanceof Error) return value.stack || String(value);
    try {
      return util.inspect(value, {
        colors: true,
        depth: null,
        compact: false,
        maxArrayLength: null,
        maxStringLength: null,
      });
    } catch {
      return String(value);
    }
  };

  private renderMessage = (message: any, extras: any[]): string => {
    const renderedMain = this.renderValue(message);
    if (!extras || extras.length === 0) return renderedMain;
    const renderedExtras = extras.map((e) => this.renderValue(e)).join("\n");
    return `${renderedMain}\n${renderedExtras}`;
  };

  debug = (message: any, ...meta: any[]) => {
    this.winstonLogger.debug(this.renderMessage(message, meta));
  };

  info = (message: any, ...meta: any[]) => {
    this.winstonLogger.info(this.renderMessage(message, meta));
  };

  warn = (message: any, ...meta: any[]) => {
    this.winstonLogger.warn(this.renderMessage(message, meta));
  };

  error = (message: any, ...meta: any[]) => {
    this.winstonLogger.error(this.renderMessage(message, meta));
  };

  prompt = (message: string): string => {
    // Winston doesn't have a prompt method, so we'll use console for this
    return message;
  };

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
