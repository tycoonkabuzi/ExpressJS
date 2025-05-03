const express = require("express");
const app = express();
const Post = require("./app/models/PostModel");

const port = 8080;
const mongoose = require("mongoose");
// connection to the database
mongoose.connect("mongodb://127.0.0.1:27017/express-blog");
// model the type of data we will be working with or handle
app.get("/mongoose", async (req, res) => {
  const posts = await Post.find().exec();
  res.send(posts);
});
app.listen(port, () => {
  console.log("Connection done");
});
