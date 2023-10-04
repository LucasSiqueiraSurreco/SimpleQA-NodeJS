// No arquivo Pergunta.js
import { Sequelize } from "sequelize";
import connection from "./database.js";

const Pergunta = connection.define("perguntas", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Pergunta.sync({ force: false });

export default Pergunta;
