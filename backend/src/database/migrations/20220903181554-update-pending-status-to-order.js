'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`ALTER TYPE "enum_orders_status" ADD VALUE 'pending'`);      
  },
  async down (queryInterface, Sequelize) {
    return null;
  },
};
