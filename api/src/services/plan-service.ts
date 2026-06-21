import { logger, AnyAction } from "@semihcihan/shared";

export async function showAction(action: AnyAction) {
  logger.info(action);
}
