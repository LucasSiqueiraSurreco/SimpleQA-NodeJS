import express from "express";
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
  res.send("Formulário recebido");
});

app.listen(3333, () => {
  console.log("Running in http://localhost:3333");
});
