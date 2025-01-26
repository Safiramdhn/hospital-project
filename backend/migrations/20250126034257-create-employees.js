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
    await queryInterface.createTable('employees', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, unique: true, primaryKey: true},
      name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false },
      password: { type: Sequelize.STRING, allowNull: false },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'), // Sets default value to current timestamp
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'), // Sets default value to current timestamp
      },
      deleted_at: { type: Sequelize.DATE, allowNull: true },
    });

    // await queryInterface.addColumn('Employees', 'createdAt', {
    //   type: Sequelize.DATE,
    //   allowNull: false,
    //   defaultValue: Sequelize.fn('NOW'), // Sets default value to current timestamp
    // });

    // await queryInterface.addColumn('Employees', 'updatedAt', {
    //   type: Sequelize.DATE,
    //   allowNull: false,
    //   defaultValue: Sequelize.fn('NOW'), // Sets default value to current timestamp
    // });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('employees');
  }
};
