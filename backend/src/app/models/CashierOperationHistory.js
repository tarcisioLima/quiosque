import { Model, DataTypes } from 'sequelize';

class CashierOperationHistory extends Model {
  static init(sequelize) {
    super.init(
      {
        cashier_id: DataTypes.INTEGER,
        cashier_operation_id: DataTypes.INTEGER,
        createdAt: {
          field: 'created_at',
          type: DataTypes.DATE,
        },
        updatedAt: {
          field: 'updated_at',
          type: DataTypes.DATE,
        },
      },
      {
        modelName: 'cashier_operation_history',
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.cashier, { foreignKey: 'cashier_id', as: 'cashier' });
    this.belongsTo(models.cashier_operation, {
      foreignKey: 'cashier_operation_id',
      as: 'cashier_operation',
    });
  }
}

export default CashierOperationHistory;
