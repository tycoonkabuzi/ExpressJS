const Posts = require("./app/models/PostModel");
const express = require("express");
const postController = require("./app/controllers/postController");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/express-blog");

const app = express();
const hbs = require("express-handlebars");
const port = 8080;

app.engine("hbs", hbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

app.get("/second", (req, res) => {
  res.render("second", {
    title: "Creation",
    content: "When we talk about creation, we often mean other things",
    names: ["Reed", "James", "Aksanti", "Queen"],
  });
});

app.get("/blog", postController.index);
app.get("/blog/add", (_req, res) => {
  res.render("blogViews/addPost");
});
app.get("/blog/:id", postController.post);

app.listen(port, () => {
  console.log("Server started");
});
