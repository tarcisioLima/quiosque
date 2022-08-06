'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'orders',
        'payment_type',
        {
          type: Sequelize.ENUM('cash', 'credit', 'debit', 'pix', 'transfer', 'check', 'other'),
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        'table_orders',
        'payment_type',
        {
          type: Sequelize.ENUM('cash', 'credit', 'debit', 'pix', 'transfer', 'check', 'other'),
          allowNull: true,
        }
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('orders', 'payment_type'),
      queryInterface.removeColumn('table_orders', 'payment_type')
    ]);
  }
};
