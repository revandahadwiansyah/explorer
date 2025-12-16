const {
  DB,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_MGT,
} = require("./constanta");

const knex = require("knex")({
  client: DB,
  connection: {
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    timezone: DB_MGT,
  },
});

module.exports = knex;
