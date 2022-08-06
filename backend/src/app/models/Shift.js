import { Model, DataTypes } from 'sequelize';

class Shift extends Model {
  static init(sequelize) {
    super.init(
      {
        type: DataTypes.ENUM('morning', 'night'),
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
        modelName: 'shift',
        sequelize,
      }
    );

    return this;
  }
}

export default Shift;
