import { spawn } from "child_process";
import "../services/instrument";
import Bugsnag from "@bugsnag/js";
import fs from "fs";
import path from "path";

export type StoreConfigCommandResult = {
  stdout: string;
  stderr: string;
  exitCode: number;
};

function getBundledCliEntryPath(): string | null {
  const candidates = [path.resolve(__dirname, "cli.js")];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }

  return null;
}

function spawnStoreConfig(args: string[]) {
  const bundledCliEntry = getBundledCliEntryPath();
  if (bundledCliEntry) {
    return spawn(process.execPath, [bundledCliEntry, ...args], {
      env: process.env,
    });
  }

  return spawn("storeconfig", args, { env: process.env });
}

export function runStoreConfigCommand(
  args: string[]
): Promise<StoreConfigCommandResult> {
  return new Promise((resolve, reject) => {
    let proc: ReturnType<typeof spawnStoreConfig>;
    try {
      proc = spawnStoreConfig(args);
    } catch (err) {
      Bugsnag.notify(err as Error, (event) => {
        event.addMetadata("metadata", {
          args,
          message: "Error spawning storeconfig",
        });
      });
      reject(err);
      return;
    }

    let stdout = "";
    let stderr = "";

    proc.stdout?.on("data", (data) => {
      stdout += data.toString();
    });

    proc.stderr?.on("data", (data) => {
      stderr += data.toString();
    });

    proc.on("close", (code) => {
      resolve({ stdout, stderr, exitCode: code ?? 1 });
    });

    proc.on("error", (err) => {
      resolve({ stdout, stderr: err.message, exitCode: 1 });
    });
  });
}

export function toMcpToolResult(result: StoreConfigCommandResult) {
  if (result.exitCode !== 0) {
    return {
      content: [
        {
          type: "text" as const,
          text: `Error: ${result.stderr || result.stdout}`,
        },
      ],
      isError: true,
    };
  }
  const response: {
    content: { type: "text"; text: string }[];
  } = {
    content: [{ type: "text" as const, text: result.stdout }],
  };
  return response;
}
