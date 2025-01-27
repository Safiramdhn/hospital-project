const { Model, DataTypes } = require('sequelize');
const db = require('../../config/database');
const moment = require('moment');

class OutPatientRegistration extends Model {}

OutPatientRegistration.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  patient_id: { type: DataTypes.INTEGER, references: { model: 'patients', key: 'id' } },
  registration_number: { type: DataTypes.STRING, unique: true },
  booking_number: { type: DataTypes.STRING, unique: true},
  session: { type: DataTypes.ENUM('Fullday', 'Halfday') },
  visit_date: { type: DataTypes.DATE, allowNull: false },
  last_visit: { type: DataTypes.DATE },
  notes: { type: DataTypes.STRING, allowNull: true },
}, {
  sequelize: db,
  tableName: 'outpatient_registrations',
  modelName: 'OutPatientRegistration',
  timestamps: true,
  underscored: true,
  paranoid: true, // enable soft deletes
  defaultScope: {
    attributes: { exclude: ['deleted_at'] },
  },
  hooks: {
    beforeCreate: async (data) => {
      console.log('Executing beforeCreate hook...');
      console.log('Input data:', data);
  
      const RegisterPrefix = 'RG';
      const lastID = (await OutPatientRegistration.max('id')) || 0;
      const paddedID = String(lastID + 1).padStart(8, '0');
      data.registration_number = `${RegisterPrefix}${paddedID}`;
      data.booking_number = `${lastID}${moment().format('YYYYMMDD')}`;
  
      const lastVisit = await OutPatientRegistration.findOne({
        where: { patient_id: data.patient_id },
        order: [['id', 'DESC']],
      });
      data.last_visit = lastVisit
        ? moment(lastVisit.last_visit).format('YYYY-MM-DD')
        : moment().format('YYYY-MM-DD');
  
      console.log('Generated data:', {
        registration_number: data.registration_number,
        booking_number: data.booking_number,
        last_visit: data.last_visit,
      });
    },
  },
  
});

module.exports = OutPatientRegistration;