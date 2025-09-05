# Store Config Serverless Application

This serverless application provides API endpoints for managing App Store Connect configurations with user authentication and data persistence.

## AWS Resources

### DynamoDB Table

**Table Name**: `store-config-table-{environment}`

The application uses a single DynamoDB table to store user data and support various access patterns through Global Secondary Indexes (GSIs).

#### Table Schema

**Primary Key**:
- Partition Key (pk): String
- Sort Key (sk): String

**Global Secondary Indexes**:
1. **gsi-api-key**: For querying users by API key
   - Partition Key: gsiPk (String)
   - Sort Key: gsiSk (String)

2. **gsi2-customer**: For querying users by customer ID
   - Partition Key: gsi2Pk (String)
   - Sort Key: gsi2Sk (String)

#### Data Access Patterns

##### 1. User Records
Each user record contains the following attributes:
- `userId`: Unique user identifier
- `email`: User's email address
- `name`: User's display name
- `apiKey`: API key for authentication
- `isActive`: Boolean flag for user status
- `pCustomerId`: Payment processor customer ID
- `pSubscriptionId`: Payment processor subscription ID
- `pk`: `"{userId}"` (partition key)
- `sk`: `"user"` (sort key - hardcoded)
- `gsiPk`: `"{apiKey}"` (for API key lookups)
- `gsiSk`: `"api-key"` (hardcoded)
- `gsi2Pk`: `"{pCustomerId}"` (for customer lookups)
- `gsi2Sk`: `"customer"` (hardcoded)

##### 2. Query by API Key
To retrieve a user by their API key:
```javascript
// Query the gsi-api-key index
const params = {
  TableName: 'store-config-table-dev',
  IndexName: 'gsi-api-key',
  KeyConditionExpression: 'gsiPk = :apiKey AND gsiSk = :sk',
  ExpressionAttributeValues: {
    ':apiKey': 'user-api-key-here',
    ':sk': 'api-key'
  }
};
```

##### 3. Query by Customer ID
To retrieve a user by their payment processor customer ID:
```javascript
// Query the gsi2-customer index
const params = {
  TableName: 'store-config-table-dev',
  IndexName: 'gsi2-customer',
  KeyConditionExpression: 'gsi2Pk = :customerId AND gsi2Sk = :sk',
  ExpressionAttributeValues: {
    ':customerId': 'customer-id-here',
    ':sk': 'customer'
  }
};
```

### Lambda Functions

#### 1. Apply Function
- **Handler**: `functions/apply.handler`
- **Purpose**: Apply changes to App Store Connect
- **HTTP Endpoint**: `POST /apply`
- **Authorization**: Custom Lambda authorizer
- **Timeout**: 30 seconds
- **Memory**: 1024 MB

#### 2. Authorizer Function
- **Handler**: `functions/authorizer.handler`
- **Purpose**: Custom Lambda authorizer for API Gateway
- **Type**: TOKEN
- **Timeout**: 10 seconds
- **Memory**: 256 MB

### IAM Permissions

Both Lambda functions have the following DynamoDB permissions:
- `dynamodb:Query` - Query table and indexes
- `dynamodb:Scan` - Scan table (if needed)
- `dynamodb:GetItem` - Retrieve individual items
- `dynamodb:PutItem` - Create new items
- `dynamodb:UpdateItem` - Update existing items
- `dynamodb:DeleteItem` - Delete items

Permissions are scoped to:
- Main table: `arn:aws:dynamodb:{region}:{accountId}:table/store-config-table-{stage}`
- All indexes: `arn:aws:dynamodb:{region}:{accountId}:table/store-config-table-{stage}/index/*`

## Deployment

### Prerequisites
- AWS CLI configured with appropriate credentials
- Node.js 22.x
- Serverless Framework 3.x

### Environment Configuration
The application uses the following AWS profile: `store-config`

### Deploy Commands

```bash
# Install dependencies
npm install

# Deploy to development
serverless deploy --stage dev

# Deploy to production
serverless deploy --stage prod

# Deploy specific function
serverless deploy function --function apply --stage dev

# Remove all resources
serverless remove --stage dev
```

### Environment Variables
The application automatically uses the following environment-specific configurations:
- **Stage**: Determines the DynamoDB table name suffix
- **Region**: us-east-1
- **Profile**: store-config (AWS CLI profile)

## Table Configuration

### Billing Mode
- **Pay Per Request**: No need to provision capacity, scales automatically

### Backup & Recovery
- **Point-in-Time Recovery**: Enabled for data protection

### Tags
- Environment: `{stage}` (dev, prod, etc.)
- Service: `store-config`

## Security Considerations

1. **API Key Management**: API keys are stored in DynamoDB and used for request authentication
2. **IAM Permissions**: Least privilege principle applied to Lambda functions
3. **Data Encryption**: DynamoDB encryption at rest is enabled by default
4. **Network Security**: API Gateway provides HTTPS endpoints

## Monitoring & Logging

- **CloudWatch Logs**: 14-day retention for Lambda function logs
- **API Gateway Logs**: Available through CloudWatch
- **DynamoDB Metrics**: Available in CloudWatch for monitoring table performance

## Cost Optimization

- **Pay-per-request billing**: Only pay for actual usage
- **ARM64 architecture**: More cost-effective than x86_64
- **Optimized memory allocation**: Functions sized appropriately for their workload
- **Log retention**: Limited to 14 days to control costs
