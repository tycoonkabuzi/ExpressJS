const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const port = 8080;

app.engine("hbs", hbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/second", (req, res) => {
  res.render("second");
});
app.listen(port, () => {
  console.log("Server started");
});
