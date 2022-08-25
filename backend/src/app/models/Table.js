import { Model, DataTypes } from 'sequelize';

class Table extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        status: DataTypes.ENUM('free', 'opened', 'blocked'),
        status_label: {
          type: DataTypes.VIRTUAL,
          get: function() {
            const dict = {free: 'livre', opened: 'aberta', blocked: 'bloqueada'};
            return dict[this.get('status')]
          }
        },
        type: DataTypes.ENUM('normal', 'sand', 'other'),
        type_label: {
          type: DataTypes.VIRTUAL,
          get: function() {
            const dict = {normal: 'comum', sand: 'areia', other: 'outro'};
            return dict[this.get('type')]
          }
        },
        disabled: DataTypes.BOOLEAN,
        discount_amount: DataTypes.FLOAT,
        payment_type: DataTypes.ENUM('cash', 'credit', 'debit', 'pix', 'transfer', 'check', 'other'),
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
        modelName: 'table',
        sequelize,
      }
    );

    return this;
  }
  static associate(models) {
    this.belongsToMany(models.order, {
      through: "table_order",
      as: "orders",
      foreignKey: "table_id",
    })
  }
}

export default Table;
