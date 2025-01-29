const express = require('express');
const controller = require('../controllers/doctorController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Doctors
 *  description: API for managing doctors
 */

/**
 * @swagger
 * /api/doctor/:
 *  get:
 *      summary: Get all doctors
 *      description: Retrieve a list of all doctors
 *      tags: [Doctors]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Successfully retrieved list of doctors
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: integer
 *                                      example: 1
 *                                  name:
 *                                      type: string
 *                                      example: "dr. Dessy Rusmawatiningtyas, M.Sc, Sp.A"
 *                                  code:
 *                                      type: string
 *                                      example: "DR00000001"
 *                                  clinic_id:
 *                                      type: integer
 *                                      example: 1
 *                                  createdAt:
 *                                      type: string
 *                                      format: date-time
 *                                      example: "2025-01-28T04:06:33.000Z"
 *                                  updatedAt:
 *                                      type: string
 *                                      format: date-time
 *                                      example: "2025-01-28T04:06:33.000Z"
 *                                  deletedAt:
 *                                      type: string
 *                                      format: date-time
 *                                      nullable: true
 *                                      example: null
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
router.get('/', authMiddleware, controller.getAllDoctors);

module.exports = router;