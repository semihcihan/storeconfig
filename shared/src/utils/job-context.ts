import { AsyncLocalStorage } from "async_hooks";

interface JobContext {
  jobId: string;
  currentActionIndex: () => number;
  appendInfo: (message: string, type?: "default" | "after") => Promise<void>;
}

// Create AsyncLocalStorage instance for job context
const jobContextStorage = new AsyncLocalStorage<JobContext>();

/**
 * Run a function within a job context
 * This sets up the job context for all async operations in the callback
 */
export function runWithJobContext<T>(
  context: JobContext,
  fn: () => Promise<T>
): Promise<T> {
  return jobContextStorage.run(context, fn);
}

/**
 * Get the current job context (if any)
 * Returns undefined if not in a job context
 */
function getJobContext(): JobContext | undefined {
  return jobContextStorage.getStore();
}

/**
 * Add an info message to the current job
 * This is a no-op if not running within a job context
 */
export async function addJobInfo(
  message: string,
  type: "default" | "after" = "default"
): Promise<void> {
  const context = getJobContext();
  if (context) {
    await context.appendInfo(message, type);
  }
}
