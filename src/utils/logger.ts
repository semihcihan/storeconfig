import chalk from "chalk";

// Logger interface with color support
export interface Logger {
  debug: (...args: any[]) => void;
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
  prompt: (message: string) => string;
}

// Console logger implementation
class ConsoleLogger implements Logger {
  debug(...args: any[]) {
    console.debug(chalk.gray(...args));
  }
  info(...args: any[]) {
    console.info(chalk.blue(...args));
  }
  warn(...args: any[]) {
    console.warn(chalk.yellow(...args));
  }
  error(...args: any[]) {
    console.error(chalk.red(...args));
  }
  prompt(message: string): string {
    return chalk.cyan(message);
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
