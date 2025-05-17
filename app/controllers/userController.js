const User = require("../models/userModel"); // we add our user model
const bcrypt = require("bcrypt"); // also the bcrypt package which hash our password
module.exports = {
  // export line here
  create: async (req, res) => {
    // we would like to create a user.
    try {
      const newUser = new User({ ...req.body }); // create user with new User" our user model" and in parameter we add the data coming from the form
      await newUser.save(); // we save using the method save
      res.redirect("users/login"); // redirect us to the page login
    } catch (err) {
      // if there is an error we catch it,
      if (err.code === 11000) {
        // we focus here on the 11000 which says already exists.
        res.render("userViews/signUpUser", {
          // this will render the same sign up page but with an error that we are going to handle down here
          isError: true, // true
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
  logout: (req, res) => {
    res.clearCookie("AuthToken");
    res.redirect("/users/login");
  },
};
