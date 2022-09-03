const { Router } = require("express");
const UsersController = require("../controllers/usersController");
const { middlewaresAutenticacao } = require("../authenticate/exports");

const router = Router();

router
    .get("/usuarios", UsersController.listarUsuarios)
    .get("/usuarios/logout", middlewaresAutenticacao.bearer, UsersController.logoutUsuario)
    .get("/usuarios/:id", middlewaresAutenticacao.bearer, UsersController.listarUmUsuario)
    .post("/usuarios", UsersController.cadastrarUsuario)
    .post("/usuarios/:id/restaura", middlewaresAutenticacao.bearer, UsersController.restaurarUsuario)
    .post("/usuarios/login", middlewaresAutenticacao.local, UsersController.loginUsuario)
    .put("/usuarios/usuario/:id", middlewaresAutenticacao.bearer, UsersController.atualizarUsuario)
    .put("/usuarios/email/:id", middlewaresAutenticacao.bearer, UsersController.atualizarEmail)
    .put("/usuarios/senha/:id", middlewaresAutenticacao.bearer, UsersController.atualizarSenha)
    .delete("/usuarios/:id", middlewaresAutenticacao.bearer, UsersController.excluirUsuario)

module.exports = router;