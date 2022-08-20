'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('table_orders', 'payment_type'),
      queryInterface.removeColumn('table_orders', 'discount_amount'),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'table_orders',
        'payment_type',
        {
          type: Sequelize.ENUM('cash', 'credit', 'debit', 'pix', 'transfer', 'check', 'other'),
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        'table_orders',
        'discount_amount',
        {
          type: Sequelize.FLOAT,
          allowNull: true,
        }
      ),
    ]);
  }
};
