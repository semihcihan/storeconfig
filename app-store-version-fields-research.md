# App Store Version Fields Research

## Overview

This document contains research findings for adding new fields support to the App Store Connect API integration. The goal is to support additional metadata fields for app store versions including name, description, subtitle, keywords, promotional text, and other metadata.

## Current State Analysis

### Current App Store Model Schema

The current `AppStoreModelSchema` in `src/models/app-store.ts` only supports:

- `schemaVersion`
- `appId`
- `pricing` (optional)
- `availableTerritories`
- `inAppPurchases`
- `subscriptionGroups`

**Missing**: App store version metadata fields like name, description, keywords, etc.

### Current OpenAPI Schema Analysis

#### AppStoreVersion Schema (from openapi.json)

```json
{
  "AppStoreVersion": {
    "attributes": {
      "platform": "Platform",
      "versionString": "string",
      "appStoreState": "AppStoreVersionState (deprecated)",
      "appVersionState": "AppVersionState",
      "copyright": "string",
      "reviewType": "APP_STORE | NOTARIZATION",
      "releaseType": "MANUAL | AFTER_APPROVAL | SCHEDULED",
      "earliestReleaseDate": "date-time",
      "usesIdfa": "boolean (deprecated)",
      "downloadable": "boolean",
      "createdDate": "date-time"
    }
  }
}
```

#### AppStoreVersionLocalization Schema

```json
{
  "AppStoreVersionLocalization": {
    "attributes": {
      "description": "string",
      "locale": "string",
      "keywords": "string",
      "marketingUrl": "uri",
      "promotionalText": "string",
      "supportUrl": "uri",
      "whatsNew": "string"
    }
  }
}
```

#### AppInfoLocalization Schema

```json
{
  "AppInfoLocalization": {
    "attributes": {
      "locale": "string",
      "name": "string",
      "subtitle": "string",
      "privacyPolicyUrl": "string",
      "privacyChoicesUrl": "string",
      "privacyPolicyText": "string"
    }
  }
}
```

## Available Fields for New Support

### App Store Version Level Fields

From the OpenAPI schema, these fields are available at the version level:

- `copyright` - Already supported in create/update requests
- `versionString` - Already supported in create/update requests
- `reviewType` - Already supported in create/update requests
- `releaseType` - Already supported in create/update requests
- `earliestReleaseDate` - Already supported in create/update requests

### App Store Version Localization Fields

These fields are available at the localization level and match our requirements:

- `description` - ✅ Matches "desc" requirement
- `keywords` - ✅ Matches "keywords" requirement
- `marketingUrl` - ✅ Matches "marketing url" requirement
- `promotionalText` - ✅ Matches "promo text" requirement
- `supportUrl` - ✅ Matches "support url" requirement
- `whatsNew` - ✅ Matches "what's new in this version" requirement

### Missing Fields Analysis

Fields from the requirements that are NOT directly available in AppStoreVersion or AppStoreVersionLocalization:

#### Available in AppInfoLocalizations ✅

- `name` - ✅ Available in AppInfoLocalizationCreateRequest/UpdateRequest
- `subtitle` - ✅ Available in AppInfoLocalizationCreateRequest/UpdateRequest
- `privacyPolicyUrl` - ✅ Available in AppInfoLocalizationCreateRequest/UpdateRequest (matches "privacy url")
- `privacyChoicesUrl` - ✅ Available in AppInfoLocalizationCreateRequest/UpdateRequest (matches "User Privacy Choices url")

#### Available via AppInfo Relationships ✅

- `primaryCategory` - ✅ Available via AppInfo relationships
- `secondaryCategory` - ✅ Available via AppInfo relationships
- `primarySubcategoryOne` - ✅ Available via AppInfo relationships
- `primarySubcategoryTwo` - ✅ Available via AppInfo relationships
- `secondarySubcategoryOne` - ✅ Available via AppInfo relationships
- `secondarySubcategoryTwo` - ✅ Available via AppInfo relationships

#### Available via App Update ✅

- `contentRightsDeclaration` - ✅ Available in AppUpdateRequest (matches "content rights")

#### Not Available ❌

- `age rating` - ❌ Available via separate AgeRatingDeclaration relationship

#### Terminology Note

- `version` - ❌ Not available (use `versionString` instead, which is the correct Apple terminology)

## API Endpoints Available

### App Store Versions

- `POST /v1/appStoreVersions` - Create new version
- `GET /v1/appStoreVersions/{id}` - Get version details
- `PATCH /v1/appStoreVersions/{id}` - Update version
- `DELETE /v1/appStoreVersions/{id}` - Delete version

### App Store Version Localizations

- `POST /v1/appStoreVersionLocalizations` - Create localization
- `GET /v1/appStoreVersionLocalizations/{id}` - Get localization
- `PATCH /v1/appStoreVersionLocalizations/{id}` - Update localization
- `DELETE /v1/appStoreVersionLocalizations/{id}` - Delete localization

### App Info Localizations

- `POST /v1/appInfoLocalizations` - Create app info localization
- `GET /v1/appInfoLocalizations/{id}` - Get app info localization
- `PATCH /v1/appInfoLocalizations/{id}` - Update app info localization
- `DELETE /v1/appInfoLocalizations/{id}` - Delete app info localization

### App Infos (for categories)

- `GET /v1/appInfos/{id}` - Get app info with category relationships
- `PATCH /v1/appInfos/{id}` - Update app info (including categories)

## Version State Management

### AppVersionState Values

From the OpenAPI schema:

```typescript
AppVersionState =
  | "ACCEPTED"
  | "DEVELOPER_REJECTED"
  | "IN_REVIEW"
  | "INVALID_BINARY"
  | "METADATA_REJECTED"
  | "PENDING_APPLE_RELEASE"
  | "PENDING_DEVELOPER_RELEASE"
  | "PREPARE_FOR_SUBMISSION"
  | "PROCESSING_FOR_DISTRIBUTION"
  | "READY_FOR_DISTRIBUTION"
  | "READY_FOR_REVIEW"
  | "REJECTED"
  | "REPLACED_WITH_NEW_VERSION"
  | "WAITING_FOR_EXPORT_COMPLIANCE"
  | "WAITING_FOR_REVIEW"
```

### Version Update Constraints

**Critical Finding**: App Store versions have state-based update restrictions:

- Versions in certain states (like `IN_REVIEW`, `ACCEPTED`, `PENDING_APPLE_RELEASE`) cannot be updated
- Only versions in `PREPARE_FOR_SUBMISSION` or `READY_FOR_REVIEW` states can typically be modified
- Once a version is submitted or approved, most fields become read-only

## Implementation Strategy

### 1. Schema Updates Required

#### AppStoreModelSchema Extension

Add new optional fields to support version metadata:

```typescript
export const AppStoreVersionLocalizationSchema = z.object({
  locale: LocaleCodeSchema,
  description: z.string().optional(),
  keywords: z.string().optional(),
  marketingUrl: z.string().url().optional(),
  promotionalText: z.string().optional(),
  supportUrl: z.string().url().optional(),
  whatsNew: z.string().optional(),
});

export const AppInfoLocalizationSchema = z.object({
  locale: LocaleCodeSchema,
  name: z.string().optional(),
  subtitle: z.string().optional(),
  privacyPolicyUrl: z.string().url().optional(),
  privacyChoicesUrl: z.string().url().optional(),
  privacyPolicyText: z.string().optional(),
});

export const AppStoreVersionMetadataSchema = z.object({
  versionString: z.string(),
  copyright: z.string().optional(),
  localizations: z.array(AppStoreVersionLocalizationSchema),
  reviewType: z.enum(["APP_STORE", "NOTARIZATION"]).optional(),
  releaseType: z.enum(["MANUAL", "AFTER_APPROVAL", "SCHEDULED"]).optional(),
  earliestReleaseDate: z.string().datetime().optional(),
});

export const AppInfoMetadataSchema = z.object({
  localizations: z.array(AppInfoLocalizationSchema),
  primaryCategory: z.string().optional(),
  secondaryCategory: z.string().optional(),
  primarySubcategoryOne: z.string().optional(),
  primarySubcategoryTwo: z.string().optional(),
  secondarySubcategoryOne: z.string().optional(),
  secondarySubcategoryTwo: z.string().optional(),
  contentRightsDeclaration: z
    .enum(["DOES_NOT_USE_THIRD_PARTY_CONTENT", "USES_THIRD_PARTY_CONTENT"])
    .optional(),
});

export const AppStoreModelSchema = z.object({
  schemaVersion: z.string(),
  appId: z.string(),
  pricing: PriceScheduleSchema.optional(),
  availableTerritories: z.array(TerritoryCodeSchema),
  inAppPurchases: z.array(InAppPurchaseSchema),
  subscriptionGroups: z.array(SubscriptionGroupSchema),
  // NEW: Add version metadata
  versionMetadata: AppStoreVersionMetadataSchema.optional(),
  // NEW: Add app info metadata
  appInfoMetadata: AppInfoMetadataSchema.optional(),
});
```

### 2. Service Layer Updates

#### New Services Required

1. **AppStoreVersionService** - Handle version CRUD operations
2. **AppStoreVersionLocalizationService** - Handle localization CRUD operations
3. **AppInfoLocalizationService** - Handle app info localization CRUD operations
4. **AppInfoService** - Handle app info and category relationships
5. **VersionStateValidationService** - Validate if version can be updated

#### Key Operations

- Create new app store version
- Update existing version (with state validation)
- Create/update app store version localizations
- Create/update app info localizations
- Handle app info and category relationships
- Handle version state transitions
- Error handling for immutable versions

### 3. Version Management Strategy

#### Single Version Approach

As requested, implement single version management:

- Store only current version information
- No historical version tracking
- Clear error messages when version cannot be updated

#### State Validation Logic

```typescript
const UPDATABLE_STATES = [
  "PREPARE_FOR_SUBMISSION",
  "READY_FOR_REVIEW",
  "DEVELOPER_REJECTED",
  "METADATA_REJECTED",
];

function canUpdateVersion(state: AppVersionState): boolean {
  return UPDATABLE_STATES.includes(state);
}
```

### 4. Error Handling Strategy

#### Version Update Errors

- **409 Conflict**: Version in immutable state
- **422 Unprocessable**: Invalid metadata
- **404 Not Found**: Version doesn't exist

#### User-Friendly Error Messages

- "Cannot update version: Currently in review"
- "Cannot update version: Already approved and live"
- "Version not found: Create a new version first"

## Implementation Phases

### Phase 1: Schema and Basic Services

1. Update `AppStoreModelSchema` with version metadata
2. Create `AppStoreVersionService`
3. Create `AppStoreVersionLocalizationService`
4. Add basic CRUD operations

### Phase 2: State Management

1. Implement version state validation
2. Add error handling for immutable versions
3. Create user-friendly error messages

### Phase 3: Integration

1. Integrate with existing `apply-service.ts`
2. Update diff service to handle version changes
3. Add version metadata to fetch/apply workflow

### Phase 4: Testing and Validation

1. Test with various version states
2. Validate error scenarios
3. Test localization handling

## Open Questions

### 1. Missing Fields ✅ RESOLVED

- `name`, `subtitle`, `privacyPolicyUrl`, `privacyChoicesUrl` are available in AppInfoLocalizations ✅
- `primaryCategory`, `secondaryCategory` and subcategories are available via AppInfo relationships ✅
- `contentRightsDeclaration` is available in AppUpdateRequest ✅
- **ALL requested fields are now supported!** 🎉

### 2. Age Rating

- Age rating is handled via separate `AgeRatingDeclaration` relationship
- Should we include age rating support in this implementation?
  ❌ We won't include age rating declaration for now

### 3. Content Rights ✅ RESOLVED

- `contentRightsDeclaration` is available in AppUpdateRequest ✅
- Should be included in AppInfoMetadataSchema

### 4. Version Naming ✅ RESOLVED

- Use `versionString` (Apple's terminology) instead of `version`
- This is the correct field name in the API

## Recommendations

### Immediate Actions

1. **Start with available fields**: Implement support for fields that are directly available in the API
2. **Focus on both localizations**: Most fields are in `AppStoreVersionLocalization` and `AppInfoLocalization`
3. **Implement state validation**: Critical for preventing update errors
4. **Single version approach**: Keep it simple as requested
5. **Use Apple terminology**: Use `versionString`, `privacyPolicyUrl`, `privacyChoicesUrl`, etc.

### Future Considerations

1. **Missing fields**: Document which fields cannot be supported with current API
2. **Age rating**: Consider separate implementation for age rating declarations
3. **Error handling**: Comprehensive error handling for version state conflicts
4. **Testing**: Extensive testing with different version states

## API Limitations

### Known Limitations

1. **State-based restrictions**: Cannot update versions in certain states
2. **Missing fields**: **ALL requested fields are now available!** 🎉
3. **Relationship complexity**: Age rating requires separate API calls
4. **Version limits**: Apple typically allows only 2 versions (live + new)
5. **Multiple API endpoints**: Need to handle both AppStoreVersion and AppInfo endpoints

### Workarounds

1. **Clear documentation**: Document what can and cannot be updated
2. **State checking**: Always check version state before attempting updates
3. **Graceful degradation**: Skip unsupported fields with clear messaging
4. **User guidance**: Provide clear instructions for version management
