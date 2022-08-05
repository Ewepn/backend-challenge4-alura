'use strict';

const { getDefaultSettings } = require("http2");

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Receitas', [{
      descricao: 'Salário',
      valor: 3000,
      data: new Date(2022, 8, 2),
      createdAT: new Date(),
      updatedAt: new Date()
    }], {});

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Receitas', null, {});

  }
};
