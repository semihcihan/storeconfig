import { logger, type AnyAction } from "@semihcihan/shared";

export async function showAction(action: AnyAction) {
  logger.debug("Applying action", action);
}
