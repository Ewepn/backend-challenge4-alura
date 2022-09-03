const database  = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op

class ReceitaController {
	static async listarReceitas(req, res) {
		const  descricaoReceitas  = req.query.descricao
		const where = {}
		descricaoReceitas ? where.descricao = {} : null;
		descricaoReceitas ? where.descricao[Op.like] = `${descricaoReceitas}` : null;

		try {
			const listaCompleta = await database.Receitas.findAll({attributes: ['id', 'descricao', 'valor']},{where});
			return res.status(200).json(listaCompleta);
		} catch (error){
			return res.status(500).json(error.message);
		}
	}

	static async listarUmaReceita(req, res){
		const { id } = req.params
		try{
			const umaReceita = await database.Receitas.findOne({where: {id: Number(id)}});
			return res.status(200).json(umaReceita);
		} catch (error){
			return res.status(500).json(error.message);
		}
	}

	static async listarReceitasPorAnoEMes(req, res){
		const { ano, mes } = req.params
		const where = {}
		ano || mes ? where.data = {} : null; 
		ano || mes ? where.data[Op.startsWith] = `${ano}-${mes}` : null;
		
		try {
			const resultado = await database.Receitas.findAndCountAll({where});		
			return res.status(200).json(resultado); 
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async cadastroReceita(req, res){
		const novaReceita = req.body
		try{

			const criarNovaReceita = await database.Receitas.create(novaReceita);
			return res.status(201).json(criarNovaReceita);

		} catch (error){
			return res.status(500).json(error.message);
		}
	}

	static async atualizarReceita(req, res){
		const { id } = req.params
		const novasInfos = req.body
		try{
			await database.Receitas.update(novasInfos, {where: {id: Number(id)}});
			const receitaAtualizada = await database.Receitas.findOne({where: {id: Number(id)}});
			return res.status(200).json(receitaAtualizada);
		} catch (error){
			return res.status(500).json(error.message);
		}
	}

	static async excluiReceita(req, res){
		const { id } = req.params
		try{
			await database.Receitas.destroy({where: {id: Number(id)}});
			return res.status(200).json({message: `Recita com id:${id} excluida`});
		} catch (error){
			return res.status(500).json(error.message);
		}
	}

	static async restauraReceita(req, res){
		const { id } = req.params
		try {
			await database.Receitas.restore({ where: {id: Number(id)}});
			return res.status(200).json({message: `Receita de id: ${id} foi restaurada com sucesso !`})
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}
}

module.exports = ReceitaController;
