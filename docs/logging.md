# Logging

StoreConfig runs the former hosted App Store Connect engine locally. Logging keeps the CLI terminal behavior clean while preserving the internal diagnostics that previously lived in serverless logs.

## Runtime Profiles

### CLI

Default CLI output is user-facing only.

- stdout is reserved for command data, such as `fetch --stdout` JSON.
- Terminal logs are written to stderr so command output remains pipe-safe.
- Normal CLI progress, prompts, plan summaries, warnings, and concise errors remain visible.
- Internal API telemetry does not appear in the terminal by default.
- A local log file is written only when a command fails.

### MCP

The MCP server uses stdout for protocol messages only.

- MCP process logs never write to stdout.
- StoreConfig commands spawned by MCP keep stdout as tool-result data only.
- Internal diagnostics are written to the local log file only when a command fails.
- stderr may contain process-level diagnostics that are safe for MCP transports.

### API Library

The `api` package does not configure global logging when imported as a library. Executable entrypoints configure the logger for their runtime profile.

## Failure Log File

Failure diagnostics are written to:

```text
~/.storeconfig/logs/storeconfig.log
```

Failure logs use newline-delimited JSON: one compact JSON object per line. File logs are not pretty-printed.

Successful command runs do not write internal diagnostics to the file by default. During a run, StoreConfig keeps a bounded in-memory buffer of recent internal diagnostics. If the command fails, StoreConfig writes an error event and the buffered context to the file.

The buffered context includes recent request and response metadata, response bodies, retry activity, pagination activity, cache decisions, warnings, and engine-level progress. This preserves the useful part of the old serverless log trail around failures without keeping a permanent log of every successful run.

Log files are rotated at 10 MB with 5 retained files. Log directories and files are created locally with private permissions where the platform supports it.

Sensitive headers and credential-like values are redacted before logging. App Store metadata, pricing data, product IDs, validation context, and response bodies are considered normal diagnostics and are logged in full after redaction.

Large objects and response bodies may be shortened inside the failure context so a single error entry stays bounded, while still preserving enough surrounding API calls and responses to diagnose what went wrong.

## Log Levels

The shared levels are:

- `debug`: internal diagnostics, API request/response telemetry, retries, pagination, cache decisions, and engine-level progress.
- `info`: user-facing command events and expected operational notices.
- `warn`: recoverable issues that may affect results, such as stale cache fallback.
- `error`: command failures and unrecovered internal failures.

API request/response telemetry is emitted at `debug` into the in-memory diagnostics buffer. This keeps the default CLI terminal clean while still making recent telemetry available when a command fails.

## Overrides

No CLI flags are required for logging configuration. Environment variables override defaults.

```bash
LOG_LEVEL=debug storeconfig fetch
LOG_LEVEL=warn storeconfig apply
STORECONFIG_FILE_LOG_LEVEL=info storeconfig fetch
STORECONFIG_LOG_FILE=/tmp/storeconfig.log storeconfig apply
```

`LOG_LEVEL` controls terminal log visibility for CLI runs. The default is `info`.

`STORECONFIG_FILE_LOG_LEVEL` controls which buffered events are eligible for failure logging. The default is `debug`.

`STORECONFIG_LOG_FILE` changes the local log file path. When unset, StoreConfig uses `~/.storeconfig/logs/storeconfig.log`.

Invalid log level values fall back to the runtime default and write a warning to the active diagnostics destination.

## Error Logging

CLI-facing errors remain concise. Full internal error context is written to the local log file.

On command failure, the log file receives a dedicated error-context event containing:

- the command name and run identifier;
- the full error object and stack;
- unshortened nested validation and contextual errors;
- the last 200 internal log events for the same command run;
- API request/response diagnostics that led to the failure, after redaction and with large body fields shortened inside the snapshot.

Successful command runs do not write the buffered diagnostics to the file by default. This replaces the old serverless error-context behavior without adding terminal noise or accumulating logs for successful runs.

## Output Boundary

Command data and diagnostics are separate by default.

- Machine-readable command output uses stdout.
- Human-facing terminal messages use stderr.
- Internal diagnostics are buffered in memory and written to the local log file on failure.
- Server or development entrypoints may opt into JSON console logs, but library imports never change the global logger configuration.
