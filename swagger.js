const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { URL } = require('url');

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Service BackendAPI with JWT and MySQL',
      description: "Service Backend API application included with Authentication Module & Different Modules. It's included with JWT authentication and Swagger API format.",
      version: '1.0.0',
      contact: {
        name: "API Support",
        email: 'bcolina88@gmail.com',
      },
      license: {
        name:"Apache 2.0",
        url:"http://www.apache.org/licenses/LICENSE-2.0.html"
      }
    },
    servers: [ {
        url: new URL('https://api-node-jwt-mysql.vercel.app/'),
        description: "My API Documentation",
    }],
    // servers: [ { url: 'http://localhost:3000/' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.js'],
  // apis: ["./src/routes/**/*.js"],
};

const specs = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  // app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(specs, { customCssUrl: CSS_URL }));
};