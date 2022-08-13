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
    categoria: {
      type: DataTypes.STRING,
      defaultValue: 'Outras',
      validate: {
        isIn: [["Lazer", "Alimentação", "Saúde", "Moradia", "Transporte", "Imprevistos", "Educação", "Outras"]]
      }
    },
    data: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Despesas',
    paranoid: true,
  });
  return Despesas;
};