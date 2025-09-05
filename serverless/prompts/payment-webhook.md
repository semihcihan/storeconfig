Create a lambda function with a public url that will handle requests from paddle (the payment system we use) and serve as the webhook.

For now just log the incoming request and return success.
Do not write any tests.
The function should have read/write access to dynamodb, grant those permissions.

Add business logic to payment webhook lambda handler so that it can parse and validate event notifications coming from paddle. We only want to listen for subscription.canceled and subscription.created events for now.
Do not write any tests yet. The secret key to validate requests from paddle can be assumed to be found in an env variable named PADDLE_WEBHOOK_SECRET_KEY. Add this to serverless config so lambda can access it.

Handle the subscription created event by creating the user record in dynamodb.
Example event payload for subscription created event can be found in paddle-webhook-event-examples directory.
We should create a record in dynamodb with these values

- userId: this is a uuid we assign for the user
- email: we should pull this value through paddle's api using the customerId from paddle event
- name: same as email
- apiKey: this is an api key we generate for the user, it can be a uuid
- isActive: when subscription is created user should become active
- pCustomerId: customerId from paddle event
- pSubscriptionId: subscription id from paddle event
- pk: "{userId}"
- sk: "user" (hard coded value)
- gsiPk: "{apiKey}" (we need to be able to query by api key to identify incoming requests)
- gsiSk: "api-key" (hard coded value)
- gsi2Pk: "{pCustomerId}"
- gsi2Sk: "customer"
