const express = require('express');
const patientController = require('../controllers/patientController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Patient
 *  description: API for patient management services
 */

/**
 * @swagger
 * /api/patient/:
 *  get:
 *      summary: Get all patients
 *      description: Retrieves a list of all patients
 *      tags: [Patient]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: List of patients
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
 *                                      example: John Doe
 *                                  email:
 *                                      type: string
 *                                      example: john@example.com
 *                                  phone:
 *                                      type: string
 *                                      example: 1234567890
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
router.get('/',authMiddleware, patientController.getAllPatients);

/**
 * @swagger
 * /api/patient/find-patient-record:
 *  get:
 *      summary: Find patient record by credentials
 *      description: Retrieves a patient record based on provided credentials
 *      tags: [Patient]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: query
 *            name: email
 *            schema:
 *              type: string
 *            required: true
 *            description: The patient's email
 *          - in: query
 *            name: phone
 *            schema:
 *              type: string
 *            required: true
 *            description: The patient's phone number
 *      responses:
 *          200:
 *              description: Patient record found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: integer
 *                                  example: 1
 *                              name:
 *                                  type: string
 *                                  example: John Doe
 *                              email:
 *                                  type: string
 *                                  example: john@example.com
 *                              phone:
 *                                  type: string
 *                                  example: 1234567890
 *          400:
 *              description: Invalid input data
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Invalid input data
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
 *              description: Patient not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Patient not found
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
router.get('/find-patient-record', authMiddleware, patientController.findPatientByCredentials);

/**
 * @swagger
 * /api/patient/{id}:
 *  get:
 *      summary: Get patient by ID
 *      description: Retrieves a patient record by ID
 *      tags: [Patient]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: The patient ID
 *      responses:
 *          200:
 *              description: Patient record found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: integer
 *                                  example: 1
 *                              name:
 *                                  type: string
 *                                  example: John Doe
 *                              email:
 *                                  type: string
 *                                  example: john@example.com
 *                              phone:
 *                                  type: string
 *                                  example: 1234567890
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
 *              description: Patient not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Patient not found
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
router.get('/:id', authMiddleware, patientController.getPatientById);

/**
 * @swagger
 * /api/patient/:
 *  post:
 *      summary: Create a new patient
 *      description: Creates a new patient record
 *      tags: [Patient]
 *      security:
 *          - bearerAuth: []
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name: 
 *                              type: string
 *                              example: John Doe
 *                          email: 
 *                              type: string
 *                              example: john@example.com
 *                          phone: 
 *                              type: string
 *                              example: 1234567890
 *                          address:
 *                              type: string
 *                              example: 123 Main St
 *      responses:
 *          201:
 *              description: Patient successfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Patient successfully created
 *          400:
 *              description: Invalid input data
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Invalid input data
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
router.post('/', authMiddleware, patientController.createPatient);

/**
 * @swagger
 * /api/patient/:
 *   put:
 *     summary: Update a patient
 *     description: Update the details of an existing patient.
 *     tags: [Patient]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               address:
 *                 type: string
 *             example:
 *               name: John Doe
 *               age: 30
 *               address: 123 Main St
 *     responses:
 *       200:
 *         description: Patient updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Patient not found
 */
router.put('/', authMiddleware, patientController.updatePatient);

/**
 * @swagger
 * /api/patient/{id}:
 *   delete:
 *     summary: Delete a patient
 *     description: Delete a patient by ID.
 *     tags: [Patient]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The patient ID
 *     responses:
 *       200:
 *         description: Patient deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Patient not found
 */
router.delete('/:id', authMiddleware, patientController.deletePatient);

module.exports = router;