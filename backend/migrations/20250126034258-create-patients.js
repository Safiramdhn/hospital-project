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
      id: { 
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
      },
      mr_number: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      ktp_number: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      first_name: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      last_name: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      active_status: { 
        type: Sequelize.BOOLEAN, 
        defaultValue: true 
      },
      mother_name: { 
        type: Sequelize.STRING 
      },
      employee_id: { 
        type: Sequelize.INTEGER, 
        allowNull: false, 
        references: {
          model: 'employees', // Reference to the employees table
          key: 'id',
        },
        onUpdate: 'CASCADE', // Optional: Automatically update if referenced key changes
        onDelete: 'RESTRICT', // Optional: Prevent deletion if referenced key exists
      },
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
      deleted_at: { 
        type: Sequelize.DATE, 
        allowNull: true 
      },
    });
  },
  async down(queryInterface, Sequelize){}
};
