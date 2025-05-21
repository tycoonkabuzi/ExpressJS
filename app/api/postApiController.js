const Post = require("../models/PostModel");
const User = require("../models/userModel");
module.exports = {
  index: async (req, res) => {
    const findConfig = req.query.authorId ? { author: req.query.authorId } : {};
    try {
      const posts = await Post.find(findConfig).populate("author").lean();
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  post: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate("author");
      res.status(200).json(post);
    } catch (err) {
      res.status(404).json({ error: "resource not found" });
    }
  },

  create: async (req, res) => {
    try {
      const newPost = new Post({
        ...req.body,
        author: "68233f5dd4909683ffbf9d52",
      });
      await newPost.save();

      await User.updateOne(
        { _id: "68233f5dd4909683ffbf9d52" },
        { $push: { posts: newPost._id } }
      );

      res.status(201).json(newPost);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },

  update: async (req, res) => {
    try {
      const toBeUpdated = await Post.findByIdAndUpdate(req.params.id, req.body);
      res.status(204).json(toBeUpdated);
    } catch (err) {
      res.status(500).json({ err: err });
    }
  },

  delete: async (req, res) => {
    try {
      await Post.findOneAndDelete(req.params.id);
      res.status(204);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
};
