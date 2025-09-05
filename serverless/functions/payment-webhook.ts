import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Paddle, EventName } from '@paddle/paddle-node-sdk';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';

const paddle = new Paddle(process.env.PADDLE_API_KEY || '');
const dynamoClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dynamoClient);

/**
 * Handle subscription created event by creating user record in DynamoDB
 */
async function handleSubscriptionCreated(eventData: any): Promise<void> {
  try {
    const subscriptionData = eventData.data;
    const customerId = subscriptionData.customerId;
    const subscriptionId = subscriptionData.id;

    console.log(`Processing subscription created: ${subscriptionId} for customer: ${customerId}`);

    // Fetch customer details from Paddle API
    const customer = await paddle.customers.get(customerId);
    const email = customer.email;

    // Generate user identifiers
    const userId = uuidv4();
    const apiKey = uuidv4();

    // Create user record in DynamoDB
    const userRecord = {
      userId,
      email,
      name: email, // Using email as name as specified
      apiKey,
      isActive: true, // User becomes active when subscription is created
      pCustomerId: customerId,
      pSubscriptionId: subscriptionId,
      pk: userId,
      sk: 'user',
      gsiPk: apiKey,
      gsiSk: 'api-key',
      gsi2Pk: customerId,
      gsi2Sk: 'customer'
    };

    const tableName = process.env.STORE_CONFIG_TABLE_NAME;
    if (!tableName) {
      throw new Error('STORE_CONFIG_TABLE_NAME environment variable is not set');
    }

    await docClient.send(new PutCommand({
      TableName: tableName,
      Item: userRecord
    }));

    console.log(`Successfully created user record for customer ${customerId} with userId ${userId}`);
  } catch (error) {
    console.error('Error handling subscription created event:', error);
    throw error;
  }
}

/**
 * Lambda handler for Paddle payment webhook
 * Handles incoming webhook requests from Paddle payment system
 */
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log(event);
  const signature = (event.headers['Paddle-Signature'] as string) || '';
  const rawRequestBody = event.body;
  const secretKey = process.env['PADDLE_WEBHOOK_SECRET_KEY'] || '';

  try {
    if (signature && rawRequestBody) {
      // The `unmarshal` function will validate the integrity of the webhook and return an entity
      const eventData = await paddle.webhooks.unmarshal(rawRequestBody, secretKey, signature);
      console.log(eventData);
      switch (eventData.eventType) {
        case EventName.SubscriptionCreated:
          console.log(`Subscription ${eventData.data.id} was created`);
          await handleSubscriptionCreated(eventData);
          break;
        case EventName.SubscriptionCanceled:
          console.log(`Subscription ${eventData.data.id} was canceled`);
          break;
        default:
          console.log(eventData.eventType);
      }
    } else {
      console.log('Signature missing in header');
    }
  } catch (e) {
    // Handle signature mismatch or other runtime errors
    console.log(e);
  }

  // For now, just return success as requested
  return createResponse(200, {
    message: 'Webhook received successfully',
    status: 'success'
  });
};

/**
 * Create a standardized API Gateway response
 */
function createResponse(
  statusCode: number,
  body: any
): APIGatewayProxyResult {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization',
      'Access-Control-Allow-Methods': 'POST,OPTIONS'
    },
    body: JSON.stringify(body)
  };
}
