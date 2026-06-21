/**
 * Constants for messages used throughout the application
 * Job messages are typically used with addJobInfo(message, "after")
 */

export const MESSAGES = {
  SUBSCRIPTION_PRICE_CHANGE:
    "Price changes for live subscriptions are scheduled for the following day per Apple's requirements. Note: These scheduled changes will not appear in your configuration right now when you refetch, as StoreConfig only displays the current active state. They will appear once they become active.",
  SCHEDULED_CHANGES_NOT_VISIBLE:
    "Scheduled changes won't appear in your configuration until they become active.",
} as const;
