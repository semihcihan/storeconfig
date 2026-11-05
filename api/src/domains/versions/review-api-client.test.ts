import { api } from "../../services/api";
import {
  getAppReviewDetail,
  createAppReviewDetail,
  updateAppReviewDetail,
} from "./review-api-client";

jest.mock("../../services/api", () => ({
  api: { GET: jest.fn(), POST: jest.fn(), PATCH: jest.fn() },
}));
const get = api.GET as jest.Mock;
const post = api.POST as jest.Mock;
const patch = api.PATCH as jest.Mock;
const detail = { type: "appStoreReviewDetails", id: "review" };

beforeEach(() => jest.resetAllMocks());

it("treats only missing review details as absent", async () => {
  get.mockResolvedValue({
    response: new Response(null, { status: 404 }),
    error: {},
  } as any);
  expect(await getAppReviewDetail("version")).toBeUndefined();
  get.mockResolvedValue({
    response: new Response(null, { status: 403 }),
    error: { errors: [] },
  } as any);
  await expect(getAppReviewDetail("version")).rejects.toThrow(
    "Failed to get app review information"
  );
});

it("reads review details for the selected version", async () => {
  get.mockResolvedValue({
    response: new Response(),
    data: { data: detail },
  } as any);
  expect(await getAppReviewDetail("version")).toEqual(detail);
  expect(get).toHaveBeenCalledWith(
    "/v1/appStoreVersions/{id}/appStoreReviewDetail",
    { params: { path: { id: "version" } } }
  );
});

it("creates details with the version relationship", async () => {
  post.mockResolvedValue({ data: { data: detail } } as any);
  await createAppReviewDetail("version", {
    contactEmail: "jane@example.com",
    notes: "Instructions",
  });
  expect(post).toHaveBeenCalledWith("/v1/appStoreReviewDetails", {
    body: {
      data: {
        type: "appStoreReviewDetails",
        attributes: { contactEmail: "jane@example.com", notes: "Instructions" },
        relationships: {
          appStoreVersion: {
            data: { type: "appStoreVersions", id: "version" },
          },
        },
      },
    },
  });
});

it("patches only supplied attributes and sends empty notes", async () => {
  patch.mockResolvedValue({ data: { data: detail } } as any);
  await updateAppReviewDetail("review", { notes: "" });
  expect(patch).toHaveBeenCalledWith("/v1/appStoreReviewDetails/{id}", {
    params: { path: { id: "review" } },
    body: {
      data: {
        type: "appStoreReviewDetails",
        id: "review",
        attributes: { notes: "" },
      },
    },
  });
});

it("propagates creation and update errors", async () => {
  post.mockResolvedValue({ error: { errors: [] } } as any);
  patch.mockResolvedValue({ error: { errors: [] } } as any);
  await expect(
    createAppReviewDetail("version", { notes: "New" })
  ).rejects.toThrow("Failed to create app review information");
  await expect(
    updateAppReviewDetail("review", { notes: "New" })
  ).rejects.toThrow("Failed to update app review information");
});

it.each(["contactFirstName", "contactLastName", "contactPhone"])(
  "preserves Apple's %s rejection on both create and update",
  async (field) => {
    const appleError = {
      errors: [
        {
          status: "409",
          code: "ENTITY_ERROR.ATTRIBUTE.INVALID",
          title: `Invalid ${field}`,
          detail: `${field} is invalid.`,
          source: { pointer: `/data/attributes/${field}` },
        },
      ],
    };
    post.mockResolvedValue({ error: appleError });
    patch.mockResolvedValue({ error: appleError });
    await expect(
      createAppReviewDetail("version", { [field]: "Invalid" })
    ).rejects.toMatchObject({ context: { appleError } });
    await expect(
      updateAppReviewDetail("review", { [field]: "Invalid" })
    ).rejects.toMatchObject({ context: { appleError } });
  }
);
