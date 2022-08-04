const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 4002;

app.get("/teste", (req, res) => {
	res.status(200).send({ message: "bem vindo" });
});

app.listen(port, () => {
	console.log(`O servidor está rodando na porta http://localhost:${port}`);
});

module.exports = app;
