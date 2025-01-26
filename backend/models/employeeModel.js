const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");

class Employee extends Model {}

Employee.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: 'Employee',
    hooks: {
      beforeCreate: async (employee, options) => {
        if (employee.password) {
          employee.password = await bcrypt.hash(employee.password, 10);
        }
      },
    },
    timestamps: true,  // This is required for Sequelize to handle `createdAt` and `updatedAt`
    underscored: true, // Use snake_case for timestamps
  }
);

module.exports = Employee;
