const { Model, DataTypes } = require('sequelize');
const db = require('../../config/database');

class Clinic extends Model {}

Clinic.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  code: { type: DataTypes.STRING, allowNull: false, unique: true },
},{
    sequelize: db,
    modelName: 'Clinic',
    timestamps: true,
    paranoid: true,
    underscored: true,
    tableName: 'clinics',
    defaultScope: {
        attributes: { exclude: ['deleted_at'] },
    },
    scopes: {
        includeDeleted: {
            attributes: [],
        }
    }
});

module.exports = Clinic;