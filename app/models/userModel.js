const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken"); // calling the jsonWebToken

const User = new mongoose.Schema(
  // name, email, password with its type
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true } // also mark that the adding and edited time should me added
);

// we are encryting the password.
User.pre("save", function (next) {
  // what do we do before saving the password.

  const user = this; // we create  a variable user based on the user schema
  if (!user.isModified("password")) {
    // we check if the password has not been modified.
    return next(); // if it has not been modified, we go next or (Skip this)
  }
  bcrypt.genSalt(10, function (err, salt) {
    // we start encrypting the password.

    if (err) {
      // if there is an error we capture it and we send it to the user.
      res.send(err);
    }
    bcrypt.hash(user.password, salt, function (err, hash) {
      // we hash the password
      if (err) {
        // if there is an error we send the error message.
        res.send(err);
      }
      user.password = hash; // otherwise, the user.password will be hashed.
      next(); // then we go next
    });
  });
});

// creating a token using jwt, Json web token
User.methods.generateAuthToken = (user) => {
  const token = jwt.sign({ _id: user._id }, "secretKey", { expiresIn: "1h" });
  return token;
};
//we export the module
module.exports = mongoose.model("User", User);
