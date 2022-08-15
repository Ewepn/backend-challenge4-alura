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
        isIn: {
          args: [["Lazer", "Alimentação", "Saúde", "Moradia", "Transporte", "Imprevistos", "Educação", "Outras"]],
          msg: 'Em categoria são permitidos apenas estes valores: Lazer, Alimentação, Saúde, Moradia, Transporte, Imprevistos, Educação, Outras, (não esqueça da acentuação e da primeira letra maiúscula) A inforção da categoria é opcional por padrão se a categoria não for especificada o valor automaticamente será (Outras) !'
        }
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