const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const port = 8080;

app.engine("hbs", hbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("home", {
    title: "Home Page",
    content:
      "This is the home page and has most of the important things we need",
    displayTitle: true,
  });
});

app.get("/second", (req, res) => {
  res.render("second", {
    title: "Creation",
    content: "When we talk about creation, we often mean other things",
  });
});
app.listen(port, () => {
  console.log("Server started");
});
