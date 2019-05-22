import 'source-map-support/register';
import * as Lambda from 'aws-lambda';
import OpenAPIBackend from 'openapi-backend';

// define api
const api = new OpenAPIBackend({ definition: './openapi.yml' });

api.init();

api.register('getMorjesta', (c) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "No moro" }),
    headers: {
      'content-type': 'application/json',
    },
  };
});

export async function handler(event: Lambda.APIGatewayProxyEvent, context: Lambda.Context) {
  return api.handleRequest(
    {
      method: event.httpMethod,
      path: event.path,
      query: event.queryStringParameters,
      body: event.body,
      headers: event.headers,
    },
    event,
    context,
  );
}
