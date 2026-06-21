import winston from "winston";
import util from "util";
import fs from "fs";
import os from "os";
import path from "path";
import { fromError, isZodErrorLike } from "zod-validation-error";

export const LOG_LEVELS = ["debug", "info", "warn", "error"] as const;
export type LogLevel = (typeof LOG_LEVELS)[number];

export const DEFAULT_LOG_LEVEL: LogLevel = "info";
export const DEFAULT_DIAGNOSTICS_LOG_LEVEL: LogLevel = "debug";
export const DEFAULT_DIAGNOSTICS_MAX_EVENTS = 200;

export interface LogOutputConfig {
  mode: "console" | "file" | "json";
  showErrorStack: boolean;
}

export type LogOutputModes = LogOutputConfig[];

export interface DiagnosticsOptions {
  level?: LogLevel;
  maxEvents?: number;
  logFile?: string;
  runtime?: string;
  runId?: string;
}

export interface FailureDiagnosticsContext {
  command?: string;
  error: unknown;
  metadata?: Record<string, unknown>;
  runId?: string;
  runtime?: string;
}

export interface Logger {
  debug: (...args: any[]) => void;
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
  std: (message: any) => any;
  setLevel: (level: LogLevel, minLevel?: LogLevel) => void;
  getLevel: () => LogLevel;
  setOutputModes: (modes: LogOutputModes, filename?: string) => void;
  getOutputModes: () => LogOutputModes;
  configureDiagnostics: (options?: DiagnosticsOptions) => void;
  startRun: (context?: {
    command?: string;
    runtime?: string;
    runId?: string;
  }) => string;
  clearDiagnosticsBuffer: () => void;
  writeFailureDiagnostics: (
    context: FailureDiagnosticsContext
  ) => string | undefined;
}

const ANSI = {
  RESET: "\x1b[0m",
  GREEN: "\x1b[32m",
  YELLOW: "\x1b[33m",
  RED: "\x1b[31m",
} as const;

type LogLevelPrefixConfig = {
  prefix: string;
  color?: string;
};

const LOG_LEVEL_PREFIXES: Record<string, LogLevelPrefixConfig> = {
  debug: { prefix: "d" },
  info: { prefix: "i", color: ANSI.GREEN },
  warn: { prefix: "warn", color: ANSI.YELLOW },
  error: { prefix: "error", color: ANSI.RED },
};

const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const SENSITIVE_KEY_PATTERNS = [
  "authorization",
  "x-api-key",
  "cookie",
  "set-cookie",
  "privatekey",
  "private_key",
  "asc_private_key",
  "token",
  "secret",
  "password",
];

const DEFAULT_LOG_FILE = path.join(
  os.homedir(),
  ".storeconfig",
  "logs",
  "storeconfig.log"
);
const FAILURE_LOG_MAX_SIZE_BYTES = 10 * 1024 * 1024;
const FAILURE_LOG_MAX_FILES = 5;

interface DiagnosticEvent {
  timestamp: string;
  sequence: number;
  runId: string;
  runtime?: string;
  command?: string;
  level: LogLevel;
  message: unknown;
  meta?: unknown;
}

const generateRunId = (): string =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

const isLogLevel = (value: unknown): value is LogLevel =>
  typeof value === "string" && LOG_LEVELS.includes(value as LogLevel);

const shouldIncludeLevel = (level: LogLevel, minLevel: LogLevel): boolean =>
  LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[minLevel];

const isSensitiveKey = (key: string): boolean => {
  const normalized = key.toLowerCase().replace(/[\s-]/g, "_");
  return SENSITIVE_KEY_PATTERNS.some((pattern) =>
    normalized.includes(pattern)
  );
};

const getLogPrefix = (
  level: string,
  useColor: boolean
): { visible: string; formatted: string } => {
  const config = LOG_LEVEL_PREFIXES[level];
  if (!config) {
    return { visible: `${level}:`, formatted: `${level}:` };
  }
  const { prefix, color } = config;
  const formatted =
    useColor && color ? `${color}${prefix}${ANSI.RESET}` : prefix;
  return { visible: prefix, formatted };
};

const getSplatMetadata = (meta: any): any[] => {
  return meta[Symbol.for("splat")] || [];
};

const isPlainEmptyObject = (obj: unknown): boolean => {
  if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
    return false;
  }
  if (Object.getPrototypeOf(obj) !== Object.prototype) {
    return false;
  }
  return Object.keys(obj).length === 0;
};

const processErrorContext = (
  context: any,
  showErrorStack: boolean,
  seen: WeakSet<object>
): any | undefined => {
  if (context === undefined) {
    return undefined;
  }
  const processed = processNestedErrors(context, showErrorStack, seen);
  if (processed === undefined) {
    return undefined;
  }
  if (
    typeof processed === "object" &&
    processed !== null &&
    Object.keys(processed).length === 0
  ) {
    return undefined;
  }
  return processed;
};

const processErrorObject = (
  obj: Error,
  showErrorStack: boolean,
  seen: WeakSet<object>
): any => {
  const errorObj: any = {
    message: isZodErrorLike(obj) ? fromError(obj).message : obj.message,
  };

  if (showErrorStack && obj.stack) {
    errorObj.stack = obj.stack;
  }

  Object.keys(obj).forEach((key) => {
    if (key === "name" || key === "message" || key === "stack") {
      return;
    }
    const value = (obj as any)[key];
    if (value !== undefined) {
      errorObj[key] = processNestedErrors(value, showErrorStack, seen);
    }
  });

  if (errorObj.context !== undefined) {
    const processedContext = processErrorContext(
      errorObj.context,
      showErrorStack,
      seen
    );
    if (processedContext !== undefined) {
      errorObj.context = processedContext;
    } else {
      delete errorObj.context;
    }
  }

  return errorObj;
};

export const processNestedErrors = (
  obj: any,
  showErrorStack: boolean,
  seen: WeakSet<object> = new WeakSet()
): any => {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj !== "object") {
    return obj;
  }

  if (seen.has(obj)) {
    return "[Circular]";
  }

  seen.add(obj);

  if (obj instanceof Error) {
    return processErrorObject(obj, showErrorStack, seen);
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => processNestedErrors(item, showErrorStack, seen));
  }

  const entries = Object.entries(obj);
  if (entries.length === 0) {
    return obj;
  }

  const processed: any = {};
  for (const [key, value] of entries) {
    processed[key] = processNestedErrors(value, showErrorStack, seen);
  }
  return processed;
};

interface DiagnosticSerializeOptions {
  showErrorStack: boolean;
  maxStringLength: number;
  maxArrayLength: number;
  maxObjectKeys: number;
}

const DIAGNOSTIC_SERIALIZE_OPTIONS: DiagnosticSerializeOptions = {
  showErrorStack: true,
  maxStringLength: 20_000,
  maxArrayLength: 100,
  maxObjectKeys: 100,
};

const ERROR_SERIALIZE_OPTIONS: DiagnosticSerializeOptions = {
  showErrorStack: true,
  maxStringLength: 100_000,
  maxArrayLength: 250,
  maxObjectKeys: 250,
};

const redactString = (value: string): string => {
  if (value.includes("BEGIN PRIVATE KEY") || value.includes("BEGIN RSA PRIVATE KEY")) {
    return "[REDACTED]";
  }

  return value.replace(/Bearer\s+[A-Za-z0-9._~+/=-]+/gi, "Bearer [REDACTED]");
};

const truncateString = (value: string, maxLength: number): string => {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength)}...[truncated ${value.length - maxLength} chars]`;
};

const serializeDiagnosticValue = (
  value: unknown,
  options: DiagnosticSerializeOptions,
  seen: WeakSet<object> = new WeakSet()
): unknown => {
  if (value === null || value === undefined) {
    return value;
  }

  if (typeof value === "string") {
    return truncateString(redactString(value), options.maxStringLength);
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return value;
  }

  if (typeof value === "bigint") {
    return value.toString();
  }

  if (typeof value === "symbol" || typeof value === "function") {
    return String(value);
  }

  if (typeof value !== "object") {
    return String(value);
  }

  if (seen.has(value)) {
    return "[Circular]";
  }

  seen.add(value);

  if (value instanceof Error) {
    const errorObject = processErrorObject(value, options.showErrorStack, seen);
    if (value.name) {
      errorObject.name = value.name;
    }
    return serializeDiagnosticValue(
      errorObject,
      options,
      seen
    );
  }

  if (Array.isArray(value)) {
    const items = value
      .slice(0, options.maxArrayLength)
      .map((item) => serializeDiagnosticValue(item, options, seen));
    if (value.length > options.maxArrayLength) {
      items.push(`[truncated ${value.length - options.maxArrayLength} items]`);
    }
    return items;
  }

  const serialized: Record<string, unknown> = {};
  const entries = Object.entries(value);
  for (const [key, nestedValue] of entries.slice(0, options.maxObjectKeys)) {
    serialized[key] = isSensitiveKey(key)
      ? "[REDACTED]"
      : serializeDiagnosticValue(nestedValue, options, seen);
  }

  if (entries.length > options.maxObjectKeys) {
    serialized.__truncatedKeys = entries.length - options.maxObjectKeys;
  }

  return serialized;
};

const renderValue = (
  value: unknown,
  showErrorStack: boolean,
  isFirstMeta: boolean
): string => {
  try {
    if (typeof value === "string") {
      return value;
    }

    let processedValue = processNestedErrors(value, showErrorStack);

    if (
      isFirstMeta &&
      typeof processedValue === "object" &&
      processedValue !== null &&
      "message" in processedValue
    ) {
      delete processedValue.message;
      if (isPlainEmptyObject(processedValue)) {
        return "";
      }
    }

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

const formatConsoleOutput = (
  level: string,
  message: string,
  meta: any,
  showErrorStack: boolean,
  isFile: boolean,
  timestamp?: string
): string => {
  const { visible, formatted } = getLogPrefix(level, !isFile);
  const indent = " ".repeat(visible.length + 1);

  const processedMessage = renderValue(message, showErrorStack, false);

  const splat = getSplatMetadata(meta);
  let metaContent = "";
  if (splat.length > 0) {
    const processedMeta = splat
      .map((value: any, index: number) =>
        renderValue(value, showErrorStack, index === 0)
      )
      .join("\n");
    metaContent = `\n${processedMeta}`;
  }

  const fullContent = processedMessage + metaContent;
  const indentedContent = String(fullContent).replace(/\n/g, `\n${indent}`);

  if (isFile && timestamp) {
    return `${timestamp} [${level.toUpperCase()}] ${indentedContent}`;
  }

  return `${formatted} ${indentedContent}\n`;
};

const createFormat = (isFile: boolean, showErrorStack: boolean) => {
  const { combine, printf, timestamp } = winston.format;

  const printfFormat = printf((info) => {
    const { level, message, timestamp: ts, ...meta } = info as any;
    return formatConsoleOutput(
      level,
      message,
      meta,
      showErrorStack,
      isFile,
      ts
    );
  });

  if (isFile) {
    return combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), printfFormat);
  }

  return combine(printfFormat);
};

const createJsonFormat = (showErrorStack: boolean) => {
  return winston.format.printf((info) => {
    const { level, message, timestamp: ts, ...meta } = info as any;

    const processedMessage = processNestedErrors(message, showErrorStack);
    const splat = getSplatMetadata(meta);
    const processedMeta = splat.map((value: any) =>
      processNestedErrors(value, showErrorStack)
    );

    const logObject: any = {
      timestamp: ts || new Date().toISOString(),
      level: level.toUpperCase(),
      message: processedMessage,
    };

    if (processedMeta.length === 1) {
      logObject.meta = processedMeta[0];
    } else if (processedMeta.length > 1) {
      logObject.meta = processedMeta;
    }

    return JSON.stringify(logObject, null, 0);
  });
};

const createConsoleTransport = (showErrorStack: boolean) => {
  return new winston.transports.Console({
    format: createFormat(false, showErrorStack),
    stderrLevels: [...LOG_LEVELS],
  });
};

const createFileTransport = (filename: string, showErrorStack: boolean) => {
  return new winston.transports.File({
    filename,
    format: createFormat(true, showErrorStack),
    maxsize: 10 * 1024 * 1024,
    maxFiles: 5,
    tailable: true,
  });
};

const createJsonTransport = (showErrorStack: boolean) => {
  return new winston.transports.Console({
    stderrLevels: [...LOG_LEVELS],
    format: winston.format.combine(
      winston.format.timestamp(),
      createJsonFormat(showErrorStack)
    ),
  });
};

const createTransports = (
  outputModes: LogOutputModes,
  filename?: string
): winston.transport[] => {
  const transports: winston.transport[] = [];

  for (const config of outputModes) {
    switch (config.mode) {
      case "console":
        transports.push(createConsoleTransport(config.showErrorStack));
        break;
      case "file":
        if (filename) {
          transports.push(createFileTransport(filename, config.showErrorStack));
        } else {
          console.warn(
            "File output mode requested but no filename provided. Skipping file transport."
          );
        }
        break;
      case "json":
        transports.push(createJsonTransport(config.showErrorStack));
        break;
    }
  }

  return transports;
};

const isValidOutputMode = (config: LogOutputConfig): boolean => {
  return (
    config.mode === "console" ||
    config.mode === "file" ||
    config.mode === "json"
  );
};

class WinstonLogger implements Logger {
  private winstonLogger: winston.Logger;
  private currentConfig: LogOutputModes = [];
  private diagnosticsBuffer: DiagnosticEvent[] = [];
  private diagnosticsLevel: LogLevel = DEFAULT_DIAGNOSTICS_LOG_LEVEL;
  private diagnosticsMaxEvents = DEFAULT_DIAGNOSTICS_MAX_EVENTS;
  private diagnosticsLogFile = DEFAULT_LOG_FILE;
  private diagnosticsSequence = 0;
  private runId = generateRunId();
  private runCommand: string | undefined;
  private runtime: string | undefined;

  constructor() {
    this.currentConfig = [{ mode: "console", showErrorStack: false }];
    this.winstonLogger = this.createWinstonLogger();
  }

  private createWinstonLogger(): winston.Logger {
    return winston.createLogger({
      exitOnError: true,
      level: DEFAULT_LOG_LEVEL,
      transports: createTransports(this.currentConfig),
    });
  }

  debug = (message: any, ...meta: any[]) => {
    this.recordDiagnostic("debug", message, meta);
    this.winstonLogger.debug(message, ...meta);
  };

  info = (message: any, ...meta: any[]) => {
    this.recordDiagnostic("info", message, meta);
    this.winstonLogger.info(message, ...meta);
  };

  warn = (message: any, ...meta: any[]) => {
    this.recordDiagnostic("warn", message, meta);
    this.winstonLogger.warn(message, ...meta);
  };

  error = (message: any, ...meta: any[]) => {
    this.recordDiagnostic("error", message, meta);
    this.winstonLogger.error(message, ...meta);
  };

  std = (message: any) => {
    if (typeof message === "object") {
      process.stderr.write(`${JSON.stringify(message, null, 2)}\n`);
    } else {
      process.stderr.write(`${message}\n`);
    }
  };

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

  getLevel = (): LogLevel => {
    return this.winstonLogger.level as LogLevel;
  };

  setOutputModes = (modes: LogOutputModes, filename?: string): void => {
    const validModes = modes.filter(isValidOutputMode);

    if (validModes.length === 0) {
      this.winstonLogger.warn("No valid output modes provided.");
    }

    this.currentConfig = validModes;
    this.winstonLogger.clear();

    const transports = createTransports(validModes, filename);
    transports.forEach((transport) => this.winstonLogger.add(transport));
  };

  getOutputModes = (): LogOutputModes => {
    return this.currentConfig;
  };

  configureDiagnostics = (options: DiagnosticsOptions = {}): void => {
    if (options.level !== undefined) {
      if (isLogLevel(options.level)) {
        this.diagnosticsLevel = options.level;
      } else {
        this.warn(
          `Invalid diagnostics log level: ${options.level}. Using '${DEFAULT_DIAGNOSTICS_LOG_LEVEL}' as default.`
        );
        this.diagnosticsLevel = DEFAULT_DIAGNOSTICS_LOG_LEVEL;
      }
    }

    if (options.maxEvents !== undefined && options.maxEvents > 0) {
      this.diagnosticsMaxEvents = Math.floor(options.maxEvents);
      this.trimDiagnosticsBuffer();
    }

    if (options.logFile && options.logFile.trim()) {
      this.diagnosticsLogFile = path.resolve(options.logFile);
    }

    if (options.runtime !== undefined) {
      this.runtime = options.runtime;
    }

    if (options.runId !== undefined) {
      this.runId = options.runId || generateRunId();
    }
  };

  startRun = (
    context: { command?: string; runtime?: string; runId?: string } = {}
  ): string => {
    this.runId = context.runId || generateRunId();
    this.runCommand = context.command;
    if (context.runtime !== undefined) {
      this.runtime = context.runtime;
    }
    this.clearDiagnosticsBuffer();
    return this.runId;
  };

  clearDiagnosticsBuffer = (): void => {
    this.diagnosticsBuffer = [];
  };

  writeFailureDiagnostics = (
    context: FailureDiagnosticsContext
  ): string | undefined => {
    const event = {
      timestamp: new Date().toISOString(),
      event: "error-context",
      runId: context.runId || this.runId,
      runtime: context.runtime || this.runtime,
      command: context.command || this.runCommand,
      error: serializeDiagnosticValue(context.error, ERROR_SERIALIZE_OPTIONS),
      metadata: context.metadata
        ? serializeDiagnosticValue(context.metadata, DIAGNOSTIC_SERIALIZE_OPTIONS)
        : undefined,
      recentEvents: this.diagnosticsBuffer.slice(-this.diagnosticsMaxEvents),
    };

    try {
      this.appendFailureLog(JSON.stringify(event));
      return this.diagnosticsLogFile;
    } catch {
      return undefined;
    }
  };

  private recordDiagnostic = (
    level: LogLevel,
    message: unknown,
    meta: unknown[]
  ): void => {
    if (!shouldIncludeLevel(level, this.diagnosticsLevel)) {
      return;
    }

    const event: DiagnosticEvent = {
      timestamp: new Date().toISOString(),
      sequence: ++this.diagnosticsSequence,
      runId: this.runId,
      runtime: this.runtime,
      command: this.runCommand,
      level,
      message: serializeDiagnosticValue(
        message,
        DIAGNOSTIC_SERIALIZE_OPTIONS
      ),
    };

    if (meta.length === 1) {
      event.meta = serializeDiagnosticValue(
        meta[0],
        DIAGNOSTIC_SERIALIZE_OPTIONS
      );
    } else if (meta.length > 1) {
      event.meta = serializeDiagnosticValue(
        meta,
        DIAGNOSTIC_SERIALIZE_OPTIONS
      );
    }

    this.diagnosticsBuffer.push(event);
    this.trimDiagnosticsBuffer();
  };

  private trimDiagnosticsBuffer = (): void => {
    if (this.diagnosticsBuffer.length > this.diagnosticsMaxEvents) {
      this.diagnosticsBuffer = this.diagnosticsBuffer.slice(
        -this.diagnosticsMaxEvents
      );
    }
  };

  private appendFailureLog = (line: string): void => {
    const logDir = path.dirname(this.diagnosticsLogFile);
    fs.mkdirSync(logDir, { recursive: true, mode: 0o700 });
    this.applyPrivatePermissions(logDir, 0o700);

    this.rotateFailureLogIfNeeded(Buffer.byteLength(line) + 1);
    fs.appendFileSync(this.diagnosticsLogFile, `${line}\n`, {
      encoding: "utf8",
      mode: 0o600,
    });
    this.applyPrivatePermissions(this.diagnosticsLogFile, 0o600);
  };

  private rotateFailureLogIfNeeded = (nextWriteBytes: number): void => {
    if (!fs.existsSync(this.diagnosticsLogFile)) {
      return;
    }

    const { size } = fs.statSync(this.diagnosticsLogFile);
    if (size + nextWriteBytes <= FAILURE_LOG_MAX_SIZE_BYTES) {
      return;
    }

    for (let index = FAILURE_LOG_MAX_FILES; index >= 1; index--) {
      const source =
        index === 1
          ? this.diagnosticsLogFile
          : `${this.diagnosticsLogFile}.${index - 1}`;
      const destination = `${this.diagnosticsLogFile}.${index}`;

      if (!fs.existsSync(source)) {
        continue;
      }

      if (fs.existsSync(destination)) {
        fs.unlinkSync(destination);
      }
      fs.renameSync(source, destination);
      this.applyPrivatePermissions(destination, 0o600);
    }
  };

  private applyPrivatePermissions = (targetPath: string, mode: number): void => {
    try {
      fs.chmodSync(targetPath, mode);
    } catch {
      // Best-effort only; some platforms/filesystems do not support chmod.
    }
  };
}

export const logger: Logger = new WinstonLogger();
