// swaggerOptions.ts
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Movie API',
      version: '1.0.0',
      description: 'API pour la gestion des films',
    },
    servers: [
      {
        url: 'http://localhost:3001', 
      },
    ],
  },
  apis: ['./routes/*.ts'], 
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
