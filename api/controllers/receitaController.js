const database  = require("../models");

class ReceitaController {
	static async listarReceitas(req, res) {
		try {
			const listaCompleta = await database.Receitas.findAll();
			return res.status(200).json(listaCompleta);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async listaUmaReceita(req, res){
		const { id } = req.params
		try{
			const umaReceita = await database.Receitas.findOne({where: {id: Number(id)}});
			return res.status(200).json(umaReceita);
		} catch (error){
			return res.status(500).json(error.message);
		}
	}
}

module.exports = ReceitaController;
