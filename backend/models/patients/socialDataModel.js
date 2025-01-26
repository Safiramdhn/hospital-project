const { Model, DataTypes } = require('sequelize');
const db = require('../../config/database');

class PatientSocialData extends Model {}

PatientSocialData.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
    patient_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'patients', //reference to patients table
        key: 'id', //reference to id in the patients table
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    address: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    postal_code: { type: DataTypes.STRING, allowNull: true },
    mr_date: { type: DataTypes.DATE, allowNull: false },
    weight: { type: DataTypes.INTEGER, allowNull: false },
    ethnicity: {
      type: DataTypes.ENUM(
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
  },
  {
    sequelize: db,
    tableName: 'patient_social_data',
    modelName: 'PatientSocialData',
    timestamps: true,
    underscored: true,
    paranoid: true, //enable soft deletes
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

module.exports = PatientSocialData;