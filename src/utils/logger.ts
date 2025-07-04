// Logger interface
export interface Logger {
  log: (...args: any[]) => void;
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
}

// Console logger implementation
class ConsoleLogger implements Logger {
  log(...args: any[]) {
    console.log(...args);
  }
  info(...args: any[]) {
    console.info(...args);
  }
  warn(...args: any[]) {
    console.warn(...args);
  }
  error(...args: any[]) {
    console.error(...args);
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
export const logger: Logger = createLogger();

// Allow overriding the logger (for DI/testing/advanced use)
export function setLogger(newLogger: Logger) {
  (exports as any).logger = newLogger;
}
