'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Receitas', 'categoria', {

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Receitas');
  }
};