const { Model, DataTypes } = require('sequelize');
const db = require('../../config/database');
const TariffReference = require('./tariffReferenceModel');
const VisitDetail = require('./visitDetailModel');

class BillingDetail extends Model {}

BillingDetail.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    registration_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'outpatient_registrations',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    treatment: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    registration_fee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0.00
    },
    examination_fee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0.00
    },
    total_fee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0.00
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0.00
    },
    total_payment: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    amount_due: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
  },
  {
    sequelize: db,
    tableName: 'billing_details',
    modelName: 'BillingDetail',
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
    hooks: {
      beforeCreate: async (billingDetail, options) => {
        console.log('Before Create Hook: Fetching visit details and tariff reference');
        const transaction = options.transaction; // Extract transaction from options
        const visitDetails = await VisitDetail.findOne({
          where: { registration_id: billingDetail.registration_id },
          transaction, // Include the transaction in the query
        });
    
        if (visitDetails) {
          console.log('Visit details found:', visitDetails);
          const tariffReference = await TariffReference.findOne({
            where: { tariff_code: visitDetails.tariff_code },
            transaction, // Include the transaction in the query
          });
    
          if (tariffReference) {
            console.log('Tariff reference found:', tariffReference);
            billingDetail.registration_fee = parseFloat(tariffReference.base_registration_fee);
            billingDetail.examination_fee = parseFloat(tariffReference.base_examination_fee);
            billingDetail.total_fee = (billingDetail.registration_fee + billingDetail.examination_fee);
            console.log('total_fee:', billingDetail.total_fee)
            if (billingDetail.discount > 0) {
              billingDetail.total_payment = billingDetail.total_fee - (billingDetail.total_fee * billingDetail.discount) / 100;
            } else {
              billingDetail.total_payment = billingDetail.total_fee;
            }
            console.log('Billing detail calculated:', billingDetail);
          } else {
            console.log('No tariff reference found for tariff code:', visitDetails.tariff_code);
          }
        } else {
          console.log('No visit details found for registration ID:', billingDetail.registration_id);
        }
      },
    }
    
  }
);

module.exports = BillingDetail;
