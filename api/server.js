const express = require("express");
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 4002;

routes(app);

app.listen(port, () => {
	console.log(`O servidor está rodando na porta http://localhost:${port}`);
});

module.exports = app;
