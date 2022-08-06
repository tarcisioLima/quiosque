import { Model, DataTypes } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        customer_name: DataTypes.STRING,
        discount_amount: DataTypes.FLOAT,
        type: DataTypes.ENUM('table', 'single', 'sand', 'other'),
        payment_type: DataTypes.ENUM('cash', 'credit', 'debit', 'pix', 'transfer', 'check', 'other'),
        status: DataTypes.ENUM('open', 'paid'),
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
        modelName: 'order',
        sequelize,
      }
    );

    return this;
  }
}

export default Order;