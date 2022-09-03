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
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'A descrição deve ser informada'
        },
        notEmpty: {
          args: true,
          msg: 'A descrição deve ser informada'
        }
      }
    },
    valor: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'O valor deve ser informado'
        },
        notEmpty: {
          args: true,
          msg: 'O valor deve ser informado'
        }
      }
    },
    categoria: {
      type: DataTypes.STRING,
      defaultValue: 'Outras',
      validate: {
        isIn: {
          args: [["Lazer", "Alimentação", "Saúde", "Moradia", "Transporte", "Imprevistos", "Educação", "Outras"]],
          msg: 'Em categoria são permitidos apenas estes valores: Lazer, Alimentação, Saúde, Moradia, Transporte, Imprevistos, Educação, Outras, (não esqueça da acentuação e da primeira letra maiúscula) A informação da categoria é opcional por padrão se a categoria não for especificada o valor automaticamente será (Outras) !'
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