import { logger, LogLevel } from "@semihcihan/shared";

export interface LoggingOptions {
  logLevel?: LogLevel;
  sensitiveHeaders?: string[];
}

const DEFAULT_OPTIONS: Required<LoggingOptions> = {
  logLevel: "debug",
  sensitiveHeaders: ["authorization", "x-api-key", "cookie", "set-cookie"],
};

interface StoredBigResponse extends Record<string, any> {
  requestId: string;
  method: string;
  schemaPath: string;
  duration: number;
  status: number | string;
  statusText?: string;
  responseHeaders?: Record<string, string>;
  dataLength?: number | string;
  isPaginated?: boolean;
  responseBody: any;
  timestamp: string;
  logMessage: string;
}

const storedBigResponses = new Map<string, StoredBigResponse>();
let configuredLogLevel: LogLevel = "debug";

export function logStoredBigResponses(): void {
  if (storedBigResponses.size > 0) {
    for (const stored of storedBigResponses.values()) {
      const { logMessage, ...rest } = stored;
      logger[configuredLogLevel](logMessage, rest);
    }
    clearStoredBigResponses();
  }
}

export function clearStoredBigResponses(): void {
  storedBigResponses.clear();
}

/**
 * Sanitize headers by removing sensitive information
 */
function sanitizeHeaders(
  headers: Headers,
  sensitiveHeaders: string[]
): Record<string, string> {
  const sanitized: Record<string, string> = {};

  for (const [key, value] of headers.entries()) {
    const lowerKey = key.toLowerCase();
    if (
      sensitiveHeaders.some((sensitive) =>
        lowerKey.includes(sensitive.toLowerCase())
      )
    ) {
      sanitized[key] = "[REDACTED]";
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

/**
 * Safely serialize data with error handling
 * Returns the original data if it's a JSON object, otherwise serializes to string
 */
function safeSerialize(data: any, errorPrefix: string): any {
  // If it's already a string, return as-is
  if (typeof data === "string") {
    return data;
  }

  // Handle null separately - keep it as null for structured logging
  if (data === null) {
    return null;
  }

  // For response.data, it's always a JSON object from our API client
  // For other data (like errors), return as-is if it's an object, otherwise serialize
  if (typeof data === "object") {
    return data;
  }

  // For primitives and other types, serialize to string
  try {
    return JSON.stringify(data);
  } catch (error) {
    return `[${errorPrefix}: ${error}]`;
  }
}

/**
 * Safely serialize data and return an object with the key if data is not undefined
 * This prevents undefined values from being included in the log object
 */
function safeSerializeWithKey(
  data: any,
  key: string,
  errorPrefix: string
): Record<string, any> {
  if (data === undefined) {
    return {};
  }
  return { [key]: safeSerialize(data, errorPrefix) };
}

/**
 * Check if a response is considered "big" based on content-length header
 * Falls back to serializing the data if content-length is not available
 * @param headers The response headers
 * @param data The response data (used as fallback)
 * @returns true if the response is considered big (> 10KB)
 */
function isBigResponse(headers: Headers | undefined, data: any): boolean {
  // First, try to use content-length header
  if (headers) {
    const contentLength = headers.get("content-length");
    if (contentLength) {
      const size = parseInt(contentLength, 10);
      if (!isNaN(size)) {
        return size > 10 * 1024; // 10KB
      }
    }
  }

  // Fallback: serialize and check the data size
  if (data === undefined || data === null) {
    return false;
  }

  try {
    const serialized = JSON.stringify(data);
    return serialized.length > 10 * 1024; // 10KB
  } catch {
    // If serialization fails, consider it big to be safe
    return true;
  }
}

/**
 * Create a unique request ID for tracking requests through retries
 */
function generateRequestId(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

/**
 * Build log object for response (success or error)
 * Always includes responseBody - caller should remove it if response is big
 */
function buildResponseLog(
  requestId: string,
  method: string,
  endpoint: string,
  duration: number,
  response: any,
  sensitiveHeaders: string[]
): Record<string, any> {
  const status =
    response?.response?.status || (response?.error ? "ERROR" : "SUCCESS");
  const statusText = response?.response?.statusText;
  const responseHeaders = response?.response?.headers;
  const responseData = response?.data;
  const isPaginated = response?._isPaginated;
  const error = response?.error;

  return {
    requestId,
    method,
    schemaPath: endpoint,
    duration,
    status,
    statusText,
    ...(responseHeaders && {
      responseHeaders: sanitizeHeaders(responseHeaders, sensitiveHeaders),
    }),
    ...(responseData && {
      dataLength: Array.isArray(responseData)
        ? responseData.length
        : responseData?.data && Array.isArray(responseData.data)
          ? responseData.data.length
          : typeof responseData === "object"
            ? Object.keys(responseData).length
            : "unknown",
    }),
    ...(isPaginated && { isPaginated: true }),
    ...(error && { error: safeSerialize(error, "response error") }),
    ...(responseData !== undefined
      ? safeSerializeWithKey(responseData, "responseBody", "response body")
      : {}),
    timestamp: new Date().toISOString(),
  };
}

/**
 * Create a logging wrapper that logs all API calls including retries and pagination
 * This wrapper should be applied after retry and pagination wrappers to capture all calls
 */
export function createLoggingWrapper<T extends Record<string, any>>(
  apiClient: T,
  options: LoggingOptions = {}
): T {
  const config = { ...DEFAULT_OPTIONS, ...options };
  configuredLogLevel = config.logLevel;
  const wrappedClient = {} as T;

  for (const [method, handler] of Object.entries(apiClient)) {
    if (typeof handler === "function") {
      wrappedClient[method as keyof T] = (async (...args: any[]) => {
        const endpoint = args[0] as string;
        const requestId = generateRequestId();
        const startTime = Date.now();

        // Extract request parameters for logging
        const queryParams = args[1]?.params?.query || args[1]?.query || {};
        const pathParams = args[1]?.params?.path || {};
        const body = args[1]?.body;

        // Log the request
        logger[config.logLevel](`[${requestId}] REQ ${method} ${endpoint}`, {
          requestId,
          method,
          schemaPath: endpoint,
          params: {
            query: queryParams,
            path: pathParams,
          },
          ...(body && { body: safeSerialize(body, "request body") }),
          timestamp: new Date().toISOString(),
        });

        try {
          const response = await handler(...args);

          const duration = Date.now() - startTime;

          const isErrorResponse =
            response &&
            typeof response === "object" &&
            "error" in response &&
            response.error;

          const logObject = buildResponseLog(
            requestId,
            method,
            endpoint,
            duration,
            response,
            config.sensitiveHeaders
          );

          const status = logObject.status;
          const logMessage = `[${requestId}] RES ${method} ${endpoint} - ${status} (${duration}ms)`;

          if (isErrorResponse) {
            logger[config.logLevel](logMessage, logObject);
          } else {
            const isBig = isBigResponse(
              response?.response?.headers,
              response?.data
            );

            if (isBig && response?.data !== undefined) {
              storedBigResponses.set(requestId, {
                ...logObject,
                logMessage,
              } as StoredBigResponse);
            }

            const logObjectForLogging =
              isBig && response?.data !== undefined
                ? (() => {
                    const { responseBody, ...rest } = logObject;
                    return rest;
                  })()
                : logObject;

            logger[config.logLevel](logMessage, logObjectForLogging);
          }

          return response;
        } catch (error) {
          const duration = Date.now() - startTime;

          logger[config.logLevel](
            `[${requestId}] RES ${method} ${endpoint} - THROWN ERROR (${duration}ms)`,
            {
              requestId,
              method,
              schemaPath: endpoint,
              duration,
              error:
                error instanceof Error
                  ? {
                      name: error.name,
                      message: error.message,
                      stack: error.stack,
                    }
                  : safeSerialize(error, "thrown error"),
              timestamp: new Date().toISOString(),
            }
          );

          throw error;
        }
      }) as any;
    } else {
      wrappedClient[method as keyof T] = handler;
    }
  }

  return wrappedClient;
}
