import { logger } from "@semihcihan/shared";

const isExpressServer = !!process.env.EXPRESS_SERVER;

if (isExpressServer) {
  logger.setOutputModes([{ mode: "file", showErrorStack: true }], "./api.log");
  logger.setLevel("debug");
} else {
  logger.setOutputModes([{ mode: "json", showErrorStack: true }]);
  logger.setLevel("info");
}
