import { Model, DataTypes } from 'sequelize';

class Products extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        sell_price: DataTypes.FLOAT,
        cost_price: DataTypes.FLOAT,
        code: DataTypes.STRING,
        disabled: DataTypes.BOOLEAN,
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
        modelName: 'product',
        sequelize,
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsToMany(models.order, {
      through: "order_product",
      as: "orders",
      foreignKey: "product_id",
    })
  }
}

export default Products;
