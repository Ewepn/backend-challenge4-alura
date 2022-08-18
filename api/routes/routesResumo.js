const { Router } = require("express");
const ResumosController = require("../controllers/resumoController");

const router = Router();

router.get("/resumo/:ano/:mes", ResumosController.listarResumoAnoMes)

module.exports = router;