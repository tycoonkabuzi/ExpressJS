const Post = require("../models/PostModel"); // importing the model
const User = require("../models/userModel");
module.exports = {
  index: async (req, res) => {
    const findConfig = req.query.authorId ? { author: req.query.authorId } : {};
    try {
      const posts = await Post.find(findConfig).populate("author").lean();
      res.render("blogViews/blog", { posts: posts });
    } catch (err) {
      res.send(err);
    }
  },

  post: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate("author");
      res.render("blogViews/singleBlog", post);
    } catch (err) {
      res.send(err);
    }
  },
  create: async (req, res) => {
    try {
      const newPost = new Post({
        ...req.body,
        author: res.locals.userId,
      });
      await newPost.save();

      await User.updateOne(
        { _id: res.locals.userId },
        { $push: { posts: newPost._id } }
      );

      res.redirect("/blog");
    } catch (err) {
      res.send(err);
    }
  },

  setDataForm: async (req, res) => {
    try {
      const toBeEdited = await Post.findById(req.params.id);
      res.render("blogViews/editPost", toBeEdited);
    } catch (err) {
      res.send(err);
    }
  },
  update: async (req, res) => {
    try {
      await Post.findByIdAndUpdate(req.params.id, req.body);
      res.redirect("/blog");
    } catch (err) {
      res.send(err);
    }
  },
  delete: async (req, res) => {
    try {
      await Post.findOneAndDelete(req.params.id);
      res.redirect("/blog");
    } catch (err) {
      res.send(err);
    }
  },
};
