import { logger } from "../utils/logger";
import { AnyAction } from "../models/diff-plan";
import { api } from "./api";

async function executeAction(action: AnyAction) {
  logger.info(`Executing action: ${action.type}`);
  switch (action.type) {
    // In-App Purchases
    case "CREATE_IN_APP_PURCHASE":
      // Call API to create an in-app purchase
      break;
    case "UPDATE_IN_APP_PURCHASE":
      // Call API to update an in-app purchase
      break;
    case "DELETE_IN_APP_PURCHASE":
      // Call API to delete an in-app purchase
      break;
  }
}

export async function apply(plan: AnyAction[]) {
  for (const action of plan) {
    await executeAction(action);
  }
}
