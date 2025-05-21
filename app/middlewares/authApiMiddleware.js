const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.header("Authorization");
  if (token) {
    try {
      const verified = jwt.verify(token, "secretKey");
      req.userId = verified._id;
      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  } else {
    res.status(400).json({ message: "Access denied" });
  }
};
