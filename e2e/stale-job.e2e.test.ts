import {
  cleanupE2ETest,
  backdateJobViaAws,
  generateTestIdentifier,
  getLastMockCallArg,
  mockInquirer,
  setupLoggerStdSpy,
  setupE2ETest,
  type E2ETestContext,
  validateE2EEnvironment,
} from "./helpers";
import * as fs from "fs";
import applyCommand from "../src/commands/apply";
import userCommand from "../src/commands/user";
import { apiClient } from "../src/services/api-client";
import type { AppStoreModel } from "@semihcihan/shared";

const UPDATED_AT = "2000-01-01T00:00:00.000Z";
const env = validateE2EEnvironment();

describe("Stale job cleanup E2E Tests", () => {
  let testContext: E2ETestContext;
  let desiredStateFile: string;
  let loggerStdSpy: jest.SpyInstance;

  beforeAll(async () => {
    testContext = await setupE2ETest(env);
    desiredStateFile = testContext.tempConfigFile;
    loggerStdSpy = setupLoggerStdSpy();

    const currentState = JSON.parse(fs.readFileSync(desiredStateFile, "utf-8"));
    const desiredState: AppStoreModel = {
      ...currentState,
      copyright: `${currentState.copyright ?? ""} ${generateTestIdentifier()}`,
    };

    fs.writeFileSync(desiredStateFile, JSON.stringify(desiredState, null, 2));
  });

  afterAll(async () => {
    loggerStdSpy.mockRestore();
    await cleanupE2ETest(testContext);
  });

  const createActiveJob = async (
    jobId: string,
    status: "pending" | "processing" | "yielded"
  ) => {
    await backdateJobViaAws({
      env,
      jobId,
      status,
      updatedAt: new Date().toISOString(),
      createIfMissing: true,
    });
  };

  const backdateJob = async (
    jobId: string,
    status: "pending" | "processing" | "yielded"
  ) => {
    await backdateJobViaAws({
      env,
      jobId,
      status,
      updatedAt: UPDATED_AT,
    });
  };

  const getInfo = async () => {
    const response = await apiClient.get("/info");
    return response.data.data.currentJob;
  };

  const expectStaleFailure = async (jobId: string) => {
    await getInfo();
    const statusResponse = await apiClient.get(`/status/${jobId}`);
    const jobStatus = statusResponse.data.data;
    expect(jobStatus.status).toBe("failed");
    expect(jobStatus.error ?? "").toContain("timed out after");
  };

  const ensureNoActiveJob = async () => {
    const currentJob = await getInfo();
    if (
      currentJob &&
      (currentJob.status === "pending" ||
        currentJob.status === "processing" ||
        currentJob.status === "yielded")
    ) {
      await backdateJob(currentJob.id, currentJob.status);
      await getInfo();
    }
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    mockInquirer.prompt.mockResolvedValue({
      confirmed: true,
      watchOngoing: true,
    });
    await ensureNoActiveJob();
  });

  it.each(["pending", "processing", "yielded"] as const)(
    "apply flow: clears stale %s job and applies new changes",
    async (status) => {
      const jobId = `stale-${status}-apply-${Date.now()}`;
      await createActiveJob(jobId, status);
      await backdateJob(jobId, status);
      await expectStaleFailure(jobId);

      const apiPostSpy = jest.spyOn(apiClient, "post");
      process.env.dryRun = "true";
      await expect(
        applyCommand.handler!({
          file: desiredStateFile,
          preview: false,
        } as any)
      ).resolves.toBeUndefined();
      delete process.env.dryRun;

      const applyCall = apiPostSpy.mock.calls.find(([url]) => url === "/apply");
      apiPostSpy.mockRestore();
      expect(applyCall).toBeDefined();
    }
  );

  it.each(["pending", "processing", "yielded"] as const)(
    "user command flow: user command surfaces stale %s failure",
    async (status) => {
      const jobId = `stale-user-${status}-${Date.now()}`;
      await createActiveJob(jobId, status);

      await userCommand.handler!({} as any);
      const firstOutput = getLastMockCallArg<string | undefined>(
        loggerStdSpy as jest.Mock,
        0
      );
      expect(firstOutput ?? "").not.toContain("Status: failed");

      await backdateJob(jobId, status);
      await userCommand.handler!({} as any);
      const secondOutput = getLastMockCallArg<string | undefined>(
        loggerStdSpy as jest.Mock,
        0
      );
      expect(secondOutput ?? "").toContain("Status: failed");
      expect(secondOutput ?? "").toContain("timed out after");
    }
  );
});
