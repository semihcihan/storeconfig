import {
  fetchAppReviewInformation,
  applyAppReviewInformation,
} from "./review-service";
import {
  getAppReviewDetail,
  createAppReviewDetail,
  updateAppReviewDetail,
} from "./review-api-client";
import { getAppStoreVersionsForApp } from "./api-client";
import { diff } from "../../services/diff-service";
import { apply } from "../../services/apply-service";

jest.mock("./review-api-client");
jest.mock("./api-client");

const getDetail = jest.mocked(getAppReviewDetail);
const createDetail = jest.mocked(createAppReviewDetail);
const updateDetail = jest.mocked(updateAppReviewDetail);
const base = { schemaVersion: "1.0", appId: "123" };

beforeEach(() => {
  jest.resetAllMocks();
  jest.mocked(getAppStoreVersionsForApp).mockResolvedValue({
    data: [
      {
        type: "appStoreVersions",
        id: "old",
        attributes: { createdDate: "2025-01-01" },
      },
      {
        type: "appStoreVersions",
        id: "latest",
        attributes: { createdDate: "2026-01-01" },
      },
    ],
    links: { self: "https://example.com/versions" },
  });
});

it("fetches supported fields from the latest version and omits nulls and demo credentials", async () => {
  getDetail.mockResolvedValue({
    type: "appStoreReviewDetails",
    id: "review",
    attributes: {
      contactFirstName: "Jane",
      contactLastName: "Doe",
      contactPhone: "+1 555 123 4567",
      contactEmail: "jane@example.com",
      notes: null as any,
      demoAccountPassword: "secret",
    },
  });
  expect(await fetchAppReviewInformation("123")).toEqual({
    contactFirstName: "Jane",
    contactLastName: "Doe",
    contactPhone: "+1 555 123 4567",
    contactEmail: "jane@example.com",
  });
  expect(getDetail).toHaveBeenCalledWith("latest");
});

it("omits missing review details and propagates failures", async () => {
  getDetail.mockResolvedValue(undefined);
  expect(await fetchAppReviewInformation("123")).toBeUndefined();
  getDetail.mockRejectedValue(new Error("Unauthorized"));
  await expect(fetchAppReviewInformation("123")).rejects.toThrow(
    "Unauthorized"
  );
});

it("creates missing details", async () => {
  getDetail.mockResolvedValue(undefined);
  await applyAppReviewInformation("123", { notes: "Instructions" });
  expect(createDetail).toHaveBeenCalledWith("latest", {
    notes: "Instructions",
  });
  expect(updateDetail).not.toHaveBeenCalled();
});

it("applies a preview plan with only supplied changes, including clearing notes", async () => {
  getDetail.mockResolvedValue({ type: "appStoreReviewDetails", id: "review" });
  const current = {
    ...base,
    appReviewInformation: { contactFirstName: "Jane", notes: "Old" },
  };
  const desired = { ...base, appReviewInformation: { notes: "" } };
  const plan = diff(current, desired);
  expect(plan).toEqual([
    { type: "UPDATE_APP_REVIEW_INFORMATION", payload: { notes: "" } },
  ]);
  await apply(plan, desired);
  expect(updateDetail).toHaveBeenCalledWith("review", { notes: "" });
  expect(createDetail).not.toHaveBeenCalled();
});

it("does nothing for omitted or unchanged information", () => {
  const current = { ...base, appReviewInformation: { notes: "Same" } };
  expect(diff(current, base)).toEqual([]);
  expect(diff(current, current)).toEqual([]);
  expect(diff(current, { ...base, appReviewInformation: {} })).toEqual([]);
});

it("orders review updates after version metadata changes", () => {
  const plan = diff(
    { ...base, versionString: "1.0" },
    { ...base, versionString: "2.0", appReviewInformation: { notes: "New" } }
  );
  expect(plan.map((action) => action.type)).toEqual([
    "UPDATE_VERSION_METADATA",
    "UPDATE_APP_REVIEW_INFORMATION",
  ]);
});

it("fails without an iOS version", async () => {
  jest.mocked(getAppStoreVersionsForApp).mockResolvedValue({
    data: [],
    links: { self: "https://example.com/versions" },
  });
  await expect(
    applyAppReviewInformation("123", { notes: "New" })
  ).rejects.toThrow("No valid IOS version");
  expect(createDetail).not.toHaveBeenCalled();
});

it("reapplies supplied review details when the version changes", () => {
  const information = { notes: "Same notes" };
  const plan = diff(
    { ...base, versionString: "1.0", appReviewInformation: information },
    { ...base, versionString: "2.0", appReviewInformation: information }
  );
  expect(plan[1]).toEqual({
    type: "UPDATE_APP_REVIEW_INFORMATION",
    payload: information,
  });
});

it("does not repeatedly clear notes Apple returns as null or absent", () => {
  expect(diff(base, { ...base, appReviewInformation: { notes: "" } })).toEqual(
    []
  );
});
