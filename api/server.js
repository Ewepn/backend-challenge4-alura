const express = require("express");
const routes = require('./routes');
const { estrategiasAutenticacao } = require("./authenticate/exports");
require('./redis/blacklist');

const app = express();
const port = process.env.PORT || 4002;

routes(app);

app.listen(port, () => {
	console.log(`O servidor está rodando na porta http://localhost:${port}`);
});

module.exports = app;
