const database  = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op

class DespesaController {
	static async listarDespesas(req, res) {
		const  descricaoDespesas  = req.query.descricao
		const where = {}
		descricaoDespesas ? where.descricao = {} : null;
		descricaoDespesas ? where.descricao[Op.like] = `${descricaoDespesas}` : null;

		try {
			const listaCompleta = await database.Despesas.findAll({attributes: ['id', 'descricao', 'categoria', 'valor']},{where});
			return res.status(200).json(listaCompleta);
		} catch (error){
			return res.status(500).json(error.message);
		}
	}

	static async listarUmaDespesa(req, res){
		const { id } = req.params
		try{
			const umaDespesa = await database.Despesas.findOne({where: {id: Number(id)}});
			return res.status(200).json(umaDespesa);
		} catch (error){
			return res.status(500).json(error.message);
		}
	}

	static async listarDespesasPorAnoEMes(req, res){
		const { ano, mes } = req.params
		const where = {}
		ano || mes ? where.data = {} : null; 
		ano || mes ? where.data[Op.startsWith] = `${ano}-${mes}` : null;
		
		try {
			const resultado = await database.Despesas.findAndCountAll({where});		
			return res.status(200).json(resultado); 
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async cadastroDespesa(req, res){
		const novaDespesa = req.body
		try{
			const criarNovaDespesa = await database.Despesas.create(novaDespesa);
			return res.status(201).json(criarNovaDespesa);
		} catch (error){
			return res.status(500).json(error.message);
		}
	}

	static async atualizarDespesa(req, res){
		const { id } = req.params
		const novasInfos = req.body
		try{
			await database.Despesas.update(novasInfos, {where: {id: Number(id)}});
			const despesaAtualizada = await database.Despesas.findOne({where: {id: Number(id)}});
			return res.status(200).json(despesaAtualizada);
		} catch (error){
			return res.status(500).json(error.message);
		}
	}

	static async excluiDespesa(req, res){
		const { id } = req.params
		try{
			await database.Despesas.destroy({where: {id: Number(id)}});
			return res.status(200).json({message: `Despesa com id:${id} excluida`});
		} catch (error){
			return res.status(500).json(error.message);
		}
	}

	static async restauraDespesas(req, res){
		const { id } = req.params
		try {
			await database.Despesas.restore({ where: {id: Number(id)}});
			return res.status(200).json({message: `Despesa de id: ${id} foi restaurada com sucesso !`})
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}
}

module.exports = DespesaController;
