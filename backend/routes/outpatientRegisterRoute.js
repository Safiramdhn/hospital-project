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
 * /api/outpatient-register/:
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
 *                                  notes:
 *                                      type: string
 *                                      example: Kontrol rutin
 *                                  visit_date:
 *                                      type: string
 *                                      format: date
 *                                      example: 2025-01-31
 *                          service_detail:
 *                              type: object
 *                              properties:
 *                                  clinic_code:
 *                                      type: string
 *                                      example: POL07
 *                                  doctor_code:
 *                                      type: string
 *                                      example: DR00000015
 *                          billing_detail:
 *                              type: object
 *                              properties:
 *                                  treatment:
 *                                      type: string
 *                                      example: Periksa Dokter
 *                                  discount:
 *                                      type: integer
 *                                      example: 45
 *                          visit_detail:
 *                              type: object
 *                              properties:
 *                                  class_type:
 *                                      type: string
 *                                      example: NON
 *                                  insurance_type:
 *                                      type: string
 *                                      example: UMUM
 *                                  insurance_number:
 *                                      type: string
 *                                      example: 1234567890
 *                                  guarantor:
 *                                      type: string
 *                                      example: PT. Backend
 *                                  entry_method:
 *                                      type: string
 *                                      example: Datang Sendiri
 *                                  tariff_code:
 *                                      type: string
 *                                      example: RHS
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
 *                              queue_number:
 *                                  type: integer
 *                                  example: 12
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

/**
 * @swagger
 * /api/outpatient-register/search:
 *  get:
 *      summary: Search outpatient registrations
 *      description: Retrieve an outpatient registration by ID or queue number
 *      tags: [Outpatient Registration]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: query
 *            name: id
 *            schema:
 *              type: integer
 *            description: The ID of the outpatient registration
 *          - in: query
 *            name: queue_number
 *            schema:
 *              type: integer
 *            description: The queue number of the outpatient registration
 *      responses:
 *          200:
 *              description: Successfully retrieved outpatient registration
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: integer
 *                                  example: 1
 *                              patient_id:
 *                                  type: integer
 *                                  example: 1
 *                              registration_number:
 *                                  type: string
 *                                  example: RG00000001
 *                              booking_number:
 *                                  type: string
 *                                  example: 120250128
 *                              session:
 *                                  type: string
 *                                  example: Fullday
 *                              visit_date:
 *                                  type: string
 *                                  format: date-time
 *                                  example: 2025-01-30T16:00:00.000Z
 *                              last_visit:
 *                                  type: string
 *                                  format: date-time
 *                                  example: 2025-01-28T00:00:00.000Z
 *                              notes:
 *                                  type: string
 *                                  example: Kontrol rutin
 *                              queue_number:
 *                                  type: integer
 *                                  example: 1
 *                              createdAt:
 *                                  type: string
 *                                  format: date-time
 *                                  example: 2025-01-28T04:49:09.000Z
 *                              updatedAt:
 *                                  type: string
 *                                  format: date-time
 *                                  example: 2025-01-28T04:49:09.000Z
 *                              deletedAt:
 *                                  type: string
 *                                  format: date-time
 *                                  nullable: true
 *                                  example: null
 *                              service_detail:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: integer
 *                                          example: 1
 *                                      registration_id:
 *                                          type: integer
 *                                          example: 3
 *                                      clinic_code:
 *                                          type: string
 *                                          example: POL07
 *                                      doctor_code:
 *                                          type: string
 *                                          example: DR00000015
 *                                      createdAt:
 *                                          type: string
 *                                          format: date-time
 *                                          example: 2025-01-28T04:49:09.000Z
 *                                      updatedAt:
 *                                          type: string
 *                                          format: date-time
 *                                          example: 2025-01-28T04:49:09.000Z
 *                                      deletedAt:
 *                                          type: string
 *                                          format: date-time
 *                                          nullable: true
 *                                          example: null
 *                              visit_detail:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: integer
 *                                          example: 1
 *                                      registration_id:
 *                                          type: integer
 *                                          example: 3
 *                                      instalation_type:
 *                                          type: string
 *                                          example: Rawat Jalan
 *                                      class_type:
 *                                          type: string
 *                                          example: NON
 *                                      insurance_type:
 *                                          type: string
 *                                          example: UMUM
 *                                      insurance_number:
 *                                          type: string
 *                                          example: 1234567890
 *                                      guarantor:
 *                                          type: string
 *                                          example: PT. Backend
 *                                      company:
 *                                          type: string
 *                                          nullable: true
 *                                          example: null
 *                                      entry_method:
 *                                          type: string
 *                                          example: Datang Sendiri
 *                                      tariff_code:
 *                                          type: string
 *                                          example: RHS
 *                                      createdAt:
 *                                          type: string
 *                                          format: date-time
 *                                          example: 2025-01-28T04:49:09.000Z
 *                                      updatedAt:
 *                                          type: string
 *                                          format: date-time
 *                                          example: 2025-01-28T04:49:09.000Z
 *                                      deletedAt:
 *                                          type: string
 *                                          format: date-time
 *                                          nullable: true
 *                                          example: null
 *                              billing_detail:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: integer
 *                                          example: 1
 *                                      registration_id:
 *                                          type: integer
 *                                          example: 3
 *                                      treatment:
 *                                          type: string
 *                                          example: Periksa Dokter
 *                                      registration_fee:
 *                                          type: string
 *                                          example: 25000.00
 *                                      examination_fee:
 *                                          type: string
 *                                          example: 230000.00
 *                                      total_fee:
 *                                          type: string
 *                                          example: 255000.00
 *                                      discount:
 *                                          type: string
 *                                          example: 45.00
 *                                      total_payment:
 *                                          type: string
 *                                          example: 140250.00
 *                                      amount_due:
 *                                          type: string
 *                                          nullable: true
 *                                          example: null
 *                                      createdAt:
 *                                          type: string
 *                                          format: date-time
 *                                          example: 2025-01-28T04:49:09.000Z
 *                                      updatedAt:
 *                                          type: string
 *                                          format: date-time
 *                                          example: 2025-01-28T04:49:09.000Z
 *                                      deletedAt:
 *                                          type: string
 *                                          format: date-time
 *                                          nullable: true
 *                                          example: null
 *          400:
 *              description: Invalid query parameters
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Either ID or queue number must be provided
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
 *          404:
 *              description: Outpatient registration not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Outpatient registration with ID or queue number not found
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
 */
router.get('/search', authMiddleware, controllers.getOutPatientRegistration);

/**
 * @swagger
 * /api/outpatient-register:
 *   get:
 *     summary: Retrieve all outpatient registrations
 *     description: Fetches a list of outpatient registrations with optional query filters.
 *     tags:
 *       - Outpatient Registration
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: patient_name
 *         schema:
 *           type: string
 *         description: Filter by patient's first name
 *       - in: query
 *         name: doctor_name
 *         schema:
 *           type: string
 *         description: Filter by doctor's name
 *       - in: query
 *         name: clinic_name
 *         schema:
 *           type: string
 *         description: Filter by clinic name
 *       - in: query
 *         name: registration_number
 *         schema:
 *           type: integer
 *         description: Filter by registration number
 *       - in: query
 *         name: booking_number
 *         schema:
 *           type: integer
 *         description: Filter by booking number
 *     responses:
 *       200:
 *         description: A list of outpatient registrations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   patient_id:
 *                     type: integer
 *                   registration_number:
 *                     type: string
 *                   booking_number:
 *                     type: string
 *                   session:
 *                     type: string
 *                   visit_date:
 *                     type: string
 *                     format: date-time
 *                   last_visit:
 *                     type: string
 *                     format: date-time
 *                   notes:
 *                     type: string
 *                   queue_number:
 *                     type: integer
 *                   service_detail:
 *                     type: object
 *                     properties:
 *                       clinic:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                       doctor:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                   visit_detail:
 *                     type: object
 *                     properties:
 *                       instalation_type:
 *                         type: string
 *                       insurance_type:
 *                         type: string
 *                   billing_detail:
 *                     type: object
 *                     properties:
 *                       treatment:
 *                         type: string
 *                       total_payment:
 *                         type: number
 *                   patient:
 *                     type: object
 *                     properties:
 *                       first_name:
 *                         type: string
 *                       last_name:
 *                         type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/', authMiddleware, controllers.getAllOutPatientRegistration);

module.exports = router;