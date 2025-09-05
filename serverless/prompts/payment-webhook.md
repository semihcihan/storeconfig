Create a lambda function with a public url that will handle requests from paddle (the payment system we use) and serve as the webhook.

For now just log the incoming request and return success.
Do not write any tests.
The function should have read/write access to dynamodb, grant those permissions.
