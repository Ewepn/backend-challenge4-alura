const bodyParser = require("body-parser");
const receitas = require("./routesReceitas");

module.exports = (app) => {
	app.use(bodyParser.json());
	app.use(receitas);
};
