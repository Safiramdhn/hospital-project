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

    await queryInterface.createTable('patient_social_data', {
      id: { 
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        unique: true, 
        primaryKey: true 
      },
      patient_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'patients', // Reference to the patients table
          key: 'id', // Reference to the id column in the patients table
        },
        onUpdate: 'CASCADE', // Automatically update if referenced key changes
        onDelete: 'CASCADE', // Automatically delete if referenced key is deleted
      },
      address: { 
        type: Sequelize.STRING 
      },
      city: { 
        type: Sequelize.STRING 
      },
      postal_code: { 
        type: Sequelize.STRING, 
        allowNull: true 
      },
      mr_date: { 
        type: Sequelize.DATE, 
        allowNull: false 
      },
      weight: { 
        type: Sequelize.INTEGER, 
        allowNull: false 
      },
      ethnicity: {
        type: Sequelize.ENUM(
          'JAWA',
          'SUNDA',
          'BATAK',
          'BETAWI',
          'ACEH',
          'MINANGKABAU',
          'ASMAT',
          'DANI',
          'ARFAK',
          'AMBON',
          'TERNATE',
          'MINAHASA',
          'TORAJA',
          'BUGIS',
          'LAIN-LAIN'
        ),
        allowNull: true,
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
