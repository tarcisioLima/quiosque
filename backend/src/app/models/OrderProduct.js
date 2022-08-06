import { Model, DataTypes } from 'sequelize';

class OrderProduct extends Model {
  static init(sequelize) {
    super.init(
      {
        order_id: DataTypes.INTEGER,
        product_id: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
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
        modelName: 'order_product',
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.order, { foreignKey: 'order_id', as: 'order' });
    this.belongsTo(models.product, {
      foreignKey: 'product_id',
      as: 'product',
    });
  }
}

export default OrderProduct;
