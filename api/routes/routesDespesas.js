const { Router } = require("express");
const DespesasController = require("../controllers/despesaController");

const router = Router();

router
    .get("/despesas", DespesasController.listarDespesas)
    .get("/despesas/:id", DespesasController.listarUmaDespesa)
    .post("/despesas", DespesasController.cadastroDespesa)
    .put("/despesas/:id", DespesasController.atualizarDespesa)
    .delete("/despesas/:id", DespesasController.excluiDespesa)

module.exports = router;
