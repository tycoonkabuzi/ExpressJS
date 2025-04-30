const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello Worldsds");
});
app.listen(8080, () => {
  console.log("Server started");
});
