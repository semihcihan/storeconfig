## IDEAS TODOs

- Create easy pricing changes

  - cache

- beautify logs
  error: Set-price failed ❌ Validation failed! {"context":{"result":{"_error":{"issues":[{"code":"custom","message":"Subscription 'new_product_id_10123' is available in territory 'GBR' but has no price defined for this territory","path":["subscriptionGroups",0,"subscriptions",0,"prices"]}],"name":"ZodError"},"error":{"issues":[{"code":"custom","message":"Subscription 'new_product_id_10123' is available in territory 'GBR' but has no price defined for this territory","path":["subscriptionGroups",0,"subscriptions",0,"prices"]}],"name":"ZodError"},"success":false}},"errors":[{"code":"custom","message":"Subscription 'new_product_id_10123' is available in territory 'GBR' but has no price defined for this territory","path":["subscriptionGroups",0,"subscriptions",0,"prices"]}],"name":"ContextualError","originalError":{"issues":[{"code":"custom","message":"Subscription 'new_product_id_10123' is available in territory 'GBR' but has no price defined for this territory","path":["subscriptionGroups",0,"subscriptions",0,"prices"]}],"name":"ZodError"},"stack":"ZodError: [\n {\n \"code\": \"custom\",\n \"message\": \"Subscription 'new_product_id_10123' is available in territory 'GBR' but has no price defined for this territory\",\n \"path\": [\n \"subscriptionGroups\",\n 0,\n \"subscriptions\",\n 0,\n \"prices\"\n ]\n }\n]\n at Object.get error [as error] (/Users/semihcihan/development/workspace/developer-tool/node_modules/zod/v3/types.cjs:45:31)\n at validateAppStoreModel (/Users/semihcihan/development/workspace/developer-tool/src/utils/validation-helpers.ts:40:62)\n at Object.handler (/Users/semihcihan/development/workspace/developer-tool/src/commands/set-price.ts:34:50)\n at /Users/semihcihan/development/workspace/developer-tool/node_modules/yargs/build/index.cjs:1:8993\n at j (/Users/semihcihan/development/workspace/developer-tool/node_modules/yargs/build/index.cjs:1:4956)\n at _.handleValidationAndGetResult (/Users/semihcihan/development/workspace/developer-tool/node*modules/yargs/build/index.cjs:1:8962)\n at *.applyMiddlewareAndGetResult (/Users/semihcihan/development/workspace/developer-tool/node*modules/yargs/build/index.cjs:1:9604)\n at *.runCommand (/Users/semihcihan/development/workspace/developer-tool/node_modules/yargs/build/index.cjs:1:7231)\n at te.[runYargsParserAndExecuteCommands] (/Users/semihcihan/development/workspace/developer-tool/node_modules/yargs/build/index.cjs:1:58539)\n at te.parse (/Users/semihcihan/development/workspace/developer-tool/node_modules/yargs/build/index.cjs:1:40478)"}

- info: ✅ Selected: offer "FREE_TRIAL Introductory Offer"
  warn: GET /v1/apps/{id}/subscriptionGroups failed with non-retryable error on attempt 1: {"errors":[{"code":"NOT_AUTHORIZED","detail":"Provide a properly configured and signed bearer token, and make sure that it has not expired. Learn more about Generating Tokens for API Requests https://developer.apple.com/go/?id=api-generating-tokens","status":"401","title":"Authentication credentials are missing or invalid."}]}
  error: Interactive pricing failed {"errors":[{"code":"NOT_AUTHORIZED","detail":"Provide a properly configured and signed bearer token, and make sure that it has not expired. Learn more about Generating Tokens for API Requests https://developer.apple.com/go/?id=api-generating-tokens","status":"401","title":"Authentication credentials are missing or invalid."}]}
  info: Restored file from memory backup
  error: Set-price failed {"errors":[{"code":"NOT_AUTHORIZED","detail":"Provide a properly configured and signed bearer token, and make sure that it has not expired. Learn more about Generating Tokens for API Requests https://developer.apple.com/go/?id=api-generating-tokens","status":"401","title":"Authentication credentials are missing or invalid."}]}

# Notes for documentation

- No start date and end date support, will be overridden (TELL THIS TO USER)
- Worldwide

# V2

- other platforms
- intro offers
- start end dates, scheduling
- billing grace period
- add new fields to support
  - age rating
  - app category
  - content rights
  - privacy questions (not available on app store connect api yet)
