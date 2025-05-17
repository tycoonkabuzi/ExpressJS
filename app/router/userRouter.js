const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("userViews/signUpUser");
});
router.post("/", userController.create);
router.get("/login", (req, res) => {
  if (req.query.loginRedirect) {
    res.render("userViews/loginInUser", {
      error: true,
      message: "Please login to use the app",
    });
    return;
  }
  res.render("userViews/loginInUser");
});
router.post("/login", userController.login);

module.exports = router;
