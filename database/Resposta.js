import { DataTypes } from "sequelize";
import connection from "./database.js";

const Resposta = connection.define("respostas", {
  corpo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  perguntaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Resposta.sync({ force: false });

export default Resposta;
