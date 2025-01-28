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
 *                                      description: The unique identifier for the tariff reference
 *                                  tariff_code:
 *                                      type: string
 *                                      description: The code associated with the tariff
 *                                  category:
 *                                      type: string
 *                                      description: The category of the tariff
 *                                  description:
 *                                      type: string
 *                                      description: A brief description of the tariff
 *                                  base_registration_fee:
 *                                      type: string
 *                                      description: The base registration fee for the tariff
 *                                  base_examination_fee:
 *                                      type: string
 *                                      description: The base examination fee for the tariff
 *                                  is_active:
 *                                      type: boolean
 *                                      description: Whether the tariff reference is active
 *                                  createdAt:
 *                                      type: string
 *                                      format: date-time
 *                                      description: The creation timestamp of the tariff reference
 *                                  updatedAt:
 *                                      type: string
 *                                      format: date-time
 *                                      description: The last update timestamp of the tariff reference
 *                                  deletedAt:
 *                                      type: string
 *                                      format: date-time
 *                                      description: The deletion timestamp of the tariff reference (if applicable)
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