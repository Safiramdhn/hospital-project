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
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      registration_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'outpatient_registrations',
          field: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      instalation_type: {
        type: Sequelize.STRING,
        defaultValue: 'Rawat Jalan'
      },
      class_type: {
        type: Sequelize.ENUM('NON', 'VIP'),
        defaultValue: 'NON'
      },
      insurance_type: {
        type: Sequelize.ENUM('UMUM', 'BPJS Kesehatan', 'BPJS TK'),
        defaultValue: 'UMUM'
      },
      insurance_number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      guarantor: {
        type: Sequelize.STRING,
        allowNull: true
      },
      company: {
        type: Sequelize.STRING,
        allowNull: true
      },
      entry_method: {
        type: Sequelize.ENUM('Datang Sendiri', 'Online'),
        allowNull: false
      },
      tariff_code: {
        type: Sequelize.STRING,
        references: {
          model: 'tariff_references',
          key: 'tariff_code'
        },
        defaultValue: 'RH',
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },
  async down(queryInterface, Sequelize){}
};
