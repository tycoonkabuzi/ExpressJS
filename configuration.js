const Posts = require("./app/models/PostModel"); // calling the model
const express = require("express"); // importing express
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose"); //importing mongoose for the connection to the DB

mongoose.connect("mongodb://127.0.0.1:27017/express-blog"); // connecting to the DB

const blogRouter = require("./app/router/blogRouter"); // importing the blog rooter
const userRouter = require("./app/router/userRouter"); // importing the userRouter

const app = express(); // creating an express app
const hbs = require("express-handlebars"); // importing the handlebar for the view
const port = 8080; // port number

app.use(express.urlencoded({ extended: true })); // used to get data from the form
app.use(cookieParser());

app.engine("hbs", hbs.engine({ extname: ".hbs" })); // setting up the engine (HBS) handlebars
app.set("view engine", "hbs");

app.get("/second", (req, res) => {
  // routing for the page
  res.render("second", {
    title: "Creation",
    content: "When we talk about creation, we often mean other things",
    names: ["Reed", "James", "Aksanti", "Queen"],
  });
});

// routes

app.use("/blog", blogRouter);
app.use("/users", userRouter);
app.listen(port, () => {
  console.log("Server started");
});
