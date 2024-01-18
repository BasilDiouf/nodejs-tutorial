const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");

const app = express();
const port = 3000;

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());

sequelize.initDb();

// Ici, nous placerons nos futurs points de terminaison.

app.listen(port, () =>
  console.log(
    `Notre application Node est lancée sur le port : http://localhost:${port}`
  )
);
