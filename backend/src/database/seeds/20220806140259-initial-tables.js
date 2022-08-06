'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const tables = [];

    for (let i = 0; i < 19; i++) {
      const newTable = {
        name: 'M'+(i+1),
        status: 'free',
        type: 'normal',
        created_at: new Date(),
        updated_at: new Date(),
      }
      tables.push(newTable)
    }

    await queryInterface.bulkInsert('tables', tables, {});    
  },

  async down (queryInterface, Sequelize) {  
    await queryInterface.bulkDelete('tables', null, {});     
  }
};
