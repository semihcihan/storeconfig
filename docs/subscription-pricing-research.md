# Subscription and Offer Pricing Research & Implementation Plan

## Overview

This document outlines the research findings and implementation plan for supporting Apple pricing strategy for subscriptions and promotional offers, which don't have a base territory pricing model like apps and in-app purchases.

## Problem Statement

Unlike apps and in-app purchases that support a `baseTerritory` pricing model where Apple automatically cascades prices to other territories, **subscriptions and promotional offers require manual price specification for each territory**. This creates significant manual work when setting prices across multiple territories.

The current implementation in `set-price-service.ts` throws an error for subscriptions and offers:

```typescript
if (selectedItem.type === "subscription" || selectedItem.type === "offer") {
  throw new Error(
    `Apple pricing for '${selectedItem.type}' is not implemented yet for state updates`
  );
}
```

## Current Data Structure Analysis

### Subscriptions Model

Based on the codebase analysis, subscriptions use a `prices` array directly without a `priceSchedule` with `baseTerritory`:

```json
{
  "productId": "new_product_id_10123",
  "subscriptionPeriod": "ONE_WEEK",
  "prices": [
    {
      "price": "10.99",
      "territory": "GBR"
    },
    {
      "price": "10.99",
      "territory": "USA"
    }
  ]
}
```

### Apps vs Subscriptions Pricing Comparison

| Feature                | Apps/IAPs                            | Subscriptions/Offers    |
| ---------------------- | ------------------------------------ | ----------------------- |
| Pricing Model          | `priceSchedule` with `baseTerritory` | Direct `prices` array   |
| Apple Auto-pricing     | ✅ Cascades from base territory      | ❌ Manual per territory |
| Current Implementation | ✅ Supported                         | ❌ Not implemented      |

## Research Findings

### 1. Available APIs for Price Points

The codebase already has infrastructure for fetching price points across territories:

#### Subscription Price Points API

- **Endpoint**: `/v1/subscriptions/{id}/pricePoints`
- **Function**: `fetchAllSubscriptionPricePoints(subscriptionId, territory?)`
- **Features**:
  - Can fetch all price points for a subscription
  - Supports territory filtering
  - Returns `customerPrice` and territory information
  - Has caching mechanism via `pricePointsCache`

#### Territory Management

- **Available Territories**: Retrieved from `appStoreState.availableTerritories`
- **Currency Data**: Available in `src/data/currencies.json` (informational; not required for Apple strategy)
- **Territory Info**: Each territory includes an Apple territory code and currency

### 2. Existing Price Point Matching Logic

The system already has robust price point matching:

```typescript
// From src/domains/subscriptions/pricing-service.ts
export async function findSubscriptionPricePointId(
  price: string,
  territory: string,
  subscriptionId: string
): Promise<string>;
```

This function:

- ✅ Fetches available price points for a territory
- ✅ Matches exact price to Apple's price point ID
- ✅ Uses caching for performance
- ✅ Provides detailed error messages with available alternatives

### 3. Price Conversion Capabilities

The focus is on Apple pricing strategy only:

#### Apple Strategy

- Uses Apple's predefined price points for each territory
- Finds the equivalent Apple price point in each territory for a given USD price
- No currency conversion or PPP calculations needed (Apple handles this)
- Key challenge: Finding the "equivalent" price point across territories

## 🚀 BREAKTHROUGH DISCOVERY: Equalizations Endpoint

### Equalizations API Endpoint

**Endpoint**: `/v1/subscriptionPricePoints/{id}/equalizations`

This endpoint is a game-changer for subscription pricing! Instead of making individual API calls for each territory, we can get **all equivalent price points across all territories in a single API call**.

#### API Response Structure

```typescript
// Single API call returns all territories with equivalent pricing
GET /v1/subscriptionPricePoints/{usdPricePointId}/equalizations

Response:
{
  "data": [
    {
      "id": "pricePointId1",
      "type": "subscriptionPricePoints",
      "attributes": {
        "customerPrice": "0.29"
      },
      "relationships": {
        "territory": {
          "data": {
            "id": "AFG"
          }
        }
      }
    },
    {
      "id": "pricePointId2",
      "type": "subscriptionPricePoints",
      "attributes": {
        "customerPrice": "0.99"
      },
      "relationships": {
        "territory": {
          "data": {
            "id": "ARE"
          }
        }
      }
    }
    // ... 174 territories total
  ]
}
```

#### Live Test Results

✅ **Successfully tested with real API data:**

- **Subscription ID**: 6748884708
- **USD Price Point**: $0.29
- **Equalized Territories**: 174 territories
- **Sample Results**:
  - AFG: $0.29
  - AGO: $0.29
  - AIA: $0.29
  - ALB: $0.29
  - ARE: $0.99 (different pricing tier)
  - ARG: $0.29
  - ARM: $0.29
  - ATG: $0.29
  - AUS: $0.49 (different pricing tier)
  - AUT: $0.29

#### Key Benefits

1. **Single API Call**: Instead of 174 individual territory calls, we get all data in one request
2. **Complete Coverage**: Covers all available territories automatically
3. **Performance**: Dramatically faster than per-territory approach
4. **Reliability**: Apple guarantees the data consistency across territories
5. **Direct Mapping**: Direct price point relationships, no complex calculations needed

## Implementation Strategy

### 🎯 OPTIMAL APPROACH: Equalizations Endpoint

The equalizations endpoint provides the most efficient and reliable implementation strategy:

#### Core Algorithm

```typescript
// Single API call approach using equalizations endpoint
async function buildSubscriptionPricesWithEqualizations(
  baseUsdPrice: string,
  subscriptionId: string
): Promise<Price[]> {
  // 1) Find the USD price point ID for the base price
  const usdPricePointId = await findSubscriptionPricePointId(
    baseUsdPrice,
    "USA",
    subscriptionId
  );

  // 2) Get ALL equivalent price points across ALL territories in one call
  const equalizationsResponse = await api.GET(
    "/v1/subscriptionPricePoints/{id}/equalizations",
    {
      params: {
        path: { id: usdPricePointId },
        query: {
          "fields[subscriptionPricePoints]": ["customerPrice", "territory"],
          include: ["territory"],
          limit: 8000,
        },
      },
    }
  );

  // 3) Transform to our Price[] format
  const prices: Price[] = equalizationsResponse.data.data.map((item: any) => ({
    price: item.attributes.customerPrice,
    territory: item.relationships.territory.data.id,
  }));

  return prices;
}
```

### Phase 1: Apple Pricing Strategy for Subscriptions

#### Key Implementation Steps

```typescript
// Implementation using equalizations endpoint
if (selectedItem.type === "subscription") {
  // Find the subscription in the state
  const subscription = findSubscriptionInState(appStoreState, selectedItem.id);

  // Build prices using the equalizations approach
  const prices = await buildSubscriptionPricesWithEqualizations(
    basePrice,
    subscription.apiId
  );

  // Update subscription prices in state
  subscription.prices = prices;
  return appStoreState;
}
```

### Phase 2: Promotional Offers Support

```typescript
if (selectedItem.type === "offer") {
  // Find parent subscription and the specific offer
  const { subscription, offer } = findOfferInState(
    appStoreState,
    selectedItem.id
  );

  // Build prices using parent subscription's equalizations
  const prices = await buildSubscriptionPricesWithEqualizations(
    basePrice,
    subscription.apiId
  );

  // Filter to only available territories for this offer
  const availablePrices = prices.filter(
    (price) => offer.availableTerritories?.includes(price.territory) ?? true
  );

  // Update offer prices
  offer.prices = availablePrices;
  return appStoreState;
}
```

## Technical Challenges & Solutions

### Challenge 1: Finding Equivalent Price Points ✅ SOLVED

**Problem**: How to find equivalent price points across territories efficiently
**Solution**: Use the `/v1/subscriptionPricePoints/{id}/equalizations` endpoint for single-call access to all territories

### Challenge 2: Price Point Availability ✅ SOLVED

**Problem**: Not all price points may be available for all territories
**Solution**: The equalizations endpoint automatically handles this - it only returns territories where the price point is available

### Challenge 3: Performance with Many Territories ✅ SOLVED

**Problem**: API calls for each territory could be slow
**Solution**: Equalizations endpoint provides all data in one call, dramatically improving performance

## Recommended Implementation Plan

### Step 1: Extend `applyPricing` Function

```typescript
if (selectedItem.type === "subscription") {
  // Find the subscription in the state
  const subscription = findSubscriptionInState(appStoreState, selectedItem.id);

  // Build prices using the equalizations approach
  const prices = await buildSubscriptionPricesWithEqualizations(
    basePrice,
    subscription.apiId // Internal Apple ID
  );

  // Update subscription prices in state
  subscription.prices = prices;
  return appStoreState;
}
```

### Step 2: Handle Promotional Offers

```typescript
if (selectedItem.type === "offer") {
  // Find parent subscription and the specific offer
  const { subscription, offer } = findOfferInState(
    appStoreState,
    selectedItem.id
  );

  // Build prices using parent subscription's equalizations
  const prices = await buildSubscriptionPricesWithEqualizations(
    basePrice,
    subscription.apiId
  );

  // Filter to only available territories for this offer
  const availablePrices = prices.filter(
    (price) => offer.availableTerritories?.includes(price.territory) ?? true
  );

  // Update offer prices
  offer.prices = availablePrices;
  return appStoreState;
}
```

### Step 3: Add Progress Tracking

- Show progress during price point fetching
- Display current territory being processed
- Provide estimates for completion time

### Step 4: Error Handling & Validation

- Handle missing price points gracefully
- Provide suggestions for alternative prices
- Validate final pricing before state update

## Integration with Existing Systems

### Diff Service Integration

The existing diff service (`diff-service.ts`) will need updates to handle subscription pricing changes. The service should:

- Compare old vs new `prices` arrays
- Generate appropriate API calls for subscription price updates
- Handle promotional offer price changes

### Apply Service Integration

The apply service (`apply-service.ts`) should use existing subscription pricing APIs:

- `createSubscriptionPrice` for new prices
- `updateSubscriptionPrice` for price changes
- Batch operations where possible

## Testing Strategy

### Unit Tests

- Test price point matching logic
- Test equalizations endpoint integration
- Test error handling for missing price points
- Test state updates for subscriptions and offers

### Integration Tests

- Test with real Apple Store Connect APIs
- Test with various territory configurations
- Test performance with large numbers of territories

## Success Metrics

1. **Functionality**: Users can set subscription prices with single USD input
2. **Performance**: Price calculation completes within reasonable time
3. **Accuracy**: Generated prices match equivalent Apple price points
4. **Robustness**: Handles missing data and API errors gracefully

## Future Enhancements

1. **Bulk Pricing**: Set prices for multiple subscriptions simultaneously
2. **Price Tier Optimization**: Suggest optimal price tiers based on market data
3. **Cross-Territory Analytics**: Track pricing performance across territories

## Conclusion

The implementation is highly feasible using the equalizations endpoint. The main work involves:

1. **Extending the pricing logic** to handle subscriptions and offers
2. **Leveraging the equalizations endpoint** for efficient territory coverage
3. **Following established patterns** from IAP and app pricing
4. **Adding proper error handling** and user feedback

The project already has all the necessary building blocks - this implementation will primarily involve orchestrating existing capabilities in a new way to handle the subscription pricing model.

## 🎯 IMPLEMENTATION PRIORITY

**HIGH PRIORITY**: The discovery of the equalizations endpoint makes subscription pricing implementation much simpler and more efficient than originally planned.

**Recommended Next Steps**:

1. ✅ **COMPLETED**: Research and validate equalizations endpoint
2. 🔄 **IN PROGRESS**: Update implementation plan to use equalizations approach
3. 📋 **NEXT**: Implement `buildSubscriptionPricesWithEqualizations` function
4. 🧪 **TESTING**: Test with real subscription data
5. 🚀 **DEPLOY**: Integrate into main pricing flow

**Estimated Effort**: Reduced from 2-3 weeks to 1-2 weeks due to equalizations endpoint discovery.
