'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('service_details', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      registration_id: { type: Sequelize.INTEGER, references: { model: 'outpatient_registrations', field: 'id' } },
      clinic_code: { type: Sequelize.STRING, references: { model: 'clinics', key: 'code' } },
      doctor_code: { type: Sequelize.STRING, references: { model: 'doctors', key: 'code' } },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'), // Sets default value to current timestamp
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'), // Sets default value to current timestamp
      },
      deleted_at: { type: Sequelize.DATE, allowNull: true },
    });
  },
  async down(queryInterface, Sequelize){}
};
