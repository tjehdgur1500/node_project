var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function (req, res, error) {
  var fors = "";
  for (var i = 0; i <= 5; i++) {
    fors = fors + `<ul><li>${i}</li></ul>`;
  }
  res.render("home", { title: fors });
});
app.get("/login", function (req, res, error) {
  let users = ["node js", "express", "조금더 유연한 방법의 연결"];
  let output = `
  <a href="/login?id=0">user1</a><br>
  <a href="/login?id=1">user2</a><br>
  <a href="/login?id=2">user3</a><br><br>
  ${users[req.query.id]}
  `;
  res.send(output);
  // res.render("login");
});
app.listen(3000, function () {
  console.log("Connected 3000 port");
});
