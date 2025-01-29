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
 *                                  mr_number:
 *                                      type: string
 *                                      example: "20250128-1-c775e7b7"
 *                                  ktp_number:
 *                                      type: string
 *                                      example: "1234567890"
 *                                  first_name:
 *                                      type: string
 *                                      example: "Test"
 *                                  last_name:
 *                                      type: string
 *                                      example: "Patient"
 *                                  active_status:
 *                                      type: boolean
 *                                      example: true
 *                                  mother_name:
 *                                      type: string
 *                                      example: "BE"
 *                                  employee_id:
 *                                      type: integer
 *                                      example: 1
 *                                  createdAt:
 *                                      type: string
 *                                      format: date-time
 *                                      example: "2025-01-28T04:43:08.000Z"
 *                                  updatedAt:
 *                                      type: string
 *                                      format: date-time
 *                                      example: "2025-01-28T04:43:08.000Z"
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
router.get('/',authMiddleware, patientController.getAllPatients);

/**
 * @swagger
 * /api/patient/find-patient-record:
 *  post:
 *      summary: Find patient record by credentials
 *      description: Retrieves a patient record based on provided credentials
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
 *                          patient_credential:
 *                              type: string
 *                              description: The patient's credential (e.g., ktp number or mr number)
 *                              example: "1234567890"
 *      responses:
 *          200:
 *              description: Patient record found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              patient:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: integer
 *                                          example: 1
 *                                      mr_number:
 *                                          type: string
 *                                          example: "20250128-1-c775e7b7"
 *                                      ktp_number:
 *                                          type: string
 *                                          example: "1234567890"
 *                                      first_name:
 *                                          type: string
 *                                          example: "Test"
 *                                      last_name:
 *                                          type: string
 *                                          example: "Patient"
 *                                      active_status:
 *                                          type: boolean
 *                                          example: true
 *                                      mother_name:
 *                                          type: string
 *                                          example: "BE"
 *                                      employee_id:
 *                                          type: integer
 *                                          example: 1
 *                                      createdAt:
 *                                          type: string
 *                                          format: date-time
 *                                          example: "2025-01-28T04:43:08.000Z"
 *                                      updatedAt:
 *                                          type: string
 *                                          format: date-time
 *                                          example: "2025-01-28T04:43:08.000Z"
 *                                      deletedAt:
 *                                          type: string
 *                                          format: date-time
 *                                          nullable: true
 *                                          example: null
 *                                      personal_information:
 *                                          type: object
 *                                          properties:
 *                                              birth_place:
 *                                                  type: string
 *                                                  example: "Purworejo"
 *                                              birth_date:
 *                                                  type: string
 *                                                  example: "1990-01-01"
 *                                              gender:
 *                                                  type: string
 *                                                  example: "Perempuan"
 *                                              blood_type:
 *                                                  type: string
 *                                                  example: "A"
 *                                              contact_number:
 *                                                  type: string
 *                                                  example: "1234567890"
 *                                              email:
 *                                                  type: string
 *                                                  example: "test@example.com"
 *                                      social_data:
 *                                          type: object
 *                                          properties:
 *                                              address:
 *                                                  type: string
 *                                                  example: "Test Street"
 *                                              city:
 *                                                  type: string
 *                                                  example: "Malinau"
 *                                              postal_code:
 *                                                  type: string
 *                                                  example: "12345"
 *                                              weight:
 *                                                  type: integer
 *                                                  example: 41
 *                                              ethnicity:
 *                                                  type: string
 *                                                  example: "JAWA"
 *                                      emergency_contact:
 *                                          type: object
 *                                          properties:
 *                                              contact_name:
 *                                                  type: string
 *                                                  example: "BE"
 *                                              phone_number:
 *                                                  type: string
 *                                                  example: "1234567890"
 *                                              address:
 *                                                  type: string
 *                                                  example: "Test Street"
 *          400:
 *              description: Invalid input data
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "Invalid input data"
 *          401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "Unauthorized"
 *          404:
 *              description: Patient not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "Patient not found"
 *          500:
 *              description: Internal server error
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "Internal server error"
 *                              error:
 *                                  type: string
 *                                  example: "Error message"
 */
router.post('/find-patient-record', authMiddleware, patientController.findPatientByCredentials);

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
 *                              mr_number:
 *                                  type: string
 *                                  example: 20250128-1-c775e7b7
 *                              ktp_number:
 *                                  type: string
 *                                  example: 1234567890
 *                              first_name:
 *                                  type: string
 *                                  example: Test
 *                              last_name:
 *                                  type: string
 *                                  example: Patient
 *                              active_status:
 *                                  type: boolean
 *                                  example: true
 *                              mother_name:
 *                                  type: string
 *                                  example: BE
 *                              employee_id:
 *                                  type: integer
 *                                  example: 1
 *                              createdAt:
 *                                  type: string
 *                                  format: date-time
 *                                  example: 2025-01-28T04:43:08.000Z
 *                              updatedAt:
 *                                  type: string
 *                                  format: date-time
 *                                  example: 2025-01-28T04:43:08.000Z
 *                              deletedAt:
 *                                  type: string
 *                                  format: date-time
 *                                  nullable: true
 *                                  example: null
 *                              personal_information:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: integer
 *                                          example: 1
 *                                      patient_id:
 *                                          type: integer
 *                                          example: 1
 *                                      birth_place:
 *                                          type: string
 *                                          example: Purworejo
 *                                      birth_date:
 *                                          type: string
 *                                          format: date
 *                                          example: 1990-01-01
 *                                      gender:
 *                                          type: string
 *                                          example: Perempuan
 *                                      blood_type:
 *                                          type: string
 *                                          example: A
 *                                      marital_status:
 *                                          type: string
 *                                          example: Single
 *                                      religion:
 *                                          type: string
 *                                          example: Islam
 *                                      contact_number:
 *                                          type: string
 *                                          example: 1234567890
 *                                      email:
 *                                          type: string
 *                                          example: test@example.com
 *                                      id_type:
 *                                          type: string
 *                                          example: KTP
 *                                      id_number:
 *                                          type: string
 *                                          example: 1234567890
 *                                      employeer:
 *                                          type: string
 *                                          example: Company Inc.
 *                                      education:
 *                                          type: string
 *                                          example: D4/S1
 *                              social_data:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: integer
 *                                          example: 1
 *                                      patient_id:
 *                                          type: integer
 *                                          example: 1
 *                                      address:
 *                                          type: string
 *                                          example: Test Street
 *                                      city:
 *                                          type: string
 *                                          example: Malinau
 *                                      postal_code:
 *                                          type: string
 *                                          example: 12345
 *                                      mr_date:
 *                                          type: string
 *                                          format: date-time
 *                                          example: 2025-01-28T00:00:00.000Z
 *                                      weight:
 *                                          type: integer
 *                                          example: 41
 *                                      ethnicity:
 *                                          type: string
 *                                          example: JAWA
 *                              emergency_contact:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: integer
 *                                          example: 1
 *                                      patient_id:
 *                                          type: integer
 *                                          example: 1
 *                                      contact_name:
 *                                          type: string
 *                                          example: BE
 *                                      phone_number:
 *                                          type: string
 *                                          example: 1234567890
 *                                      address:
 *                                          type: string
 *                                          example: Test Street
 *                                      city:
 *                                          type: string
 *                                          example: Malinau
 *                              employee:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: integer
 *                                          example: 1
 *                                      name:
 *                                          type: string
 *                                          example: John Doe
 *                                      email:
 *                                          type: string
 *                                          example: john.doe@example.com
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
 *      summary: Create a new outpatient registration
 *      description: Registers a new outpatient visit for a patient
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
 *                          patient:
 *                              type: object
 *                              properties:
 *                                  ktp_number:
 *                                      type: string
 *                                      example: "1234567890"
 *                                  first_name:
 *                                      type: string
 *                                      example: "Test"
 *                                  last_name:
 *                                      type: string
 *                                      example: "Patient"
 *                                  mother_name:
 *                                      type: string
 *                                      example: "BE"
 *                          personalInfo:
 *                              type: object
 *                              properties:
 *                                  birth_place:
 *                                      type: string
 *                                      example: "Purworejo"
 *                                  birth_date:
 *                                      type: string
 *                                      format: date
 *                                      example: "1990-01-01"
 *                                  gender:
 *                                      type: string
 *                                      example: "Perempuan"
 *                                  blood_type:
 *                                      type: string
 *                                      example: "A"
 *                                  marital_status:
 *                                      type: string
 *                                      example: "Single"
 *                                  religion:
 *                                      type: string
 *                                      example: "Islam"
 *                                  contact_number:
 *                                      type: string
 *                                      example: "1234567890"
 *                                  email:
 *                                      type: string
 *                                      example: "test@example.com"
 *                                  id_type:
 *                                      type: string
 *                                      example: "KTP"
 *                                  employeer:
 *                                      type: string
 *                                      example: "Company Inc."
 *                                  education:
 *                                      type: string
 *                                      example: "D4/S1"
 *                          socialData:
 *                              type: object
 *                              properties:
 *                                  address:
 *                                      type: string
 *                                      example: "Test Street"
 *                                  city:
 *                                      type: string
 *                                      example: "Malinau"
 *                                  postal_code:
 *                                      type: integer
 *                                      example: 12345
 *                                  weight:
 *                                      type: integer
 *                                      example: 41
 *                                  ethnicity:
 *                                      type: string
 *                                      example: "JAWA"
 *                          emergencyContact:
 *                              type: object
 *                              properties:
 *                                  contact_name:
 *                                      type: string
 *                                      example: "BE"
 *                                  phone_number:
 *                                      type: string
 *                                      example: "1234567890"
 *                                  address:
 *                                      type: string
 *                                      example: "Test Street"
 *                                  city:
 *                                      type: string
 *                                      example: "Malinau"
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
 *                                  example: "Patient successfully created"
 *          400:
 *              description: Invalid input data
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "Invalid input data"
 *          401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "Unauthorized"
 *          500:
 *              description: Internal server error
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "Internal server error"
 *                              error:
 *                                  type: string
 *                                  example: "Error message"
 */
router.post('/', authMiddleware, patientController.createPatient);

/**
 * @swagger
 * /api/patient/{id}:
 *   put:
 *     summary: Update a patient
 *     description: Update the details of an existing patient.
 *     tags: [Patient]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the patient to update
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patient:
 *                 type: object
 *                 properties:
 *                   ktp_number:
 *                     type: string
 *                     example: "3456784321"
 *                   first_name:
 *                     type: string
 *                     example: "Test"
 *                   last_name:
 *                     type: string
 *                     example: "Patient"
 *                   mother_name:
 *                     type: string
 *                     example: "COBA"
 *               personalInfo:
 *                 type: object
 *                 properties:
 *                   birth_place:
 *                     type: string
 *                     example: "Purworejo"
 *                   birth_date:
 *                     type: string
 *                     format: date
 *                     example: "1992-01-08"
 *                   gender:
 *                     type: string
 *                     example: "Laki-laki"
 *                   blood_type:
 *                     type: string
 *                     example: "A"
 *                   maritial_status:
 *                     type: string
 *                     example: "Single"
 *                   religion:
 *                     type: string
 *                     example: "Islam"
 *                   contact_number:
 *                     type: string
 *                     example: "1234567890"
 *                   email:
 *                     type: string
 *                     example: "test@example.com"
 *                   id_type:
 *                     type: string
 *                     example: "KTP"
 *                   employeer:
 *                     type: string
 *                     example: "Company Inc."
 *                   education:
 *                     type: string
 *                     example: "D4/S1"
 *               socialData:
 *                 type: object
 *                 properties:
 *                   address:
 *                     type: string
 *                     example: "Test Street"
 *                   city:
 *                     type: string
 *                     example: "Malinau"
 *                   postal_code:
 *                     type: integer
 *                     example: 12345
 *                   weight:
 *                     type: integer
 *                     example: 41
 *                   ethnicity:
 *                     type: string
 *                     example: "JAWA"
 *               emergencyContact:
 *                 type: object
 *                 properties:
 *                   contact_name:
 *                     type: string
 *                     example: "BE"
 *                   phone_number:
 *                     type: string
 *                     example: "1234567890"
 *                   address:
 *                     type: string
 *                     example: "Test Street"
 *                   city:
 *                     type: string
 *                     example: "Malinau"
 *             example:
 *               patient:
 *                 ktp_number: "3456784321"
 *                 first_name: "Test"
 *                 last_name: "Patient"
 *                 mother_name: "COBA"
 *               personalInfo:
 *                 birth_place: "Purworejo"
 *                 birth_date: "1992-01-08"
 *                 gender: "Laki-laki"
 *                 blood_type: "A"
 *                 maritial_status: "Single"
 *                 religion: "Islam"
 *                 contact_number: "1234567890"
 *                 email: "test@example.com"
 *                 id_type: "KTP"
 *                 employeer: "Company Inc."
 *                 education: "D4/S1"
 *               socialData:
 *                 address: "Test Street"
 *                 city: "Malinau"
 *                 postal_code: 12345
 *                 weight: 41
 *                 ethnicity: "JAWA"
 *               emergencyContact:
 *                 contact_name: "BE"
 *                 phone_number: "1234567890"
 *                 address: "Test Street"
 *                 city: "Malinau"
 *     responses:
 *       200:
 *         description: Patient updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Patient successfully updated
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid input
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       404:
 *         description: Patient not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Patient not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *                 error:
 *                   type: string
 *                   example: Error message
 */
router.put('/:id', authMiddleware, patientController.updatePatient);

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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Patient successfully deleted
 *       400:
 *         description: Invalid patient ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid patient ID
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       404:
 *         description: Patient not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Patient not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *                 error:
 *                   type: string
 *                   example: Error message
 */
router.delete('/:id', authMiddleware, patientController.deletePatient);

module.exports = router;