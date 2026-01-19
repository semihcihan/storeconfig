# StoreConfig Business Rules

These are business rules enforced by App Store Connect that are NOT captured in the JSON schema. Violating these rules will cause the `storeconfig apply` command to fail.

## Deletion Rules

### In-App Purchases
- **In-app purchases cannot be deleted once created.** If you remove an IAP from your JSON config, the apply command will fail.
- If you no longer want to sell an IAP, remove its availability territories instead.

### Subscriptions
- **Subscriptions cannot be deleted once created.** If you remove a subscription from your JSON config, the apply command will fail.
- If you no longer want to sell a subscription, remove its availability territories instead.

### Subscription Groups
- **Subscription groups cannot be deleted once created.** If you remove a subscription group from your JSON config, the apply command will fail.

## Immutable Properties

### IAP Type
- **The type of an in-app purchase cannot be changed after creation.**
- Once an IAP is created as `CONSUMABLE`, `NON_CONSUMABLE`, or `NON_RENEWING_SUBSCRIPTION`, its type is permanent.
- To change the type, you must create a new IAP with a different `productId`.

### Subscription Period
- **The subscription period cannot be changed once a subscription is created.**
- Subscription periods: `ONE_WEEK`, `ONE_MONTH`, `TWO_MONTHS`, `THREE_MONTHS`, `SIX_MONTHS`, `ONE_YEAR`
- To change the period, you must create a new subscription with a different `productId`.

### Family Sharing
- **Family sharing cannot be turned off once enabled** for both IAPs and subscriptions.
- You can enable family sharing, but once enabled, it cannot be disabled.

### App Availability
- **The `availableInNewTerritories` setting cannot be modified after creation** via the API.
- This must be set correctly when first creating availability for your app.

## Ordering and Dependencies

### Pricing Requires Availability
- **Availability must be set up before pricing can be configured** for IAPs and subscriptions.
- Always define `availability` before `pricing` in your JSON config.

### Subscription Pricing Behavior
- When updating subscription prices, StoreConfig uses `preserveCurrentPrice: true` to protect existing subscribers.
- New subscribers get the updated price, existing subscribers keep their current price.

## Format Rules

### Product IDs
- **Product IDs can only contain alphanumeric characters, underscores, and periods.**
- Valid: `com.myapp.premium`, `premium_tier_1`, `iap.coins.100`
- Invalid: `premium-tier` (hyphen not allowed), `premium tier` (space not allowed), `premium@tier` (special characters not allowed)

### Primary Locale
- **The primary locale must exist in the localizations array.**
- If you set `primaryLocale: "en-US"`, you must have a localization entry with `locale: "en-US"`.

## Price Schedules

### Base Territory
- **The base territory must have a corresponding price in the prices array.**
- If `baseTerritory` is `"USA"`, there must be a price entry with `territory: "USA"`.

### Future Prices
- **You cannot create more than one future price for the same territory.**
- Each territory can only have one current price and one scheduled future price.
