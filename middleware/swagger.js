const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

const router = express.Router();

// Read and parse the YAML file
const filePath = path.resolve(__dirname, './swagger.yaml');
const fileContents = fs.readFileSync(filePath, 'utf8');
const yamlContent = yaml.load(fileContents)

const options = {
  swaggerDefinition: {
    // Merge your existing Swagger options with the YAML content
    ...yamlContent, // Spread the YAML content
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

// Serve Swagger documentation
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;