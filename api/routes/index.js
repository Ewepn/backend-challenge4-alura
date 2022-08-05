const bodyParser = require("body-parser");
const receitas = require("./routesReceitas");
const despesas = require("./routesDespesas");

module.exports = (app) => {
	app.use(bodyParser.json());
	app.use(receitas);
	app.use(despesas);
};
