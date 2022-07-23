import Sequelize, { Model } from 'sequelize';

class CashierOperation extends Model {
  static init(sequelize) {
    super.init(
      {
        amount: Sequelize.FLOAT,
        type: Sequelize.ENUM('in', 'out', 'open', 'close'),
        description: Sequelize.TEXT,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default CashierOperation;
