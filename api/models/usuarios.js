'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {

    static associate(models) {
  
    }
  }
  Users.init({
    usuario: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [4, 10],
          msg: "O nome de usuário precisa ter entre 4 e 10 caracteres"
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "dados de Email inválido"
        }
      },
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "A senha não pode ser vazia"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Users',
    paranoid: true
  });
  return Users;
};