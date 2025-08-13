## IDEAS TODOs

- analyze pricing
- test pricing
- auth error, token expired
  info: ✅ Selected: offer "FREE_TRIAL Introductory Offer"
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
