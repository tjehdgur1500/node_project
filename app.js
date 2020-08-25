var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function (req, res, error) {
  res.render("home");
});
app.get("/login", function (req, res, error) {
  res.render("login");
});
app.listen(3000, function () {
  console.log("Connected 3000 port");
});
