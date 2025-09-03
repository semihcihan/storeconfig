import winston from "winston";
import util from "util";

// Log levels in order of priority
export const LOG_LEVELS = ["debug", "info", "warn", "error"] as const;
export type LogLevel = (typeof LOG_LEVELS)[number];

// Default log level
export const DEFAULT_LOG_LEVEL: LogLevel = "info";

// Log output modes
export const LOG_OUTPUT_MODES = ["console", "file"] as const;
export type LogOutputMode = (typeof LOG_OUTPUT_MODES)[number];

// Get current log level from environment or default to 'info'
function getInitialLogLevel(): LogLevel {
  const envLevel = process.env.LOG_LEVEL;
  if (envLevel && LOG_LEVELS.includes(envLevel as LogLevel)) {
    return envLevel as LogLevel;
  }
  return DEFAULT_LOG_LEVEL;
}

// Get log output mode from environment or default to 'console'
function getInitialOutputMode(): LogOutputMode {
  const envMode = process.env.LOG_OUTPUT;
  if (envMode && LOG_OUTPUT_MODES.includes(envMode as LogOutputMode)) {
    return envMode as LogOutputMode;
  }
  return "console"; // Default is always console
}

// Create format for console (with colors) or file (with timestamp)
function createFormat(isFile: boolean) {
  const { combine, printf, timestamp } = winston.format;

  const RESET = "\x1b[0m";
  const GREEN = "\x1b[32m";
  const YELLOW = "\x1b[33m";
  const RED = "\x1b[31m";

  const printfFormat = printf((info) => {
    const { level, message, timestamp: ts } = info as any;

    let visiblePrefix: string;
    let coloredPrefix: string;
    switch (level) {
      case "debug":
        visiblePrefix = "d";
        coloredPrefix = isFile ? visiblePrefix : visiblePrefix;
        break;
      case "info":
        visiblePrefix = "i";
        coloredPrefix = isFile
          ? visiblePrefix
          : `${GREEN}${visiblePrefix}${RESET}`;
        break;
      case "warn":
        visiblePrefix = "warn";
        coloredPrefix = isFile
          ? visiblePrefix
          : `${YELLOW}${visiblePrefix}${RESET}`;
        break;
      case "error":
        visiblePrefix = "error";
        coloredPrefix = isFile
          ? visiblePrefix
          : `${RED}${visiblePrefix}${RESET}`;
        break;
      default:
        visiblePrefix = `${level}:`;
        coloredPrefix = isFile ? visiblePrefix : visiblePrefix;
    }

    const indent = " ".repeat(visiblePrefix.length + 1);
    const content = String(message);
    const indentedContent = String(content).replace(/\n/g, `\n${indent}`);

    if (isFile && ts) {
      return `${ts} [${level.toUpperCase()}] ${indentedContent}\n`;
    }

    return `${coloredPrefix} ${indentedContent}\n`;
  });

  if (isFile) {
    return combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), printfFormat);
  }

  return combine(printfFormat);
}

// Winston logger configuration
function createWinstonLogger(): winston.Logger {
  const outputMode = getInitialOutputMode();
  const logFile = process.env.LOG_FILE;
  const transports: winston.transport[] = [];

  // Add transports based on output mode
  if (outputMode === "console") {
    transports.push(
      new winston.transports.Console({ format: createFormat(false) })
    );
  }

  if (outputMode === "file" && logFile) {
    transports.push(
      new winston.transports.File({
        filename: logFile,
        format: createFormat(true),
        maxsize: 10 * 1024 * 1024, // 10MB
        maxFiles: 5,
        tailable: true,
      })
    );
  }

  return winston.createLogger({
    exitOnError: true,
    level: getInitialLogLevel(),
    transports,
  });
}

// Logger interface with color support
export interface Logger {
  debug: (...args: any[]) => void;
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
  prompt: (message: string) => string;
  setLevel: (level: LogLevel) => void;
  getLevel: () => LogLevel;
  setOutputMode: (mode: LogOutputMode, filename?: string) => void;
  getOutputMode: () => LogOutputMode;
}

const renderValue = (value: unknown): string => {
  try {
    // For strings, return them as-is to preserve newlines
    if (typeof value === "string") {
      return value;
    }

    return util.inspect(value, {
      colors: false,
      depth: null,
      compact: false,
      maxArrayLength: null,
      maxStringLength: null,
      customInspect: true,
    });
  } catch {
    return String(value);
  }
};

// Winston-based logger implementation
class WinstonLogger implements Logger {
  private winstonLogger: winston.Logger;

  constructor() {
    this.winstonLogger = createWinstonLogger();
  }

  private renderMessage = (message: any, extras: any[]): string => {
    const renderedMain = renderValue(message);
    if (!extras || extras.length === 0) return renderedMain;
    const renderedExtras = extras.map((e) => renderValue(e)).join("\n");
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
  setLevel = (level: LogLevel): void => {
    if (LOG_LEVELS.includes(level)) {
      this.winstonLogger.level = level;
    } else {
      this.winstonLogger.warn(
        `Invalid log level: ${level}. Using '${DEFAULT_LOG_LEVEL}' as default.`
      );
      this.winstonLogger.level = DEFAULT_LOG_LEVEL;
    }
  };

  // Add method to get current log level
  getLevel = (): LogLevel => {
    return this.winstonLogger.level as LogLevel;
  };

  // Add method to update output mode
  setOutputMode = (mode: LogOutputMode, filename?: string): void => {
    if (!LOG_OUTPUT_MODES.includes(mode)) {
      this.winstonLogger.warn(
        `Invalid output mode: ${mode}. Using 'console' as default.`
      );
      mode = "console";
    }

    // Clear existing transports
    this.winstonLogger.clear();

    // Add transports based on mode
    if (mode === "console") {
      this.winstonLogger.add(
        new winston.transports.Console({ format: createFormat(false) })
      );
    }

    if (mode === "file" && filename) {
      this.winstonLogger.add(
        new winston.transports.File({
          filename,
          format: createFormat(true),
          maxsize: 10 * 1024 * 1024, // 10MB
          maxFiles: 5,
          tailable: true,
        })
      );
    }
  };

  // Add method to get current output mode
  getOutputMode = (): LogOutputMode => {
    const transports = this.winstonLogger.transports;
    const hasFile = transports.some(
      (t) => t instanceof winston.transports.File
    );

    if (hasFile) return "file";
    return "console";
  };
}

// Default logger instance (used throughout the app)
let activeLogger: Logger = new WinstonLogger();

// Export the logger instance
export const logger: Logger = activeLogger;

// Extend Error interface to include custom inspect method
declare global {
  interface Error {
    [util.inspect.custom](): string;
  }
}

// Custom inspect method for all Error objects to ensure proper formatting
Error.prototype[util.inspect.custom] = function () {
  const stack = this.stack || String(this);

  // Get all enumerable properties (excluding the standard Error properties)
  const enumerableProps = Object.keys(this).filter(
    (key) => key !== "name" && key !== "message" && key !== "stack"
  );

  if (enumerableProps.length > 0) {
    const propsObj: any = {};
    enumerableProps.forEach((key) => {
      propsObj[key] = (this as any)[key];
    });

    const propsStr = renderValue(propsObj);
    return `${stack}\n${propsStr}`;
  }

  return stack;
};
