import { compareVersions } from "./version";

describe("version", () => {
  describe("compareVersions", () => {
    it("should return 0 when versions are equal", () => {
      expect(compareVersions("1.0.0", "1.0.0")).toBe(0);
      expect(compareVersions("0.0.19", "0.0.19")).toBe(0);
      expect(compareVersions("2.5.10", "2.5.10")).toBe(0);
    });

    it("should return -1 when current version is less than latest", () => {
      expect(compareVersions("1.0.0", "1.0.1")).toBe(-1);
      expect(compareVersions("0.0.19", "0.0.20")).toBe(-1);
      expect(compareVersions("1.2.3", "1.2.4")).toBe(-1);
      expect(compareVersions("0.0.0", "0.0.1")).toBe(-1);
    });

    it("should return 1 when current version is greater than latest", () => {
      expect(compareVersions("1.0.1", "1.0.0")).toBe(1);
      expect(compareVersions("0.0.20", "0.0.19")).toBe(1);
      expect(compareVersions("1.2.4", "1.2.3")).toBe(1);
      expect(compareVersions("0.0.1", "0.0.0")).toBe(1);
    });

    it("should handle patch version differences", () => {
      expect(compareVersions("1.0.0", "1.0.1")).toBe(-1);
      expect(compareVersions("1.0.1", "1.0.0")).toBe(1);
      expect(compareVersions("2.3.4", "2.3.5")).toBe(-1);
      expect(compareVersions("2.3.5", "2.3.4")).toBe(1);
    });

    it("should handle minor version differences", () => {
      expect(compareVersions("1.0.0", "1.1.0")).toBe(-1);
      expect(compareVersions("1.1.0", "1.0.0")).toBe(1);
      expect(compareVersions("2.3.0", "2.4.0")).toBe(-1);
      expect(compareVersions("2.4.0", "2.3.0")).toBe(1);
    });

    it("should handle major version differences", () => {
      expect(compareVersions("1.0.0", "2.0.0")).toBe(-1);
      expect(compareVersions("2.0.0", "1.0.0")).toBe(1);
      expect(compareVersions("0.0.19", "1.0.0")).toBe(-1);
      expect(compareVersions("1.0.0", "0.0.19")).toBe(1);
    });

    it("should handle versions with different number of parts", () => {
      expect(compareVersions("1.0", "1.0.0")).toBe(0);
      expect(compareVersions("1.0.0", "1.0")).toBe(0);
      expect(compareVersions("1", "1.0.0")).toBe(0);
      expect(compareVersions("1.0.0", "1")).toBe(0);
    });

    it("should handle versions with missing parts (treating as 0)", () => {
      expect(compareVersions("1.0", "1.0.1")).toBe(-1);
      expect(compareVersions("1.0.1", "1.0")).toBe(1);
      expect(compareVersions("1", "1.0.1")).toBe(-1);
      expect(compareVersions("1.0.1", "1")).toBe(1);
    });

    it("should handle multi-digit version numbers", () => {
      expect(compareVersions("10.20.30", "10.20.31")).toBe(-1);
      expect(compareVersions("10.20.31", "10.20.30")).toBe(1);
      expect(compareVersions("99.99.99", "100.0.0")).toBe(-1);
      expect(compareVersions("100.0.0", "99.99.99")).toBe(1);
    });

    it("should handle edge cases with zero versions", () => {
      expect(compareVersions("0.0.0", "0.0.1")).toBe(-1);
      expect(compareVersions("0.0.1", "0.0.0")).toBe(1);
      expect(compareVersions("0.0.0", "0.0.0")).toBe(0);
    });

    it("should correctly compare versions used in the application", () => {
      expect(compareVersions("0.0.19", "0.0.20")).toBe(-1);
      expect(compareVersions("0.0.20", "0.0.19")).toBe(1);
      expect(compareVersions("0.0.20", "0.0.20")).toBe(0);
      expect(compareVersions("0.0.18", "0.0.20")).toBe(-1);
    });

    it("should handle versions with leading zeros in parts", () => {
      expect(compareVersions("01.02.03", "1.2.3")).toBe(0);
      expect(compareVersions("1.2.3", "01.02.03")).toBe(0);
    });
  });
});
