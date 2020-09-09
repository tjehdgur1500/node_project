const express = require("express");
const app = express();
app.set("views", "./views_file");
app.set("view engine", "ejs");
app.get("/topic/new", function (req, res, next) {
  res.render("new");
});
app.post("/topic", function (req, res, next) {
  res.send("hi");
});
app.listen(3000, function () {
  console.log("Connected , 3000 port!!!");
});

// supervisor package 를 이용해 따로 서버를 재시작안해도 되게할 수 있다.
