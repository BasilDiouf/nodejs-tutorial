const express = require("express");
const aws = require("aws-sdk");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");

const app = express();
const port = process.env.PORT || 3306;
let s3 = new aws.S3({
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET,
});

app.use(favicon(__dirname + "/favicon.ico")).use(bodyParser.json());

sequelize.initDb();

app.get("/", (req, res) => {
  res.json("Hello, Heroku ! 👌");
});

// Ici, nous placerons nos futurs points de terminaison.
require("./src/routes/findAllPokemons")(app);
require("./src/routes/findPokemonByPk")(app);
require("./src/routes/createPokemon")(app);
require("./src/routes/updatePokemon")(app);
require("./src/routes/deletePokemon")(app);
require("./src/routes/login")(app);

// On ajoute la gestion des erreurs 404
app.use(({ res }) => {
  const message =
    "Impossible de trouver la ressource demandée ! Essayez une autre URL.0";
  res.status(404).json({ message });
});

app.listen(port, s3, () =>
  console.log(
    `Notre application Node est lancée sur le port : http://localhost:${port}`
  )
);
