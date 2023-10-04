import express from "express";
import bodyParser from "body-parser";
import connection from "./database/database";

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
  res.render("index");
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
  let { title, description } = req.body;
  res.send(`Formulário recebido ${title} ${description}`);
});

app.listen(3333, () => {
  console.log("Running in http://localhost:3333");
});
