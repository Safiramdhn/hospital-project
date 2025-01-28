const { Model, DataTypes } = require('sequelize');
const db = require('../../config/database');

class TariffReference extends Model {}

TariffReference.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    tariff_code: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    base_registration_fee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    base_examination_fee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize: db,
    tableName: 'tariff_references',
    modelName: 'TariffReference',
    timestamps: true,
    underscored: true,
    paranoid: true, // enable soft deletes
    defaultScope: {
      attributes: { exclude: ['deleted_at'] },
    },
    scopes: {
      includeDeleted: {
        attributes: [],
      },
    },
  }
);

module.exports = TariffReference;
