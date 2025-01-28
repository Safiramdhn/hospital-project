const express = require('express');
const controller = require('../controllers/clinicController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Clinics
 *  description: API for managing clinics
 */

/**
 * @swagger
 * /api/clinic/:
 *  get:
 *      summary: Get all clinics
 *      description: Retrieve a list of all clinics
 *      tags: [Clinics]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Successfully retrieved list of clinics
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
router.get('/', authMiddleware, controller.getAllClinics);

module.exports = router;