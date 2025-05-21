const express = require("express");
const userApiController = require("../controllers/userApiController");
const router = express.Router();
router.post("/signup", userApiController.create);
router.post("/signin", userApiController.login);
module.exports = router;
