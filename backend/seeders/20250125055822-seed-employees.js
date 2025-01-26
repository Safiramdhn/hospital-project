'use strict';
const bcrypt = require("bcrypt");
const { update } = require("../models/employeeModel");


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add seed data
    const hashedPassword = await bcrypt.hash('password123', 10);  // Hash the password using bcrypt
    await queryInterface.bulkInsert('Employees', [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Remove all seed data
    await queryInterface.bulkDelete('Employees', null, {});
    await queryInterface.sequelize.query('ALTER TABLE Employees AUTO_INCREMENT = 1');
  },
};
