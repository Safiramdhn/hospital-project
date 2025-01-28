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
    await queryInterface.createTable('patient_emergency_contacts', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      patient_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Patients',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      contact_name: { type: Sequelize.STRING, allowNul: false },
      phone_number: { type: Sequelize.STRING, allowNul: false },
      address: { type: Sequelize.STRING, allowNul: false },
      city: { type: Sequelize.STRING, allowNul: false },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'), // Sets default value to current timestamp
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
      deleted_at: { type: Sequelize.DATE, allowNull: true },
    });
  },
  async down(queryInterface, Sequelize){}
};
