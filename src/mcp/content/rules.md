## Deletion Rules

### In-App Purchases
- **In-app purchases cannot be deleted once created.**
### Subscriptions
- **Subscriptions cannot be deleted once created.**

### Subscription Groups
- **Subscription groups cannot be deleted once created.**

## Immutable Properties

### IAP Type
- **The type of an in-app purchase cannot be changed after creation.**

### Subscription Period
- **The subscription period cannot be changed once a subscription is created.**

### Family Sharing
- **Family sharing cannot be turned off once enabled** for both IAPs and subscriptions.

## Ordering and Dependencies

### Pricing Requires Availability
- **Availability must be set up before or at the same time as pricing** for IAPs and subscriptions.

## Price Schedules

### Base Territory
- **The base territory must have a corresponding price in the prices array.**
- If `baseTerritory` is `"USA"`, there must be a price entry with `territory: "USA"`.

### Pricing
- **Base territory pricing applies to all territories by default.**
- Territories specified in the pricing array use their specified prices instead of the base territory price.
- To set pricing for all territories, it is enough to provide only a base territory and its price.
