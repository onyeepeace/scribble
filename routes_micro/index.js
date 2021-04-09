const path = require("path");
const express = require("express");
const app = express();

app.use(express.static(path.join(__dirname, "build")));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join((__dirname, "static/build", "index.html")));
});

// export 'app'
module.exports = app;
