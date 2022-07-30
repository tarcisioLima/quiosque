import { Model, DataTypes } from 'sequelize';

class Cashier extends Model {
  static init(sequelize) {
    super.init(
      {
        amount: DataTypes.FLOAT,
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
        modelName: 'cashier',
        sequelize,
      }
    );

    return this;
  }
}

export default Cashier;
