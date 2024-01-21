const validTypes = [
  "Plante",
  "Poison",
  "Eau",
  "Feu",
  "Insecte",
  "Vol",
  "Normal",
  "Electrik",
  "Fée",
];

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Le nom d'un Pokémon doit être unique. Celui-ci est déjà pris !",
        },
        validate: {
          notEmpty: {
            msg: "Le Pokémon doit avoir un nom",
          },
          notNull: { msg: "Le nom d'un Pokémon est une propriété requise" },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Utilisez uniquement des nombres entiers pour les points de vie.",
          },
          notNull: { msg: "Les points de vie sont une propriété requise" },
          min: {
            args: [0],
            msg: "Les points de vie ne doivent pas être inférieurs à 0",
          },
          max: {
            args: [999],
            msg: "Les points de vie ne peuvent pas être supérieurs à 999",
          },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Utilisez uniquement des nombres entiers pour les points de compétences.",
          },
          notNull: { msg: "Les compétences sont une propriété requise" },
          min: {
            args: [0],
            msg: "Les points de compétence ne doivent pas être inférieurs à 0",
          },
          max: {
            args: [99],
            msg: "Les points de compétence ne peuvent pas être supérieurs à 99",
          },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isURL: {
            msg: "L'image doit être une URL",
          },
          notNull: { msg: "L'image' d'un Pokémon est une propriété requise" },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("types").split(",");
        },
        set(types) {
          this.setDataValue("types", types.join());
        },
        validate: {
          // isTypeValid est un nom que nous avons donné nous même. Nous avons créé un validateur personnalisé.
          isTypesValid(value) {
            if (!value) {
              throw new Error("Un Pokémon doit avoir au moins un type.");
            }
            if (value.split(",").length > 3) {
              throw new Error("Un Pokémon ne peux pas avoir plus de 3 types.");
            }
            value.split(",").forEach((type) => {
              if (!validTypes.includes(type)) {
                throw new Error(
                  `Le type d'un Pokémon doit appartenir à la liste suivante : ${validTypes}`
                );
              }
            });
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
