import { spawnSync } from "child_process";

it("prints Apple review rejection details to stderr at the default CLI log level", () => {
  const errors = ["contactPhone", "contactFirstName", "contactLastName"].map(
    (field) => ({
      status: "409",
      code: "ENTITY_ERROR.ATTRIBUTE.INVALID",
      title: `Invalid ${field}`,
      detail: `${field} does not meet the allowed format or length.`,
      source: { pointer: `/data/attributes/${field}` },
    })
  );
  const result = spawnSync(
    process.execPath,
    [
      "-e",
      `
    const { logger, ContextualError, processNestedErrors } = require(${JSON.stringify(require.resolve("@semihcihan/shared"))});
    logger.setOutputModes([{ mode: "console", showErrorStack: false }]);
    logger.setLevel("info");
    const error = new ContextualError("Failed to update app review information", {
      appleError: { errors: ${JSON.stringify(errors)} }
    });
    logger.error("Command 'apply' failed", processNestedErrors(error, false));
  `,
    ],
    { encoding: "utf8" }
  );
  expect(result.status).toBe(0);
  expect(result.stdout).toBe("");
  for (const error of errors) {
    expect(result.stderr).toContain(error.title);
    expect(result.stderr).toContain(error.detail);
    expect(result.stderr).toContain(error.code);
    expect(result.stderr).toContain(error.source.pointer);
  }
});
