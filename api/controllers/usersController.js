const database = require("../models");

class UsersController {
    static async listarUsuarios(req, res) {
    try {
			const listaCompleta = await database.Users.findAll();
			return res.status(200).json(listaCompleta);
		} catch (error){
			return res.status(500).json(error.message);
		}
	}

	static async listarUmUsuario(req, res){
		const { id } = req.params
		try{
			const umUsuario = await database.Users.findOne({where: {id: Number(id)}});
			return res.status(200).json(umUsuario);
		} catch (error){
			return res.status(500).json(error.message);
		}
	}

	static async cadastrarUsuario(req, res){
		const { usuario } = req.body
		const novoUsuario = req.body
		try{
			const usuarioExiste = await database.Users.findOne({where: {usuario}});
			if(usuarioExiste) {
				return res.status(500).json({message: "Usuário já existe!"});
			}
			
			const criarNovoUsuario = await database.Users.create(novoUsuario);
			return res.status(201).json(criarNovoUsuario);
		} catch (error){
			return res.status(500).json(error.message);
		}
	}

	static async atualizarUsuario(req, res){
		const { usuario } = req.body
		const { id } = req.params
		const novasInfos = req.body
		try{
			const usuarioExiste = await database.Users.findOne({where: {usuario}});
			if(usuarioExiste) {
				return res.status(500).json({message: "Usuário já existe!"});
			}

			await database.Users.update(novasInfos, {where: {id: Number(id)}});
			const usuarioAtualizado = await database.Users.findOne({where: {id: Number(id)}});
			return res.status(200).json(usuarioAtualizado);
		} catch (error){
			return res.status(500).json(error.message);
		}
	}

	static async excluirUsuario(req, res){
		const { id } = req.params
		try{
			await database.Users.destroy({where: {id: Number(id)}});
			return res.status(200).json({message: `Usuário com id:${id} excluido`});
		} catch (error){
			return res.status(500).json(error.message);
		}
	}

	static async restaurarUsuario(req, res){
		const { id } = req.params
		try {
			await database.Users.restore({ where: {id: Number(id)}});
			return res.status(200).json({message: `Usuário de id: ${id} foi restaurado com sucesso !`})
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}
}

module.exports = UsersController;
