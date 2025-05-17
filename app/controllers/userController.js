const User = require("../models/userModel");
const bcrypt = require("bcrypt");
module.exports = {
  create: async (req, res) => {
    try {
      const newUser = new User({ ...req.body });
      await newUser.save();
      res.redirect("/login");
    } catch (err) {
      if (err.code === 11000) {
        res.render("userViews/signUpUser", {
          isError: true,
          message: "This user is already registered",
        });
      }
    }
  },

  login: async (req, res) => {
    try {
      // we first find the user.
      const user = await User.findOne({ name: req.body.name });
      if (!user) {
        // if the user does not exist we root the user to the login page but with an error message
        res.render("userViews/loginInUser", {
          // these below are data we are going to use to update our hbs file.
          error: true,
          message: "This user does not exist",
          user: req.body,
        });
        return;
      }

      bcrypt.compare(req.body.password, user.password, (err, logged) => {
        if (err) {
          res.render("userViews/loginInUser", {
            error: true,
            message: "Login error",
            user: { name: req.body.name, password: "" },
          });
          return;
        }

        if (logged) {
          const token = user.generateAuthToken(user);
          res.cookie("AuthToken", token);
          res.redirect("/blog");
        } else {
          res.render("userViews/loginInUser", {
            error: true,
            message: "Login data do not match",
            user: { name: req.body.name, password: "" },
          });
        }
      });
    } catch (err) {
      res.send(err);
    }
  },
};
