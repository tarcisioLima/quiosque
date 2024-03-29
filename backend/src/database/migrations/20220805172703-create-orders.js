module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      customer_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      discount_amount: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      type: {
        type: Sequelize.ENUM('table', 'single', 'sand', 'other'),
        allowNull: false,
        defaultValue: 'table'
      },
      status: {
        type: Sequelize.ENUM('open', 'paid'),
        allowNull: false,
      },
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
    return queryInterface.dropTable('orders');
  },
};