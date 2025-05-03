const Posts = require("./app/models/PostModel");
const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/express-blog");

const app = express();
const hbs = require("express-handlebars");
const port = 8080;

app.engine("hbs", hbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

app.get("/:id", async (req, res) => {
  if (req.params.id) {
    const post = await Posts.findById(req.params.id);
    res.render("home", {
      title: post.title,
      content: post.content,
      displayTitle: true,
    });
  } else {
    res.render("home");
  }
});

app.get("/second", (req, res) => {
  res.render("second", {
    title: "Creation",
    content: "When we talk about creation, we often mean other things",
    names: ["Reed", "James", "Aksanti", "Queen"],
  });
});
app.listen(port, () => {
  console.log("Server started");
});
