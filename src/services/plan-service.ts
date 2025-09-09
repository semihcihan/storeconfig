import { logger } from "@semihcihan/shared";

export async function showAction(action: any) {
  logger.info(action);
}

export async function showPlan(plan: any[]) {
  for (const action of plan) {
    await showAction(action);
  }
}
