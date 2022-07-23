import Sequelize, { Model } from 'sequelize';

class Cashier extends Model {
  static init(sequelize) {
    super.init(
      {
        amount: Sequelize.FLOAT,
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

export default Cashier;
