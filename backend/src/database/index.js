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

  async init() {
    const uri = `postgres://${databaseConfig.username}:${databaseConfig.password}@${databaseConfig.host}/${databaseConfig.database}`;
    this.connection = new Sequelize(uri);

    try {
      await this.connection.authenticate();
      console.log('Database Connection has been established successfully.');

      models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));

    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
}

export default new Database();
