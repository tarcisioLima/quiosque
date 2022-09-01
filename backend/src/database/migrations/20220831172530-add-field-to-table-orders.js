'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
        'table_orders',
        'gathered_tables',
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      );
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('table_orders', 'gathered_tables')
  },
};
