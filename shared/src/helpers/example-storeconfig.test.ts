import { readJsonFile } from "./validation-helpers";
import { validateAppStoreModel } from "./validation-model";
import { removeShortcuts } from "./shortcut-converter";
import { describe, it, expect } from "@jest/globals";
import path from "path";

describe("Example StoreConfig Validation", () => {
  const exampleStoreConfigPath = path.join(
    __dirname,
    "../../example-storeconfig.json"
  );

  it("should validate the example store config using validateAppStoreModel for fetch context", () => {
    const storeConfig = readJsonFile(exampleStoreConfigPath);

    expect(() => {
      validateAppStoreModel(removeShortcuts(storeConfig), false, "fetch");
    }).not.toThrow();
  });

  it("should validate the example store config using validateAppStoreModel for apply context", () => {
    const storeConfig = readJsonFile(exampleStoreConfigPath);

    expect(() => {
      validateAppStoreModel(removeShortcuts(storeConfig), false, "apply");
    }).not.toThrow();
  });
});
