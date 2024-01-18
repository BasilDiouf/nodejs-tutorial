const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");
const { success, getUniqueId } = require("./helper");
let pokemons = require("./mock-pokemon");

const app = express();
const port = 3000;

//Données de connexion à notre BDD avec Sequelize
const sequelize = new Sequelize("pokedex", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  loggong: false,
});

//ORM Sequelize
sequelize
  .authenticate()
  .then((_) =>
    console.log("La connexion à la base de données à bien été établie.")
  )
  .catch((error) =>
    console.error(`Impossible de se connecter à la base de données ${error}`)
  );

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());

app.get("/", (req, res) =>
  res.send("Hello ma gueule alors nodemon fonctionne?? Ah  oui")
);

// Endpoint findById
app.get("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  const message = "Un pokémon a bien été trouvé !";
  res.json(success(message, pokemon));
});

// Endpoint findAll
app.get("/api/pokemons/", (req, res) => {
  const message = "La liste des pokémons est la suivante :";
  res.json(success(message, pokemons));
  console.log(pokemons);
});

// Endpoint create
app.post("/api/pokemons", (req, res) => {
  const id = getUniqueId(pokemons);
  const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
  pokemons.push(pokemonCreated);
  const message = `Le pokémon ${pokemonCreated.name} a bien été créé !`;
  res.json(success(message, pokemonCreated));
});

// Endpoint update
app.put("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonUpdated = { ...req.body, id: id };
  pokemons = pokemons.map((pokemon) => {
    return pokemon.id === id ? pokemonUpdated : pokemon;
  });
  const message = `Le Pokémon ${pokemonUpdated.name} à été modifié.`;
  res.json(success(message, pokemonUpdated));
});

// Endpoint delete
app.delete("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonDeleted = pokemons.find((pokemon) => pokemon.id === id);
  pokemons.filter((pokemon) => pokemon.id !== id);
  const message = `Le Pokémon ${pokemonDeleted.name} a bien été supprimé.`;
  res.json(success(message, pokemonDeleted));
});

app.listen(port, () =>
  console.log(
    `Notre application Node est lancée sur le port : http://localhost:${port}`
  )
);
