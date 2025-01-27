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
    await queryInterface.createTable('visit_details', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      registration_id: { type: Sequelize.INTEGER, references: { model: 'outpatient_registrations', field: 'id' }, onDelete: 'CASCADE' },
      instalation_type: { type: Sequelize.STRING, defaultValue: 'Rawat Jalan' },
      class_type: { type: Sequelize.ENUM('NON', 'VIP'), defaultValue: 'NON' },
      insurance_type: { type: Sequelize.ENUM('UMUM', 'BPJS Kesehatan', 'BPJS TK'), defaultValue: 'UMUM' },
      insurance_number: { type: Sequelize.STRING, allowNull: false },
      guarantor: { type: Sequelize.STRING, allowNull: true },
      company: { type: Sequelize.STRING, allowNull: true },
      entry_method: { type: Sequelize.ENUM('Datang Sendiri', 'Online') },
      tariff_code: { type: Sequelize.STRING, references: { model: 'tariff_references', key: 'tariff_code' }, defaultValues: 'RH' },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
      deleted_at: { type: Sequelize.DATE, allowNull: true },
    });
  }
};
