require("dotenv").config();

module.exports = {
	development: {
		username: process.env.USER_NAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DATABASE_NAME,
		host: process.env.DB_HOST,
		dialect: "mysql",
	},
	test: {
		username: process.env.USER_NAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DATABASE_NAME,
		host: process.env.DB_HOST,
		dialect: "mysql",
	},
	production: {
		username: process.env.USER_NAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DATABASE_NAME,
		host: process.env.DB_HOST,
		dialect: "mysql",
	},
};
