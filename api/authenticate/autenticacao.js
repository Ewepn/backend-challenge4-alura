const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const database = require('../models');
const bcrypt = require('bcrypt');
const BearerStrategy = require("passport-http-bearer").Strategy;
const jwt = require("jsonwebtoken");
const blacklist = require('../redis/manipula-blacklist');

function verificaUsuario(usuario){
    if (!usuario) {
        throw new Error('Erro de autenticação: Email ou senha inválidos !');
    }
}

async function verificaSenha(senha, senhaHash){
    const senhaValida = await bcrypt.compare(senha, senhaHash);
    if (!senhaValida) {
        throw new Error('Erro de autenticação: Email ou senha inválidos !');
    }
}

async function verificaTokenNaBlacklist(token){
    const tokenNaBlackList = await blacklist.verifica(token);
    if(tokenNaBlackList){
        throw new jwt.JsonWebTokenError('Token inválido (efetue o login e tente novamente) !');
    }
}

passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha',
        session: false
    }, async (email, senha, done) => {
        try {
            const usuario = await database.Users.findOne({where: {email: email}});
            verificaUsuario(usuario);
            await verificaSenha(senha, usuario.senha);
            done(null, usuario);
        } catch (error) {
            done(error);
        }
    })
);

passport.use(
    new BearerStrategy(
        async (token, done) =>{
            try {
                await verificaTokenNaBlacklist(token);   
                const payload = jwt.verify(token, process.env.CHAVE_JWT);
                const usuario = await database.Users.findOne({where: {id: payload.id}});
                done(null, usuario, {token : token});
            } catch (error) {
                done(error);
            }
        }
    )
)