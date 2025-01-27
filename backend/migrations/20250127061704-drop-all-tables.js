'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('visit_details');
    await queryInterface.dropTable('tariff_reference');
    await queryInterface.dropTable('billing_details');
    await queryInterface.dropTable('service_details');
    await queryInterface.dropTable('doctors');
    await queryInterface.dropTable('clinics');
    await queryInterface.dropTable('outpatient-registrations');
    await queryInterface.dropTable('emergency_contacts');
    await queryInterface.dropTable('patient_personal_infomations');
    await queryInterface.dropTable('patient_social_data');
    await queryInterface.dropTable('patients');
    await queryInterface.dropTable('employees');
  }
};
