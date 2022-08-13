const { Router } = require("express");
const ReceitasController = require("../controllers/receitaController");

const router = Router();

router
    .get("/receitas", ReceitasController.listarReceitas)
    .get("/receitas/:id", ReceitasController.listarUmaReceita)
    .post("/receitas", ReceitasController.cadastroReceita)
    .post("/receitas/:id/restaura", ReceitasController.restauraReceita)
    .put("/receitas/:id", ReceitasController.atualizarReceita)
    .delete("/receitas/:id", ReceitasController.excluiReceita)

module.exports = router;
