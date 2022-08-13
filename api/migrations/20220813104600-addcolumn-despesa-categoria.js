'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Despesas', 'categoria', {
        type: Sequelize.STRING,
        defaultValue: 'Outras',
        allowNull: true,
        after: 'descricao'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Despesas', 'categoria');
  }
};