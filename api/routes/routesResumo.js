const { Router } = require("express");
const ResumosController = require("../controllers/resumoController");
const { middlewaresAutenticacao } = require("../authenticate/exports");

const router = Router();

router.get("/resumo/:ano/:mes", middlewaresAutenticacao.bearer, ResumosController.listarResumoAnoMes)

module.exports = router;