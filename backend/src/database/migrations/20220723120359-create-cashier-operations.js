module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cashier_operations', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      type: {
        type: Sequelize.ENUM('in', 'out', 'open', 'close'),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
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
    return queryInterface.dropTable('cashier_operations');
  },
};
