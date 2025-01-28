const express = require('express');
const authController = require('../controllers/authController.js');

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Authentication
 *  description: API for employees authentication
 */

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *      summary: Employee login
 *      description: Authenticates an employee using their email and password
 *      tags: [Authentication]
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email: 
 *                              type: string
 *                              example: john@example.com
 *                          password: 
 *                              type: string
 *                              example: password123
 *      responses:
 *          200:
 *              description: Successful login
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              token:
 *                                  type: string
 *                                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *          400:
 *              description: Invalid email or password
 *          401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Invalid email or password
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
router.post('/login', authController.login);

module.exports = router;