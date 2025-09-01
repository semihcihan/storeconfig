## IDEAS TODOs

- can't create new version
  warn: PATCH /v1/appStoreVersions/{id} failed with non-retryable error on attempt 1:
  {
  errors: [
  {
  id: 'f491fc11-5b64-4901-809f-8ff607069a7c',
  status: '409',
  code: 'ENTITY_ERROR.ATTRIBUTE.INVALID.INVALID_STATE',
  title: 'An attribute value is not acceptable for the current resource state.',
  detail: "The attribute 'versionString' can not be modified.",
  source: { pointer: '/data/attributes/versionString' }
  }
  ]
  }
  error: Apply failed Failed to update app store version: The attribute 'versionString' can not be modified.
  Error: Failed to update app store version: The attribute 'versionString' can not be modified.
  at new ContextualError (/Users/semihcihan/development/workspace/developer-tool/src/helpers/error-handling-helpers.ts:36:42)
  at updateAppStoreVersion (/Users/semihcihan/development/workspace/developer-tool/src/domains/versions/api-client.ts:86:11)
  at processTicksAndRejections (node:internal/process/task_queues:95:5)
  at async AppStoreVersionService.updateVersion (/Users/semihcihan/development/workspace/developer-tool/src/domains/versions/service.ts:56:22)
  at async AppStoreVersionService.handleVersionString (/Users/semihcihan/development/workspace/developer-tool/src/domains/versions/service.ts:151:7)
  at async AppStoreVersionService.applyVersionMetadata (/Users/semihcihan/development/workspace/developer-tool/src/domains/versions/service.ts:122:7)
  at async executeAction (/Users/semihcihan/development/workspace/developer-tool/src/services/apply-service.ts:127:7)
  at async apply (/Users/semihcihan/development/workspace/developer-tool/src/services/apply-service.ts:392:5)
  at async Object.handler (/Users/semihcihan/development/workspace/developer-tool/src/commands/apply.ts:120:7)

- use builtin mw instead of custom

- improve logging on showAction by gathering
  improve error logging when thrown

# Notes for documentation

- No start date and end date support when applying, when fetching we only fetch the active ones
- Worldwide

# V2

- add new fields to support
  - age rating
  - app category
  - content rights
  - privacy questions (not available on app store connect api yet)
- submitting, handling statuses
- start end dates, scheduling on apply too
- promo offers
- billing grace period
- google play support
