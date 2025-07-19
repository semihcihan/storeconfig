# Introductory Offer Implementation Research

## Overview

This document contains comprehensive research for implementing introductory offer apply functions in the App Store Sync CLI tool. The research covers Apple's API specifications, our current implementation status, and the required changes to support introductory offer management.

## Current Implementation Status

### Existing Actions

Currently, we have two actions defined for introductory offers:

- `CREATE_INTRODUCTORY_OFFER`
- `DELETE_INTRODUCTORY_OFFER`

These actions are defined in `src/models/diff-plan.ts` and are used in `src/services/diff-service.ts` for generating plans, but the actual implementation in `src/services/apply-service.ts` is empty (just `break;` statements).

### Current Data Model

Our introductory offer model in `src/models/app-store.ts` supports three types:

1. **PAY_AS_YOU_GO** - Pay per period for a specific number of periods
2. **PAY_UP_FRONT** - Pay once for a specific duration
3. **FREE** - Free trial for a specific duration

## Apple API Analysis

### Available Endpoints

#### 1. Create Introductory Offer

- **Endpoint**: `POST /v1/subscriptionIntroductoryOffers`
- **Operation**: `subscriptionIntroductoryOffers_createInstance`
- **Request Schema**: `SubscriptionIntroductoryOfferCreateRequest`
- **Response**: `SubscriptionIntroductoryOfferResponse` (201 status)

#### 2. Update Introductory Offer

- **Endpoint**: `PATCH /v1/subscriptionIntroductoryOffers/{id}`
- **Operation**: `subscriptionIntroductoryOffers_updateInstance`
- **Request Schema**: `SubscriptionIntroductoryOfferUpdateRequest`
- **Response**: `SubscriptionIntroductoryOfferResponse` (200 status)

#### 3. Delete Introductory Offer

- **Endpoint**: `DELETE /v1/subscriptionIntroductoryOffers/{id}`
- **Operation**: `subscriptionIntroductoryOffers_deleteInstance`
- **Response**: 204 (no content)

#### 4. Fetch Introductory Offers

- **Endpoint**: `GET /v1/subscriptions/{id}/introductoryOffers`
- **Operation**: `subscriptions_introductoryOffers_getToManyRelated`
- **Response**: `SubscriptionIntroductoryOffersResponse`

### Required API Parameters

#### Create Request Structure

```json
{
  "data": {
    "type": "subscriptionIntroductoryOffers",
    "attributes": {
      "startDate": "2024-01-01", // Optional - null for immediate start
      "endDate": "2024-12-31", // Optional - null for no end date
      "duration": "ONE_MONTH", // Required for PAY_UP_FRONT and FREE
      "offerMode": "PAY_AS_YOU_GO", // Required: PAY_AS_YOU_GO, PAY_UP_FRONT, FREE_TRIAL
      "numberOfPeriods": 3 // Required for PAY_AS_YOU_GO
    },
    "relationships": {
      "subscription": {
        "data": {
          "type": "subscriptions",
          "id": "subscription-id"
        }
      },
      "territory": {
        "data": {
          "type": "territories",
          "id": "territory-id"
        }
      },
      "subscriptionPricePoint": {
        "data": {
          "type": "subscriptionPricePoints",
          "id": "price-point-id"
        }
      }
    }
  }
}
```

#### Update Request Structure (We won't use update as our end date is always null)

```json
{
  "data": {
    "type": "subscriptionIntroductoryOffers",
    "id": "offer-id",
    "attributes": {
      "endDate": "2024-12-31" // Only endDate can be updated
    }
  }
}
```

## Implementation Strategy

### Action Analysis

**Current Actions Are Sufficient**: The two existing actions (`CREATE_INTRODUCTORY_OFFER` and `DELETE_INTRODUCTORY_OFFER`) are adequate for our needs. We don't need a third action because:

1. **Apple's API Limitation**: The update endpoint only allows updating the `endDate` field, which is not a common use case for our tool.
2. **Our Current Strategy**: The diff service already implements a "delete and recreate" strategy for introductory offers, which is simpler and more reliable.
3. **Complexity Management**: Adding an update action would complicate the logic without significant benefits.

### Required Services

#### 1. Introductory Offer Service (`src/services/apply/introductory-offer-service.ts`)

This service will handle:

- Creating new introductory offers
- Deleting existing introductory offers
- Mapping between our model and Apple's API format
- Territory and price point resolution

#### 2. API Client Functions

We need to add these functions to `src/domains/subscriptions/api-client.ts`:

- `createSubscriptionIntroductoryOffer()`
- `deleteSubscriptionIntroductoryOffer()`

### Key Implementation Challenges (Already Solved!)

Great news! All the major implementation challenges have already been solved in the existing subscription implementation. We can reuse the same patterns and utilities:

#### 1. Territory Mapping ✅ **SOLVED**

- **Existing Solution**: `validateTerritoryCode()` function in `src/helpers/id-encoding-helpers.ts`
- **Usage**: Territory codes (e.g., "USA", "CAN") are directly used as territory IDs in Apple's API
- **Implementation**: No mapping needed - territory codes are the same as territory IDs

#### 2. Price Point Resolution ✅ **SOLVED**

- **Existing Solution**: `findSubscriptionPricePointId()` function in `src/services/apply/subscription-pricing-service.ts`
- **API**: `fetchAllSubscriptionPricePoints()` in `src/domains/subscriptions/api-client.ts`
- **Cache**: `pricePointsCache` Map for performance optimization
- **Pattern**:
  ```typescript
  const pricePointId = await findSubscriptionPricePointId(
    price,
    territory,
    subscriptionId
  );
  ```

#### 3. Subscription ID Resolution ✅ **SOLVED**

- **Existing Solution**: `findSubscriptionId()` function in `src/services/apply/subscription-pricing-service.ts`
- **Pattern**:
  ```typescript
  const subscriptionId = findSubscriptionId(
    subscriptionProductId,
    newlyCreatedSubscriptions,
    currentSubscriptionGroupsResponse
  );
  ```

#### 4. Date Handling ✅ **CONFIGURED**

- **Strategy**: Set `startDate` and `endDate` to `null` for immediate start and no end date
- **Implementation**: Simple null assignment in the request payload

#### 5. Offer Type Mapping ✅ **SOLVED**

- **Updated**: Changed our model to use `FREE_TRIAL` instead of `FREE` to match Apple's API
- **Result**: No mapping needed - all types are now identical between our model and Apple's API
- **Types**: `PAY_AS_YOU_GO`, `PAY_UP_FRONT`, and `FREE_TRIAL` are all identical

### Implementation Flow (Reusing Existing Solutions)

#### Create Introductory Offer

1. **Resolve subscription ID** using existing `findSubscriptionId()` function
2. **For each territory/price combination** in the offer:
   - Use territory code directly (no mapping needed)
   - Find price point using existing `findSubscriptionPricePointId()` function (with caching)
   - Create introductory offer via API
3. Handle any errors and provide meaningful feedback

#### Delete Introductory Offer

1. **Fetch existing introductory offers** using existing `fetchSubscriptionIntroductoryOffers()` function
2. **Match offers** based on type, duration/numberOfPeriods, and territories
3. **Delete matched offers** via API
4. Handle any errors and provide meaningful feedback

#### Key Reusable Components

- **Subscription ID Resolution**: `findSubscriptionId()` from subscription-pricing-service
- **Price Point Resolution**: `findSubscriptionPricePointId()` with built-in caching
- **Territory Validation**: `validateTerritoryCode()` from id-encoding-helpers
- **API Client**: Existing subscription API client functions
- **Error Handling**: Follow existing patterns from subscription services

### Error Handling Considerations

#### Common Error Scenarios

1. **Territory Not Found**: Invalid territory code in our model
2. **Price Point Not Found**: No matching price point for the specified price
3. **Subscription Not Found**: Invalid product ID
4. **Duplicate Offers**: Attempting to create offers that already exist
5. **API Rate Limits**: Apple's API has rate limiting

#### Error Recovery Strategies

1. **Graceful Degradation**: Continue with other offers if one fails
2. **Detailed Logging**: Log specific error details for debugging
3. **User Feedback**: Provide clear error messages about what failed and why

### Testing Strategy

#### Unit Tests

- Test territory code to ID mapping
- Test price point resolution logic
- Test offer type mapping
- Test error handling scenarios

#### Integration Tests

- Test full create/delete flows with mock API responses
- Test with real API calls in development environment
- Test error scenarios with invalid data

#### Test Data

- Use existing test data from `src/services/diff-service.test.ts`
- Create additional test cases for edge cases
- Test with various territory and price combinations

## Dependencies and Imports

### Required Imports

```typescript
import { logger } from "../../utils/logger";
import {
  findSubscriptionId,
  findSubscriptionPricePointId,
} from "./subscription-pricing-service";
import { fetchSubscriptionIntroductoryOffers } from "../../domains/subscriptions/api-client";
import { IntroductoryOfferSchema } from "../../models/app-store";
import type { components } from "../../generated/app-store-connect-api";
import type { SubscriptionGroupsResponse } from "../../domains/subscriptions/mapper";
```

### API Types

```typescript
type SubscriptionIntroductoryOfferCreateRequest =
  components["schemas"]["SubscriptionIntroductoryOfferCreateRequest"];
type SubscriptionIntroductoryOfferResponse =
  components["schemas"]["SubscriptionIntroductoryOfferResponse"];
type SubscriptionIntroductoryOffersResponse =
  components["schemas"]["SubscriptionIntroductoryOffersResponse"];
```

## Integration Points

### 1. Apply Service Integration

Update `src/services/apply-service.ts` to call the new introductory offer service functions.

### 2. Plan Service Integration

Update `src/services/plan-service.ts` to provide better logging for introductory offer actions.

### 3. Error Handling Integration

Integrate with existing error handling patterns in the codebase.

### 4. Testing Integration

Add tests to existing test suites and ensure they follow the established patterns.

## Future Considerations

### Potential Enhancements

1. **Update Support**: If Apple adds more updateable fields in the future
2. **Bulk Operations**: Optimize for handling multiple offers efficiently
3. **Validation**: Add more sophisticated validation for offer configurations
4. **Caching**: Cache territory and price point mappings for performance

### Monitoring and Observability

1. **Metrics**: Track success/failure rates of offer operations
2. **Logging**: Comprehensive logging for debugging and audit trails
3. **Health Checks**: Verify API connectivity and rate limit status

## Conclusion

The implementation of introductory offer apply functions is **much simpler than initially expected**! All the major technical challenges have already been solved in the existing subscription implementation:

### What We Can Reuse ✅

- **Subscription ID Resolution**: `findSubscriptionId()` function
- **Price Point Resolution**: `findSubscriptionPricePointId()` with caching
- **Territory Handling**: Direct use of territory codes (no mapping needed)
- **API Patterns**: Existing subscription API client patterns
- **Error Handling**: Established error handling patterns

### What We Need to Implement 🔧

- **New API Client Functions**: `createSubscriptionIntroductoryOffer()` and `deleteSubscriptionIntroductoryOffer()`
- **Introductory Offer Service**: Simple service that orchestrates the existing utilities
- **Apply Service Integration**: Connect the new service to the existing apply flow

### Implementation Complexity: **LOW** 🟢

The main work involves:

1. Creating 2-3 new API client functions
2. Creating a simple service that reuses existing utilities
3. Integrating with the existing apply service
4. Adding appropriate tests

This is a much more straightforward implementation than initially anticipated, thanks to the excellent existing infrastructure in the subscription services.
