const Post = require("../models/PostModel");
module.exports = {
  index: async (req, res) => {
    try {
      const posts = await Post.find({}).lean();

      res.render("blogViews/blog", { posts: posts });
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
      console.log(req.body);
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
      const toBeEdited = await Post.findByIdAndUpdate(req.params.id, req.body);
      res.redirect("/blog");
    } catch (err) {
      res.send(err);
    }
  },
  delete: async (req, res) => {
    try {
      const toBeDeleted = await Post.findOneAndDelete(req.params.id);
      res.redirect("/blog");
    } catch (err) {
      res.send(err);
    }
  },
};
