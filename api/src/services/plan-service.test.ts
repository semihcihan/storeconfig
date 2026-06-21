import type { AnyAction } from "@semihcihan/shared";
import { logger } from "@semihcihan/shared";
import { showAction } from "./plan-service";

jest.mock("@semihcihan/shared", () => ({
  logger: {
    debug: jest.fn(),
    info: jest.fn(),
  },
}));

describe("plan-service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("records apply action details as diagnostics instead of terminal info", async () => {
    const action: AnyAction = {
      type: "UPDATE_VERSION_METADATA",
      payload: {
        copyright: "2026 Example",
      },
    };

    await showAction(action);

    expect(logger.debug).toHaveBeenCalledWith("Applying action", action);
    expect(logger.info).not.toHaveBeenCalled();
  });
});
