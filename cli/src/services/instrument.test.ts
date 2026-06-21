describe("instrument", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    process.env = { ...originalEnv };
    delete process.env.BUGSNAG_API_KEY;
    delete process.env.STORECONFIG_BUGSNAG_API_KEY;
    delete process.env.STORECONFIG_DISABLE_TELEMETRY;
    delete process.env.BUGSNAG_ENABLED;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  function loadInstrument() {
    require("./instrument");
    return require("@bugsnag/js");
  }

  it("does not start Bugsnag when no API key is configured", () => {
    process.env.NODE_ENV = "production";

    const Bugsnag = loadInstrument();

    expect(Bugsnag.start).not.toHaveBeenCalled();
    expect(() => Bugsnag.notify(new Error("test"))).not.toThrow();
  });

  it("starts Bugsnag when an API key is configured", () => {
    process.env.NODE_ENV = "production";
    process.env.BUGSNAG_API_KEY = "test-bugsnag-key";

    const Bugsnag = loadInstrument();

    expect(Bugsnag.start).toHaveBeenCalledWith(
      expect.objectContaining({
        apiKey: "test-bugsnag-key",
        autoTrackSessions: false,
      })
    );
  });

  it("does not start Bugsnag when telemetry is disabled", () => {
    process.env.NODE_ENV = "production";
    process.env.BUGSNAG_API_KEY = "test-bugsnag-key";
    process.env.STORECONFIG_DISABLE_TELEMETRY = "true";

    const Bugsnag = loadInstrument();

    expect(Bugsnag.start).not.toHaveBeenCalled();
  });
});
