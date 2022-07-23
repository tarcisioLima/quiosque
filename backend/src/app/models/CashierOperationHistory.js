import Sequelize, { Model } from 'sequelize';

class CashierOperationHistory extends Model {
  static init(sequelize) {
    super.init(
      {
        cashier_id: Sequelize.INTEGER,
        cashier_operation_id: Sequelize.INTEGER,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Cashier, { foreignKey: 'cashier_id', as: 'cashier' });
    this.belongsTo(models.CashierOperation, {
      foreignKey: 'cashier_operation_id',
      as: 'cashier_operation',
    });
  }
}

export default CashierOperationHistory;
