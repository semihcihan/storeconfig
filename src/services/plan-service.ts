import { logger } from "../utils/logger";
import { AnyAction } from "../models/diff-plan";

export async function showAction(action: AnyAction) {
  logger.info(action);
}

export async function showPlan(plan: AnyAction[]) {
  for (const action of plan) {
    await showAction(action);
  }
}
