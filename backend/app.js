require("dotenv").config();
require("module-alias/register");
const express = require("express");
const morgan = require("morgan");
const knex = require("knex");
const config = require("./knexfile");
const { PORT_MODULE } = require("@config/constanta");
const app = express();
const routes = require("@routes/index");
const schedule = require("node-schedule");
const cors = require("cors");
const PORT = PORT_MODULE || 8080;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);
app.use(function (req, res) {
  res.status(404).json({ status: false, msg: "routes not found!", data: null });
});

app.listen(PORT, () => {
  console.log("Run in port: " + PORT);
});
