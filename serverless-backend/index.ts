import 'source-map-support/register';
import * as Lambda from 'aws-lambda';
import OpenAPIBackend from 'openapi-backend';
const headers = {
  'content-type': 'application/json',
  'access-control-allow-origin': '*', // lazy cors config
};

// create api from definition
const api = new OpenAPIBackend({ definition: './openapi.yml' });

// register some handlers
api.register({
  notFound: async (c, event: Lambda.APIGatewayProxyEvent, context: Lambda.Context) => ({
    statusCode: 404,
    body: JSON.stringify({ err: 'not found' }),
    headers,
  }),
  validationFail: async (c, event: Lambda.APIGatewayProxyEvent, context: Lambda.Context) => ({
    statusCode: 400,
    body: JSON.stringify({ err: c.validation.errors }),
    headers,
  }),
  getMorjesta: async (c, event: Lambda.APIGatewayProxyEvent, context: Lambda.Context) => ({
    statusCode: 200,
    body: JSON.stringify({ message: 'no morjesta' }),
    headers,
	}),
});

// init api
api.init();

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
