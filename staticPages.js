// Open a static page from the server
const express = require("express");
const app = express();
const port = 8080;
app.use(express.static("public")); // we can also restrict this by providing a name directing to our host. app.use('/files',express.static("public"));
app.listen(port, () => {
  console.log("Server has started");
});
