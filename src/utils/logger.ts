import winston from "winston";
import util from "util";

// Log levels in order of priority
export const LOG_LEVELS = ["debug", "info", "warn", "error"] as const;
export type LogLevel = (typeof LOG_LEVELS)[number];

// Default log level
export const DEFAULT_LOG_LEVEL: LogLevel = "info";

// Log output mode configuration
export interface LogOutputConfig {
  mode: "console" | "file";
  showErrorStack: boolean;
}

// Support for multiple output modes
export type LogOutputModes = LogOutputConfig[];

// Get log output modes - always use console
function getInitialOutputModes(): LogOutputModes {
  return [{ mode: "console", showErrorStack: true }];
}

// Create format for console (with colors) or file (with timestamp)
function createFormat(isFile: boolean, showErrorStack: boolean) {
  const { combine, printf, timestamp } = winston.format;

  const RESET = "\x1b[0m";
  const GREEN = "\x1b[32m";
  const YELLOW = "\x1b[33m";
  const RED = "\x1b[31m";

  const printfFormat = printf((info) => {
    const { level, message, timestamp: ts, ...meta } = info as any;

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

    // Process the main message with error stack handling
    const processedMessage = renderValue(message, showErrorStack);

    // Process metadata (extras) with error stack handling
    // Winston puts additional arguments in the Symbol(splat) property
    const splat = meta[Symbol.for("splat")] || [];
    let metaContent = "";
    if (splat.length > 0) {
      const processedMeta = splat
        .map((value: any) => renderValue(value, showErrorStack))
        .join("\n");
      metaContent = `\n${processedMeta}`;
    }

    const fullContent = processedMessage + metaContent;
    const indentedContent = String(fullContent).replace(/\n/g, `\n${indent}`);

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

// Create transports based on output modes
function createTransports(
  outputModes: LogOutputModes,
  filename?: string
): winston.transport[] {
  const transports: winston.transport[] = [];

  // Add transports based on output modes
  for (const config of outputModes) {
    if (config.mode === "console") {
      transports.push(
        new winston.transports.Console({
          format: createFormat(false, config.showErrorStack),
        })
      );
    } else if (config.mode === "file") {
      if (!filename) {
        console.warn(
          `File output mode requested but no filename provided. Skipping file transport.`
        );
      } else {
        transports.push(
          new winston.transports.File({
            filename,
            format: createFormat(true, config.showErrorStack),
            maxsize: 10 * 1024 * 1024, // 10MB
            maxFiles: 5,
            tailable: true,
          })
        );
      }
    }
  }

  return transports;
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
  setOutputModes: (modes: LogOutputModes, filename?: string) => void;
  getOutputModes: () => LogOutputModes;
  addOutputMode: (config: LogOutputConfig, filename?: string) => void;
  removeOutputMode: (mode: "console" | "file") => void;
}

// Recursively process nested objects to remove error stacks
const processNestedErrors = (obj: any, showErrorStack: boolean): any => {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (obj instanceof Error) {
    if (!showErrorStack) {
      // Create a copy of the error without the stack but with message
      const errorCopy = Object.create(Object.getPrototypeOf(obj));
      Object.assign(errorCopy, obj);
      delete errorCopy.stack;

      // Set the name to just "Error" and ensure the message is preserved
      errorCopy.name = "Error";
      if (!errorCopy.message) {
        errorCopy.message = obj.message || obj.name || "Error";
      }

      // Also process the context property if it exists
      if (errorCopy.context) {
        errorCopy.context = processNestedErrors(
          errorCopy.context,
          showErrorStack
        );
      }

      return errorCopy;
    }
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => processNestedErrors(item, showErrorStack));
  }

  if (typeof obj === "object") {
    const processed: any = {};
    for (const [key, value] of Object.entries(obj)) {
      processed[key] = processNestedErrors(value, showErrorStack);
    }
    return processed;
  }

  return obj;
};

const renderValue = (value: unknown, showErrorStack: boolean): string => {
  try {
    // For strings, return them as-is to preserve newlines
    if (typeof value === "string") {
      return value;
    }

    // Process the value to remove error stacks from nested objects
    const processedValue = processNestedErrors(value, showErrorStack);

    return util.inspect(processedValue, {
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
  private currentConfig: LogOutputModes = [];

  constructor() {
    this.currentConfig = getInitialOutputModes();
    this.winstonLogger = WinstonLogger.createWinstonLogger(this.currentConfig);
  }

  // Static method to create winston logger
  private static createWinstonLogger(
    currentConfig: LogOutputModes
  ): winston.Logger {
    const transports = createTransports(currentConfig);

    return winston.createLogger({
      exitOnError: true,
      level: DEFAULT_LOG_LEVEL,
      transports,
    });
  }

  debug = (message: any, ...meta: any[]) => {
    // Pass raw message and metadata to Winston - let format functions handle error stack display
    this.winstonLogger.debug(message, ...meta);
  };

  info = (message: any, ...meta: any[]) => {
    // Pass raw message and metadata to Winston - let format functions handle error stack display
    this.winstonLogger.info(message, ...meta);
  };

  warn = (message: any, ...meta: any[]) => {
    // Pass raw message and metadata to Winston - let format functions handle error stack display
    this.winstonLogger.warn(message, ...meta);
  };

  error = (message: any, ...meta: any[]) => {
    // Pass raw message and metadata to Winston - let format functions handle error stack display
    this.winstonLogger.error(message, ...meta);
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

  // Add method to update output modes
  setOutputModes = (modes: LogOutputModes, filename?: string): void => {
    const validModes = modes.filter(
      (config) => config.mode === "console" || config.mode === "file"
    );

    if (validModes.length === 0) {
      this.winstonLogger.warn(`No valid output modes provided.`);
    }

    // Store current configuration
    this.currentConfig = validModes;

    // Clear existing transports
    this.winstonLogger.clear();

    // Use shared transport creation logic
    const transports = createTransports(validModes, filename);
    transports.forEach((transport) => this.winstonLogger.add(transport));
  };

  // Add method to get current output modes
  getOutputModes = (): LogOutputModes => {
    // Return the actual current configuration
    return this.currentConfig;
  };

  // Add method to add a single output mode
  addOutputMode = (config: LogOutputConfig, filename?: string): void => {
    if (config.mode !== "console" && config.mode !== "file") {
      this.winstonLogger.warn(`Invalid output mode: ${config.mode}. Skipping.`);
      return;
    }

    const currentModes = this.getOutputModes();
    if (currentModes.some((m) => m.mode === config.mode)) {
      this.winstonLogger.warn(
        `Output mode '${config.mode}' is already active. Skipping.`
      );
      return;
    }

    // Update current configuration
    this.currentConfig.push(config);

    // Use shared transport creation logic for the new mode
    const transports = createTransports([config], filename);
    transports.forEach((transport) => this.winstonLogger.add(transport));
  };

  // Add method to remove a single output mode
  removeOutputMode = (mode: "console" | "file"): void => {
    if (mode !== "console" && mode !== "file") {
      this.winstonLogger.warn(`Invalid output mode: ${mode}. Skipping.`);
      return;
    }

    const currentModes = this.getOutputModes();
    if (!currentModes.some((m) => m.mode === mode)) {
      this.winstonLogger.warn(`Output mode '${mode}' is not active. Skipping.`);
      return;
    }

    // If this is the only mode, don't remove it
    if (currentModes.length === 1) {
      this.winstonLogger.warn(
        `Cannot remove the last output mode '${mode}'. At least one output mode must remain.`
      );
      return;
    }

    // Update current configuration
    this.currentConfig = this.currentConfig.filter(
      (config) => config.mode !== mode
    );

    // Remove the transport
    const transports = this.winstonLogger.transports;
    const transportToRemove = transports.find((t) => {
      if (mode === "console" && t instanceof winston.transports.Console) {
        return true;
      }
      if (mode === "file" && t instanceof winston.transports.File) {
        return true;
      }
      return false;
    });

    if (transportToRemove) {
      this.winstonLogger.remove(transportToRemove);
    }
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

    const propsStr = renderValue(propsObj, true);
    return `${stack}\n${propsStr}`;
  }

  return stack;
};
