const mongoose = require("mongoose");
//we create a schema of how our data will look like in the mongo Db
const Post = new mongoose.Schema(
  { title: String, content: String, author: String },
  { timestamps: true }
);
module.exports = mongoose.model("Post", Post);
