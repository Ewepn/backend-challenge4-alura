'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Despesas extends Model {

    static associate(models) {

    }
  }
  Despesas.init({
    descricao: DataTypes.STRING,
    valor: DataTypes.DECIMAL,
    data: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Despesas',
  });
  return Despesas;
};