const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const path = require('path');

const router = express.Router();

const options = {
  swaggerDefinition: {
    // Specify your Swagger options
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'Your API description',
    },
  },
  apis: [path.resolve(__dirname, './swaggerDef.js')],
};

const swaggerSpec = swaggerJsdoc(options);

// Serve Swagger documentation
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;