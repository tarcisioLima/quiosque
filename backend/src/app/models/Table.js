import { Model, DataTypes } from 'sequelize';

class Table extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        status: DataTypes.ENUM('free', 'opened', 'blocked'),
        type: DataTypes.ENUM('normal', 'sand', 'other'),
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
        modelName: 'table',
        sequelize,
      }
    );

    return this;
  }
}

export default Table;
