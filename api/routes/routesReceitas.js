const { Router } = require("express");
const ReceitasController = require("../controllers/receitaController");
const { middlewaresAutenticacao } = require("../authenticate/exports");

const router = Router();

router
    .get("/receitas", middlewaresAutenticacao.bearer, ReceitasController.listarReceitas)
    .get("/receitas/:ano/:mes", middlewaresAutenticacao.bearer, ReceitasController.listarReceitasPorAnoEMes)
    .get("/receitas/:id", middlewaresAutenticacao.bearer, ReceitasController.listarUmaReceita)
    .post("/receitas", middlewaresAutenticacao.bearer, ReceitasController.cadastroReceita)
    .post("/receitas/:id/restaura", middlewaresAutenticacao.bearer, ReceitasController.restauraReceita)
    .put("/receitas/:id", middlewaresAutenticacao.bearer, ReceitasController.atualizarReceita)
    .delete("/receitas/:id", middlewaresAutenticacao.bearer, ReceitasController.excluiReceita)

module.exports = router;
