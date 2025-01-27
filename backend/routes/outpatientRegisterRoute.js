const express = require('express');
const controllers = require('../controllers/outpatientRegistrationController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Outpatient Registration
 *  description: API for outpatient registration
 */

/**
 * @swagger
 * /outpatient-register/:
 *  post:
 *      summary: Create a new outpatient registration
 *      description: Creates a new outpatient registration with the provided details
 *      tags: [Outpatient Registration]
 *      security:
 *          - bearerAuth: []
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          register: 
 *                              type: object
 *                              properties:
 *                                  patient_id:
 *                                      type: integer
 *                                      example: 1
 *                                  session:
 *                                      type: string
 *                                      enum: [Fullday, Halfday]
 *                                      example: Fullday
 *                                  visit_date:
 *                                      type: string
 *                                      format: date
 *                                      example: 2025-01-31
 *                                  notes:
 *                                      type: string
 *                                      example: Kontrol rutin
 *                          service_detail:
 *                              type: object
 *                              properties:
 *                                  clinic_code:
 *                                      type: string
 *                                      example: CLN001
 *                                  doctor_code:
 *                                      type: string
 *                                      example: DR001
 *                          billing_detail:
 *                              type: object
 *                              properties:
 *                                  amount:
 *                                      type: number
 *                                      format: float
 *                                      example: 50000.00
 *                          visit_detail:
 *                              type: object
 *                              properties:
 *                                  visit_type:
 *                                      type: string
 *                                      example: First Visit
 *      responses:
 *          201:
 *              description: Outpatient registration successfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Outpatient registration successfully created
 *          400:
 *              description: Invalid input data
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Missing outpatient registration data
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
router.post('/', authMiddleware, controllers.createOutPatientRegistration);

module.exports = router;