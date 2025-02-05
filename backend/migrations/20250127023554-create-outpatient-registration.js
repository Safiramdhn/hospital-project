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

    await queryInterface.createTable('outpatient_registrations', {
      id: { 
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
      },
      patient_id: { 
        type: Sequelize.INTEGER, 
        references: { 
          model: 'patients', // Reference to the patients table
          key: 'id', // Reference to the id column in the patients table
        } 
      },
      registration_number: { 
        type: Sequelize.STRING, 
        unique: true, 
        allowNull: false 
      },
      booking_number: { 
        type: Sequelize.STRING, 
        unique: true, 
        allowNull: false 
      },
      session: { 
        type: Sequelize.ENUM('Fullday', 'Halfday') 
      },
      visit_date: { 
        type: Sequelize.DATE, 
        allowNull: false 
      },
      last_visit: { 
        type: Sequelize.DATE 
      },
      notes: { 
        type: Sequelize.STRING, 
        allowNull: true 
      },
      queue_number: { 
        type: Sequelize.INTEGER 
      },
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
      deleted_at: { 
        type: Sequelize.DATE, 
        allowNull: true 
      },
    });
  },
  async down(queryInterface, Sequelize){}
};
