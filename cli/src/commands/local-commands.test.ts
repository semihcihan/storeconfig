import { localCommandNames } from "./local-commands";

describe("local CLI commands", () => {
  it("exports only the local-only command surface", () => {
    expect(localCommandNames).toEqual([
      "validate",
      "apply",
      "fetch",
      "set-price",
      "compare-price",
      "example",
      "apple",
    ]);
    expect(localCommandNames).not.toContain("configure");
    expect(localCommandNames).not.toContain("user");
  });
});
