// swaggerDef.js

/**
 * @swagger
 * definitions:
 *   ErrorResponse:
 *     type: object
 *     properties:
 *       success:
 *         type: boolean
 *         example: false
 *       message:
 *         type: string
 *         example: An error occurred.
 */

/**
 * @swagger
 * /health:
 *   get:
 *     tags:
 *       - General
 *     summary: Check the health of the API
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
