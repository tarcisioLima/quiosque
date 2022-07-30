import { Model, DataTypes } from 'sequelize';

class CashierOperation extends Model {
  static init(sequelize) {
    super.init(
      {
        amount: DataTypes.FLOAT,
        type: DataTypes.ENUM('in', 'out', 'open', 'close'),
        description: DataTypes.TEXT,
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
        modelName: 'cashier_operation',
        sequelize,
      }
    );

    return this;
  }
}

export default CashierOperation;
