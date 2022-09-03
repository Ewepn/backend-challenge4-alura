const database = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklist = require('../redis/manipula-blacklist');

function criarTokenJWT(usuario){
	const payload = {
		id: usuario.id
	};
	const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: '24h' });
	return token;
}

class UsersController {	
	static loginUsuario(req, res){
		const token = criarTokenJWT(req.user);
		res.set('Authorization', token);
		res.status(200).json({message: 'Login efetuado com sucesso !'});
	}

	static async logoutUsuario(req, res){
		try {			
			const token = req.token;
			await blacklist.adiciona(token);
			res.status(204).send();
		} catch (error) {
			res.status(500).json(error.message);
		}
	}

    static async listarUsuarios(req, res) {
    	try {
			const listaCompleta = await database.Users.findAll({attributes: ['id', 'usuario']});
			return res.status(200).json(listaCompleta);
		} catch (error){
			return res.status(500).json(error.message);
		}
	}

	static async listarUmUsuario(req, res){
		const { id } = req.params
		try{
			const umUsuario = await database.Users.findOne({attributes: ['id', 'usuario', 'email', 'createdAt', 'updatedAt', 'deletedAt'],where: {id: Number(id)}});
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
				return res.status(409).json({message: "Usuário já existe!"});
			}

			bcrypt.hash(req.body.senha, 12, async(errBcrypt, hash) =>{
				if (errBcrypt) {
					return res.status(500).json({ error: errBcrypt });
				}

				try {
					await database.Users.create({usuario: req.body.usuario, email: req.body.email, senha: hash});

					const novoUsuario = await database.Users.findOne({attributes: ['id', 'usuario', 'email'],where: {usuario: req.body.usuario}});

					res.status(201).json({message: 'Usuário cadastrado com sucesso !',usuarioCadastrado: novoUsuario});

				} catch (error) {
					res.status(400).json(error.message);
				}
			});
		} catch (error){
			return res.status(500).json({ message: 'Não foi possível cadastrar o usuário !'});
		}
	}

	static async atualizarUsuario(req, res){
		const { usuario } = req.body
		const { id } = req.params
		try {
			const usuarioExiste = await database.Users.findOne({where: {usuario}});
			if(usuarioExiste){
				return res.status(409).json({message: "Usuário já existe!"});
			}

			await database.Users.update({ usuario: req.body.usuario }, {where: {id: Number(id)}});

			const usuarioAtualizado = await database.Users.findOne({attributes: ['id', 'usuario'],where: {id: Number(id)}});
			res.status(200).json({message: 'Usuário atualizado com sucesso !',usuarioAtualizado: usuarioAtualizado});

		} catch (error) {
			res.status(500).json(error.message);
		}	
	}

	static async atualizarEmail(req, res){
		const { id } = req.params
		try {
			await database.Users.update({ email: req.body.email }, {where: {id: Number(id)}});
			
			const emailAtualizado = await database.Users.findOne({attributes: ['id', 'email'],where: {id: Number(id)}});
			req.body.email ? res.status(200).json({message: 'Email atualizado com sucesso !',emailAtualizado: emailAtualizado}) : res.status(400).json({message: 'O campo de email não pode ser vazio'});

		} catch (error) {
			res.status(500).json(error.message);
		}
	}

	static async atualizarSenha(req, res){
		const { id } = req.params
		const novaSenha = req.body.senha

		switch (String(novaSenha).length > 4) {
			case true:
				try {
					bcrypt.hash(req.body.senha, 12, async (errBcrypt, hash) =>{
						if (errBcrypt) {
							return res.status(400).json({message: 'A senha não foi definida'});
						}
						await database.Users.update({senha: hash}, {where: {id: Number(id)}});
						res.status(200).json({message: 'Senha atualizada com sucesso !'});		
					});
				} catch (error) {
					res.status(500).json(error.message);
				}
				break;
			default:
				res.status(400).json({message: 'O campo senha deve ter mais de 4 caracteres !'});
				break;
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
