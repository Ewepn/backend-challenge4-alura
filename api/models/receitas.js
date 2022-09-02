"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Receitas extends Model {

		static associate(models) {

		}
	}
	Receitas.init(
		{
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
			data: {
				type: DataTypes.DATEONLY,
				allowNull: false,
				validate: {
					notNull: {
						args: true,
						msg: 'A data deve ser informada'
					},
					notEmpty: {
						args: true,
						msg: 'A data deve ser informada'
					}
				}
			},
		},
		{
			sequelize,
			modelName: "Receitas",
			paranoid: true,
		}
	);
	return Receitas;
};