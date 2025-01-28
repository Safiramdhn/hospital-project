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
    await queryInterface.createTable('tariff_references', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      tariff_code: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true,
      },
      category: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      base_registration_fee: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      base_examination_fee: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
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

    await queryInterface.addIndex('tariff_references', ['tariff_code'], { unique: true });
  },
  async down(queryInterface, Sequelize){}
};
