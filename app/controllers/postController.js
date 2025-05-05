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
      //res.send(err);
    }
  },
};
