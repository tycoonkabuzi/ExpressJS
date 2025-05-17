const Post = require("../models/PostModel"); // importing the model

module.exports = {
  index: async (req, res) => {
    try {
      const posts = await Post.find({}).lean();
      const username = await res.locals.userName;
      res.render("blogViews/blog", { user: username, posts: posts });
    } catch (err) {
      res.send(err);
    }
  },

  post: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.render("blogViews/singleBlog", post);
    } catch (err) {
      res.send(err);
    }
  },
  create: async (req, res) => {
    try {
      const newPost = new Post({ ...req.body });
      await newPost.save();
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
