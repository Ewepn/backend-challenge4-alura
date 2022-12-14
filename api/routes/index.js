const bodyParser = require("body-parser");
const receitas = require("./routesReceitas");
const despesas = require("./routesDespesas");
const resumo = require("./routesResumo");
const usuarios = require("./routesUsuarios");

module.exports = (app) => {
	app.use(bodyParser.json());
	app.use(receitas);
	app.use(despesas);
	app.use(resumo);
	app.use(usuarios);
};
