const Post = require("../models/PostModel");
module.exports = {
  index: async (req, res) => {
    const posts = await Post.find({}).lean();
    res.send(posts);
  },
};
