import { APIGatewayTokenAuthorizerEvent, APIGatewayAuthorizerResult } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { QueryCommand } from '@aws-sdk/lib-dynamodb';

const dynamoClient = new DynamoDBClient({});
const tableName = process.env.STORE_CONFIG_TABLE_NAME || 'store-config-table-dev';

/**
 * Lambda authorizer for API Gateway
 * Checks for API key in the X-StoreConfig-ApiKey header and validates it against DynamoDB
 */
export const handler = async (
  event: APIGatewayTokenAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> => {
  console.log('Authorizer event:', JSON.stringify(event, null, 2));

  try {
    // Extract the API key from the X-StoreConfig-ApiKey header
    const apiKey = event.authorizationToken;
    
    if (!apiKey) {
      console.log('No API key provided');
      throw new Error('Unauthorized');
    }

    if (apiKey.trim().length === 0) {
      console.log('Empty API key provided');
      throw new Error('Unauthorized');
    }

    // Query DynamoDB to find user by API key
    const user = await getUserByApiKey(apiKey);
    
    if (!user) {
      console.log('No user found for API key');
      throw new Error('Unauthorized');
    }

    if (!user.isActive) {
      console.log('User account is inactive');
      throw new Error('Unauthorized');
    }

    console.log('API key validated successfully for user:', user.userId);

    // Generate a policy that allows the request
    const policy = generatePolicy(user.userId, 'Allow', event.methodArn);
    
    return policy;
  } catch (error) {
    console.error('Authorization failed:', error);
    throw new Error('Unauthorized');
  }
};

/**
 * Query DynamoDB to find a user by API key using the GSI
 */
async function getUserByApiKey(apiKey: string): Promise<any | null> {
  try {
    const command = new QueryCommand({
      TableName: tableName,
      IndexName: 'gsi-api-key',
      KeyConditionExpression: 'gsiPk = :apiKey AND gsiSk = :sk',
      ExpressionAttributeValues: {
        ':apiKey': apiKey,
        ':sk': 'api-key'
      }
    });

    const result = await dynamoClient.send(command);
    
    if (result.Items && result.Items.length > 0) {
      return result.Items[0];
    }
    
    return null;
  } catch (error) {
    console.error('Error querying DynamoDB:', error);
    throw error;
  }
}

/**
 * Generate an IAM policy for the given principal, effect, and resource
 */
function generatePolicy(
  principalId: string,
  effect: 'Allow' | 'Deny',
  resource: string
): APIGatewayAuthorizerResult {
  const authResponse: APIGatewayAuthorizerResult = {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource
        }
      ]
    }
  };

  return authResponse;
}
