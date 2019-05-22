# Serverless OpenAPI Demo

Live demo for Tampere Serverless Meetup May 22nd 2019

Talk slides: [[Link]](https://docs.google.com/presentation/d/1LaNrwxbI3WPye8EeOXBHlAg8C5GA8MRv8pGd7-x7d_o/edit?usp=sharing)

## Prerequisites

- [Node.js](https://nodejs.org)
- [openapicmd](https://github.com/anttiviljami/openapicmd)

## Steps

Clone the openapi-backend repository and copy the serverless-aws example

```sh
git clone https://github.com/anttiviljami/openapi-backend.git
cp -r openapi-backend/examples/serverless-aws serverless-backend
rm -r openapi-backend # clean up
```

Install and start the example project to test

```sh
cd serverless-backend
npm install
npm run dev
```

Run swagger-editor to build a new API. Save to `openapi.yml` inside serverless-backend directory.

```sh
openapi swagger-editor
```

```yaml
openapi: 3.0.0
info:
  title: Moro API
  description: Morjesta vaan
  version: 1.0.0
paths:
  '/morjesta':
    get:
      operationId: getMorjesta
      summary: Get a morjesta
      responses:
        '200':
          description: A morjesta response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Morotus'
components:
  schemas:
    Morotus:
      type: object
      properties:
        message:
          type: string
          example: 'Morjess!'
```

Mock the API with OpenAPICMD to test

```sh
openapi mock -d openapi.yml
```

Modify the serverless `index.ts` to load the openapi.yml as definition.

```typescript
const api = new OpenAPIBackend({ definition: './openapi.yml' });
```

Register a handler for an operation:
```typescript
api.register('getMorjesta', (c) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "No moro" }),
    headers: {
      'content-type': 'application/json',
    },
  };
});
```

Test our API using Swagger UI

```
openapi swagger-ui -d openapi.yml --server http://localhost:9000
```

