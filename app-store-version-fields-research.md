# App Store Version Fields Implementation Guide

## Overview

Implementation guide for adding new fields support to the App Store Connect API integration. This document provides the schema definitions, service requirements, and implementation strategy for supporting app store version metadata fields.

## Schema Definitions

### AppStoreLocalizationSchema

```typescript
export const AppStoreLocalizationSchema = z.object({
  locale: LocaleCodeSchema,
  // App info fields (app-level)
  name: z.string().optional(),
  subtitle: z.string().optional(),
  privacyPolicyUrl: z.string().url().optional(),
  privacyChoicesUrl: z.string().url().optional(),
  // Version fields (version-specific)
  description: z.string().optional(),
  keywords: z.string().optional(),
  marketingUrl: z.string().url().optional(),
  promotionalText: z.string().optional(),
  supportUrl: z.string().url().optional(),
  whatsNew: z.string().optional(),
});
```

### AppInfoMetadataSchema

```typescript
export const AppInfoMetadataSchema = z.object({
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
```

### Updated AppStoreModelSchema

```typescript
export const AppStoreModelSchema = z.object({
  schemaVersion: z.string(),
  appId: z.string(),
  pricing: PriceScheduleSchema.optional(),
  availableTerritories: z.array(TerritoryCodeSchema),
  inAppPurchases: z.array(InAppPurchaseSchema),
  subscriptionGroups: z.array(SubscriptionGroupSchema),
  // NEW: Version string at root level
  versionString: z.string().optional(),
  // NEW: Unified localizations at root level
  localizations: z.array(AppStoreLocalizationSchema).optional(),
  // NEW: App info metadata (categories, content rights)
  appInfoMetadata: AppInfoMetadataSchema.optional(),
});
```

## Required Services

### New Services to Create

1. **AppStoreVersionService** - Handle version CRUD operations
2. **AppStoreVersionLocalizationService** - Handle localization CRUD operations
3. **AppInfoLocalizationService** - Handle app info localization CRUD operations
4. **AppInfoService** - Handle app info and category relationships

### Key Operations Required

- Create new app store version
- Update existing version (let API handle state validation)
- Create/update app store version localizations
- Create/update app info localizations
- Handle app info and category relationships
- Error handling for immutable versions (409 responses)

## API Endpoints

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

### State Validation Strategy

We will let the API handle version state validation rather than implementing local checks:

```typescript
// Let API handle validation - no local state checking
async function updateVersion(versionId: string, data: any) {
  try {
    return await api.patch(`/v1/appStoreVersions/${versionId}`, data);
  } catch (error) {
    if (error.status === 409) {
      // Get current state for better error message
      const currentVersion = await getVersion(versionId);
      throw new Error(
        `Cannot update version: Currently in state ${currentVersion.appVersionState}`
      );
    }
    throw error;
  }
}
```

**Rationale:**

- We need to fetch current version state anyway for context
- Apple's API is the authoritative source for what's updatable
- Future-proof: automatically handles new states Apple might add
- Simpler code: no local state validation logic to maintain

### Version Update Constraints

- Versions in certain states (like `IN_REVIEW`, `ACCEPTED`, `PENDING_APPLE_RELEASE`) cannot be updated
- Only versions in `PREPARE_FOR_SUBMISSION` or `READY_FOR_REVIEW` states can typically be modified
- Once a version is submitted or approved, most fields become read-only

## Error Handling

### Version Update Errors

- **409 Conflict**: Version in immutable state
- **422 Unprocessable**: Invalid metadata
- **404 Not Found**: Version doesn't exist

### User-Friendly Error Messages

- "Cannot update version: Currently in review"
- "Cannot update version: Already approved and live"
- "Version not found: Create a new version first"

## Implementation Phases

### Phase 1: Schema and Basic Services

1. Update `AppStoreModelSchema` with unified localizations and versionString at root
2. Create `AppStoreVersionService` for version-specific operations
3. Create `AppInfoService` for app-level metadata operations
4. Add unified localization handling that routes to appropriate APIs

### Phase 2: Error Handling

1. Add error handling for immutable versions (409 responses)
2. Create user-friendly error messages
3. Handle API validation errors gracefully
4. Handle partial failures (app info succeeds, version fails)

### Phase 3: Integration

1. Integrate with existing `apply-service.ts`
2. Update diff service to handle unified localizations
3. Add version metadata to fetch/apply workflow
4. Optimize API calls to minimize requests

### Phase 4: Testing and Validation

1. Test with various version states
2. Validate error scenarios
3. Test unified localization handling
4. Verify API call optimization

## Implementation Notes

### Single Version Approach

- Store only current version information
- No historical version tracking
- Clear error messages when version cannot be updated

### Apple Terminology

Use Apple's exact field names:

- `versionString` (not `version`)
- `privacyPolicyUrl` (not `privacy url`)
- `privacyChoicesUrl` (not `User Privacy Choices url`)
- `contentRightsDeclaration` (not `content rights`)

### Schema Simplification

**User-Friendly Design:**

- Single `localizations` array at root level for easier JSON editing
- `versionString` at root level for quick access
- Removed complex version-specific fields (reviewType, releaseType, earliestReleaseDate) that are rarely used
- Unified localization schema combines app info and version fields in one place

**Internal Service Separation:**

- Services will still handle AppInfo and AppStoreVersion APIs separately
- Actions will be optimized to minimize API calls
- Schema provides user simplicity while maintaining API compatibility

### Field Coverage

All requested fields are supported:

- ✅ **Unified localizations** (at root level):
  - App info fields: name, subtitle, privacyPolicyUrl, privacyChoicesUrl
  - Version fields: description, keywords, marketingUrl, promotionalText, supportUrl, whatsNew
- ✅ **App info metadata**: primaryCategory, secondaryCategory, subcategories, contentRightsDeclaration
- ✅ **Version metadata**: versionString (at root level)

**Simplified Schema Benefits:**

- Single localizations array for easier editing
- Version string at root level for quick access
- Removed complex version-specific fields (reviewType, releaseType, earliestReleaseDate) for simplicity

### API Limitations

1. **State-based restrictions**: Cannot update versions in certain states
2. **Multiple API endpoints**: Need to handle both AppStoreVersion and AppInfo endpoints
3. **Version limits**: Apple typically allows only 2 versions (live + new)
