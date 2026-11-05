import { AppStoreModelSchema, AppReviewInformationSchema } from "./app-store";

describe("app review information", () => {
  it("accepts notes up to 4000 characters and rejects longer notes", () => {
    expect(
      AppReviewInformationSchema.safeParse({ notes: "a".repeat(4000) }).success
    ).toBe(true);
    expect(
      AppReviewInformationSchema.safeParse({ notes: "a".repeat(4001) }).success
    ).toBe(false);
  });

  it("leaves contact validation to Apple and allows partial updates", () => {
    const information = {
      contactFirstName: " ",
      contactLastName: "",
      contactPhone: "05321234567",
      contactEmail: "invalid",
    };
    expect(AppReviewInformationSchema.parse(information)).toEqual(information);
    expect(AppReviewInformationSchema.parse({ notes: "" })).toEqual({
      notes: "",
    });
  });

  it("preserves review information in the root model and accepts older configs", () => {
    const base = { schemaVersion: "1.0", appId: "123" };
    expect(
      AppStoreModelSchema.parse(base).appReviewInformation
    ).toBeUndefined();
    const information = {
      contactFirstName: "Jane",
      contactLastName: "Doe",
      contactPhone: "+1 555 123 4567",
      contactEmail: "jane@example.com",
      notes: "Review instructions",
    };
    expect(
      AppStoreModelSchema.parse({ ...base, appReviewInformation: information })
        .appReviewInformation
    ).toEqual(information);
  });
});
