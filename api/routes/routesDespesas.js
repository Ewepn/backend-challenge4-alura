const { Router } = require("express");
const DespesasController = require("../controllers/despesaController");

const router = Router();

router
    .get("/despesas", DespesasController.listarDespesas)
    .get("/despesas/:ano/:mes", DespesasController.listarDespesasPorAnoEMes)
    .get("/despesas/:id", DespesasController.listarUmaDespesa)
    .post("/despesas", DespesasController.cadastroDespesa)
    .post("/despesas/:id/restaura", DespesasController.restauraDespesas)
    .put("/despesas/:id", DespesasController.atualizarDespesa)
    .delete("/despesas/:id", DespesasController.excluiDespesa)

module.exports = router;
