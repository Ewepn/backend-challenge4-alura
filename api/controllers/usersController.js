const database = require("../models");
const bcrypt = require("bcrypt");

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
		try{
			const usuarioExiste = await database.Users.findOne({where: {usuario}});
			if(usuarioExiste) {
				return res.status(500).json({message: "Usuário já existe!"});
			}

			bcrypt.hash(req.body.senha, 12, async (errBcrypt, hash) =>{
				if (errBcrypt) {
					return res.status(500).json({ error: errBcrypt });
				}
				const criarNovoUsuario = await database.Users.create({usuario: req.body.usuario, email: req.body.email, senha: hash});
				return res.status(201).json(criarNovoUsuario);
			});
			
		} catch (error){
			return res.status(500).json({ message: 'Não foi possível cadastrar o usuário !'});
		}
	}

	static async atualizarUsuario(req, res){
		const { usuario } = req.body
		const { id } = req.params
		let usuarioExiste;
		try{
			usuario ? usuarioExiste = await database.Users.findOne({where: {usuario}}) : undefined

			if(usuarioExiste){
				return res.status(500).json({message: "Usuário já existe!"});
			}

			if(req.body.usuario != null && req.body.usuario != undefined && req.body.usuario != ''){
				await database.Users.update({ usuario: req.body.usuario }, {where: {id: Number(id)}});
			}

			if(req.body.email != null && req.body.email != undefined && req.body.email != ''){
				await database.Users.update({ email: req.body.email }, {where: {id: Number(id)}});
			}

			if(req.body.senha != null && req.body.senha != undefined && req.body.senha != ''){
				bcrypt.hash(req.body.senha, 12, async (errBcrypt, hash) =>{
					if (errBcrypt) {
						return res.status(500).json({ error: errBcrypt });
					}
	
					await database.Users.update({senha: hash}, {where: {id: Number(id)}});
				});
			}
			
			const usuarioAtualizado = await database.Users.findOne({where: {id: Number(id)}});
			return res.status(200).json(usuarioAtualizado);
		} catch (error){
			return res.status(500).json({ message: 'Não foi possível atualizar o usuário !'});
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
			return res.status(500).json({ message: 'Não foi possível restaurar este usuário !'});
		}
	}
}

module.exports = UsersController;
