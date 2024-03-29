const express = require("express");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");

const app = express();
const port = process.env.PORT || 3000;

app.use(favicon(__dirname + "/favicon.ico")).use(bodyParser.json());

sequelize.initDb();

app.get("/", (req, res) => {
  res.json("Hello, render ! 👌");
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

console.log(process.env.DBHOST);

app.listen(port, () =>
  console.log(
    `Notre application Node est lancée sur le port : http://localhost:${port}`
  )
);
