import { Model, DataTypes } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        customer_name: DataTypes.STRING,
        discount_amount: DataTypes.FLOAT,
        type: DataTypes.ENUM('table', 'single', 'sand', 'other'),
        type_label: {
          type: DataTypes.VIRTUAL,
          get: function() {
            const dict = {table: 'mesa', single: 'avulsa', sand: 'areia', other: 'outro'};
            return dict[this.get('type')]
          }
        },
        payment_type: DataTypes.ENUM('cash', 'credit', 'debit', 'pix', 'transfer', 'check', 'other'),
        status: DataTypes.ENUM('open', 'paid', 'pending'),
        status_label: {
          type: DataTypes.VIRTUAL,
          get: function() {
            const dict = {open: 'aberta', paid: 'pago', pending: 'pendente'};
            return dict[this.get('status')]
          }
        },
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
  static associate(models) {
    this.belongsToMany(models.product, {
      through: "order_product",
      as: "products",
      foreignKey: "order_id",
    })
    this.belongsToMany(models.table, {
      through: "table_order",
      as: "tables",
      foreignKey: "order_id",
    })
  }
}

export default Order;
