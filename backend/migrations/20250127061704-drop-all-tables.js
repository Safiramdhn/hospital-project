'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {},
  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    console.log('Dropping table visit_details')
    await queryInterface.dropTable('visit_details');
    console.log('Dropping table tariff_references')
    await queryInterface.dropTable('tariff_references');
    console.log('Dropping table billing_details')
    await queryInterface.dropTable('billing_details');
    console.log('Dropping table service_details')
    await queryInterface.dropTable('service_details');
    console.log('Dropping table doctors')
    await queryInterface.dropTable('doctors');
    console.log('Dropping table clinics')
    await queryInterface.dropTable('clinics');
    console.log('Dropping table visit_details')
    await queryInterface.dropTable('outpatient_registrations');
    console.log('Dropping table patient_emergency_contacts')
    await queryInterface.dropTable('patient_emergency_contacts');
    console.log('Dropping table patient_personal_infomations')
    await queryInterface.dropTable('patient_personal_infomations');
    console.log('Dropping table patient_social_data')
    await queryInterface.dropTable('patient_social_data');
    console.log('Dropping table patients')
    await queryInterface.dropTable('patients');
    console.log('Dropping table employees')
    await queryInterface.dropTable('employees');
  },
};
