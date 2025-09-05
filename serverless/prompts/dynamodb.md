Create a dynamodb resource in serverless.yml.
Our application will have a dynamodb table with the prefix store-config-table (service name) and a suffix of the environment.
The primary key attribute will be named pk and the sort key will be named sk.
The first global secondary index will use attribute names gsiPk and gsiSk.
And the other global secondary index will use attribute names gsi2PK and gsi2SK.

For now it should support these data types and access patterns

1. A record for each user with these attributes

- userId
- email
- name
- apiKey
- isActive
- pCustomerId
- pSubscriptionId
- pk: "{userId}"
- sk: "user" (hard coded value)
- gsiPk: "{apiKey}" (we need to be able to query by api key to identify incoming requests)
- gsiSk: "api-key" (hard coded value)
- gsi2Pk: "{pCustomerId}"
- gsi2Sk: "customer"

2. Get a user record by apiKey

To support this pattern we'll query using gsiPk & gsiSk

3. Get a user record by pCustomerId

To support this pattern we'll query using gsi2Pk & gsi2Sk



Do not create any functions yet.
You can create a README file in serverless folder describing the aws resources and how they will be used, deployed etc.
Do not write any tests yet!
Make sure both lambda functions have access to read/write the dynamodb table
