const express = require('express');
const controller = require('../controllers/employeeController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Employee
 *  description: API for employee management services
 */

/**
 * @swagger
 * /api/employee/profile:
 *  get:
 *      summary: Retrieve employee profile
 *      description: Retrieve the profile information of the authenticated employee.
 *      tags: [Employee]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Successfully retrieved employee profile
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: integer
 *                                  description: The ID of the employee
 *                              name:
 *                                  type: string
 *                                  description: The name of the employee
 *                              email:
 *                                  type: string
 *                                  description: The email of the employee
 *                              department:
 *                                  type: string
 *                                  description: The department of the employee
 *                              position:
 *                                  type: string
 *                                  description: The position of the employee
 *                              createdAt:
 *                                  type: string
 *                                  format: date-time
 *                                  description: The date and time the employee was created
 *                              updatedAt:
 *                                  type: string
 *                                  format: date-time
 *                                  description: The date and time the employee profile was last updated
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
 *              description: Employee not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Couldn't find employee with ID {id}
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

router.get('/profile', authMiddleware, controller.getEmployeeProfile);

module.exports = router;