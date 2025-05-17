const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
module.exports = async (req, res, next) => {
  const token = await req.cookies["AuthToken"];
  if (token) {
    try {
      const verified = jwt.verify(token, "secretKey");
      console.log("Verified token:", verified);
      const user = await User.findById(verified._id);
      if (!user) {
        console.log(user);
      }
      res.locals.userId = user._id;
      res.locals.userName = user.name;
      next();
    } catch (err) {
      res.redirect("/users/login?loginRedirect=true");
    }
  } else {
    res.redirect("/users/login?loginRedirect=true");
  }
};
