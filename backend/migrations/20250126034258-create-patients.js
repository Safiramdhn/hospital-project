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
    await queryInterface.createTable('patients', {
      id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
      mr_number: {type: Sequelize.STRING, allowNull: false, unique: true},
      ktp_number: {type: Sequelize.STRING, allowNull: false},
      first_name: {type: Sequelize.STRING, allowNull: false},
      last_name: {type: Sequelize.STRING, allowNull: false},
      active_status: {type: Sequelize.BOOLEAN, defaultValue: true},
      mother_name: {type: Sequelize.STRING},
      employee_id: {type: Sequelize.INTEGER, allowNull: false, references: {
        model: 'employees', // reference to employee table
        key: 'id',
      }},
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

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
