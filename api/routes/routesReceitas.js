const { Router } = require("express");
const ReceitasController = require("../controllers/receitaController");

const router = Router();

router.get("/receitas", ReceitasController.listarReceitas);
router.get("/receitas/:id", ReceitasController.listaUmaReceita);

module.exports = router;
