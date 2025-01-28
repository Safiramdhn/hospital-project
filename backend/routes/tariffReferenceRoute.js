const express = require('express');
const controller = require('../controllers/tariffReferenceController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Tariff References
 *  description: API for managing tariff references
 */

/**
 * @swagger
 * /api/tariff-reference/:
 *  get:
 *      summary: Get all tariff references
 *      description: Retrieve a list of all tariff references
 *      tags: [Tariff References]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Successfully retrieved list of tariff references
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: integer
 *                                  tariff_code:
 *                                      type: string
 *                                  category:
 *                                      type: string
 *                                  description:
 *                                      type: string
 *                                  amount:
 *                                      type: number
 *                                      format: float
 *          401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Unauthorized
 *          500:
 *              description: Internal server error
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Internal server error
 *                              error:
 *                                  type: string
 *                                  example: Error message
 */
router.get('/', authMiddleware, controller.getAllTariffReferences);

module.exports = router;