const express = require("express");
const app = express();

app.get("/user/:id?/:name?", (req, res) => {
  if (req.params.id) {
    res.send("User " + req.params.id + " " + req.params.name);
  } else {
    res.send("All users");
  }
});

app.get("/data", (req, res) => {
  if (req.query.search) {
    res.send(" You searched for : " + req.query.search);
  } else {
    res.send("Nothing was searched");
  }
});

app.listen(8080, () => {
  console.log("Server started");
});
