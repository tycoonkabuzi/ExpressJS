const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleWare");
router.get("/", authMiddleware, postController.index);

//created a route for the page
router.get("/add", (_req, res) => {
  res.render("blogViews/addPost");
});
router.get("/:id", postController.post);

// created an action with this
router.post("/add", postController.create);
router.get("/editPost/:id", postController.setDataForm);
router.post("/editPost/:id", postController.update);
router.get("/delete/:id", postController.delete);

module.exports = router;
