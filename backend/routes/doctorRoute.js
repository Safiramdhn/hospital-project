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
 *                                  code:
 *                                      type: string
 *                                  name:
 *                                      type: string
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