'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'tables',
        'payment_type',
        {
          type: Sequelize.ENUM('cash', 'credit', 'debit', 'pix', 'transfer', 'check', 'other'),
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        'tables',
        'discount_amount',
        {
          type: Sequelize.FLOAT,
          allowNull: true,
        }
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('tables', 'payment_type'),
      queryInterface.removeColumn('tables', 'discount_amount'),
    ]);
  },
};
