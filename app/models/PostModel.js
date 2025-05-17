const mongoose = require("mongoose");
//we create a schema of how our data will look like in the mongo Db
const Post = new mongoose.Schema(
  {
    title: String,
    content: String,
    author: {
      // creating a relationship between a post and the user logged in.
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", Post);
