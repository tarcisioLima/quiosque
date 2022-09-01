import { Model, DataTypes } from 'sequelize';

class TableOrder extends Model {
  static init(sequelize) {
    super.init(
      {
        table_id: DataTypes.INTEGER,
        order_id: DataTypes.INTEGER,
        gathered_tables: DataTypes.STRING,
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
        modelName: 'table_order',
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.table, { foreignKey: 'table_id', as: 'table' });
    this.belongsTo(models.order, {
      foreignKey: 'order_id',
      as: 'order',
    });
  }
}

export default TableOrder;
