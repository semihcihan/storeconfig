import { spawn } from "child_process";

export type StoreConfigCommandResult = {
  stdout: string;
  stderr: string;
  exitCode: number;
};

export function runStoreConfigCommand(
  args: string[]
): Promise<StoreConfigCommandResult> {
  return new Promise((resolve) => {
    const proc = spawn("npx", ["-y", "storeconfig", ...args], {
      env: process.env,
    });

    let stdout = "";
    let stderr = "";

    proc.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    proc.stderr.on("data", (data) => {
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
