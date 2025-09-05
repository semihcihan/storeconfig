import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

/**
 * Lambda handler for Paddle payment webhook
 * Handles incoming webhook requests from Paddle payment system
 */
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log('Payment webhook event received:', JSON.stringify(event, null, 2));
  
  // Log the request body if present
  if (event.body) {
    try {
      const body = JSON.parse(event.body);
      console.log('Payment webhook payload:', JSON.stringify(body, null, 2));
    } catch (error) {
      console.log('Payment webhook raw body:', event.body);
    }
  }

  // Log headers for debugging
  console.log('Payment webhook headers:', JSON.stringify(event.headers, null, 2));

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
