const { Router } = require("express");
const UsersController = require("../controllers/usersController");

const router = Router();

router
    .get("/usuarios", UsersController.listarUsuarios)
    .get("/usuarios/:id", UsersController.listarUmUsuario)
    .post("/usuarios", UsersController.cadastrarUsuario)
    .post("/usuarios/:id/restaura", UsersController.restaurarUsuario)
    .put("/usuarios/usuario/:id", UsersController.atualizarUsuario)
    .put("/usuarios/email/:id", UsersController.atualizarEmail)
    .put("/usuarios/senha/:id", UsersController.atualizarSenha)
    .delete("/usuarios/:id", UsersController.excluirUsuario)

module.exports = router;