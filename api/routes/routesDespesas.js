const { Router } = require("express");
const DespesasController = require("../controllers/despesaController");
const { middlewaresAutenticacao } = require("../authenticate/exports");

const router = Router();

router
    .get("/despesas", middlewaresAutenticacao.bearer, DespesasController.listarDespesas)
    .get("/despesas/:ano/:mes", middlewaresAutenticacao.bearer, DespesasController.listarDespesasPorAnoEMes)
    .get("/despesas/:id", middlewaresAutenticacao.bearer, DespesasController.listarUmaDespesa)
    .post("/despesas", middlewaresAutenticacao.bearer, DespesasController.cadastroDespesa)
    .post("/despesas/:id/restaura", middlewaresAutenticacao.bearer, DespesasController.restauraDespesas)
    .put("/despesas/:id", middlewaresAutenticacao.bearer, DespesasController.atualizarDespesa)
    .delete("/despesas/:id", middlewaresAutenticacao.bearer, DespesasController.excluiDespesa)

module.exports = router;
