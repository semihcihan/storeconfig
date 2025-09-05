Fill the authorizer lambda code to authenticate requests using api key from a header named "X-StoreConfig-ApiKey".
The lambda should query dynamodb using the api key value and if it doesn't find a record with that api key it should reject the request.

Do not write any tests yet.

The authorizer lambda is using event.authorizationToken but I can't see how this field gets populated by the "X-StoreConfig-ApiKey" header?