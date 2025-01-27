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

    await queryInterface.createTable('patient_personal_infomations', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      patient_id: { type: Sequelize.INTEGER, references: { model: 'patients', key: 'id' }, onDelete: 'CASCADE' },
      birth_place: { type: Sequelize.STRING, allowNull: false },
      birth_date: { type: Sequelize.DATEONLY, allowNull: false },
      gender: { type: Sequelize.ENUM('Perempuan', 'Laki-laki', 'Lain-lain'), allowNull: false },
      blood_type: { type: Sequelize.ENUM('A', 'B', 'O', 'AB'), allowNull: false },
      maritial_status: { type: Sequelize.ENUM('Menikah', 'Single', 'Duda/Janda'), allowNull: false },
      religion: { type: Sequelize.ENUM('Islam', 'Kristen', 'Katolic', 'Hindu', 'Budha', 'Lain-lain') },
      contact_number: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: true },
      id_type: { type: Sequelize.ENUM('KTP', 'Passport'), allowNull: false },
      id_number: { type: Sequelize.STRING, allowNull: false },
      employeer: { type: Sequelize.STRING, allowNull: true },
      education: { type: Sequelize.ENUM('SD', 'SMP', 'SMA/K', 'D3', 'D4/S1', 'S2', "Lain-lain"), allowNull: false },
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
};
