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
      id: { type: Sequelize.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
      patient_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'patients', //reference to patients table
          key: 'id', //reference to id in the patients table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      address: { type: Sequelize.STRING },
      city: { type: Sequelize.STRING },
      postal_code: { type: Sequelize.STRING, allowNull: true },
      mr_date: { type: Sequelize.DATE, defaultValue: new Date()},
      weight: { type: Sequelize.INTEGER, allowNull: false },
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
        defaultValue: Sequelize.fn('NOW'), // Sets default value to current timestamp
      },
      deleted_at: { type: Sequelize.DATE, allowNull: true },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('patient_social_data');
  },
};
