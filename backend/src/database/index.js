import Sequelize from 'sequelize';
import User from '../app/models/User';
import Product from '../app/models/Product';
import Cashier from '../app/models/Cashier';
import CashierOperation from '../app/models/CashierOperation';
import CashierOperationHistory from '../app/models/CashierOperationHistory';

import databaseConfig from '../config/database';

const models = [
  User,
  Product,
  Cashier,
  CashierOperation,
  CashierOperationHistory,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
