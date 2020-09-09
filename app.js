var express = require("express");
var app = express();

app.use(express.static("public"));
// bodyparser 대신 express로도가능
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res, error) {
  var id = req.body.id;
  var description = req.body.description;
  res.render("home", {
    id: id,
    description: description,
  });
});

app.get("/login", function (req, res, next) {
  res.render("login");
});

app.post("/login_success", function (req, res, next) {
  var id = req.body.id;
  var description = req.body.description;
  res.render("home", {
    id: id,
    description: description,
  });
});

app.get("/topic/:id", function (req, res, error) {
  let users = ["node js", "express", "조금더 유연한 방법의 연결"];
  let output = `
  <a href="/topic/0">user1</a><br>
  <a href="/topic/1">user2</a><br>
  <a href="/topic/2">user3</a><br><br>
  ${users[req.params.id]}
  `;
  res.send(output);
  // res.render("topic");
});

app.listen(3000, function () {
  console.log("Connected 3000 port");
});
