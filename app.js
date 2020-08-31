var express = require("express");
var path = require("path");
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

// query string 방식 query 프로퍼티로 받음.
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

// 시멘틱 url 방식  parmas 프로퍼티로 받음.
// >> 게시판 생성시 동적으로 url을 만들어줄 수 있을것 같다.
// 쿼리스트링도 유용하게 값을 담을 수 있다.
app.get("/topic/:notice/:id", function (req, res, next) {
  res.send(req.params.notice + "," + req.params.id);
});

app.listen(3000, function () {
  console.log("Connected 3000 port");
});
