import express from "express";
import bodyParser from "body-parser";
import connection from "./database/database.js";
import Pergunta from "./database/Pergunta.js";
import Resposta from "./database/Resposta.js";

connection
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully!");
  })
  .catch((err) => console.log(err));

const app = express();

// Express view engine ejs
app.set("view engine", "ejs");
app.use(express.static("public"));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  Pergunta.findAll({ raw: true, order: [["id", "DESC"]] }).then((perguntas) => {
    res.render("index", {
      perguntas: perguntas,
    });
  });
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.get("/pergunta/:id", (req, res) => {
  let { id } = req.params;
  Pergunta.findOne({
    where: { id: id },
  }).then((pergunta) => {
    if (pergunta != undefined) {
      Resposta.findAll({
        where: { perguntaId: pergunta.id },
        order: [["id", "DESC"]],
      }).then((respostas) => {
        res.render("pergunta", {
          pergunta: pergunta,
          respostas: respostas,
        });
      });
    } else {
      res.redirect("/");
    }
  });
});

app.post("/salvarpergunta", (req, res) => {
  let { title, description } = req.body;
  Pergunta.create({
    title: title,
    description: description,
  }).then(() => {
    res.redirect("/");
  });
});

app.post("/responder", (req, res) => {
  let { corpo, perguntaId } = req.body;
  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId,
  }).then(() => {
    res.redirect(`/pergunta/${perguntaId}`);
  });
});

app.post("/responder/delete", (req, res) => {
  let { id } = req.body;
  console.log("Received request to delete response with ID:", id);

  if (id !== undefined && !isNaN(id)) {
    Pergunta.destroy({
      where: { id: id },
    })
      .then(() => {
        console.log("Response deleted successfully.");
        res.redirect("/"); // ou para a rota apropriada após excluir
      })
      .catch((error) => {
        console.error("Error deleting response:", error);
        res.redirect("/"); // ou para a rota de erro apropriada
      });
  } else {
    console.error("Invalid ID received for response deletion.");
    res.redirect("/"); // ou para a rota de erro apropriada
  }
});

app.listen(3333, () => {
  console.log("Running in http://localhost:3333\n");
});
