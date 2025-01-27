const swaggerJsdoc = require('swagger-jsdoc');

const option = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hospital API',
      version: '1.0.0',
      description: 'API for outpatient registration services',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Development server',
    },
  ],
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(option);
module.exports = swaggerSpec;
