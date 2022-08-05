module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('table_orders', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      table_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'tables',
          key: 'id',
        },
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'orders',
          key: 'id',
        },
      },
      discount_amount: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      /*payment_type: {
        type: Sequelize.ENUM('cash', 'credit', 'debit', 'pix', 'transfer', 'check', 'other'),
        allowNull: true,
      },*/
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('table_orders');
  },
};