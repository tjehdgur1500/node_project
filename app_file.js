const express = require("express");
const fs = require("fs");
const app = express();
app.set("views", "./views_file");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/topic/new", function (req, res, next) {
  res.render("new");
});

app.get("/topic", function(req, res, next){
  fs.readdir('data/', function(err, files){
    if(err){
      console.log(err);
      res.status(500).send("Internal Server Error");
    }

    res.render("view", {topics:files});
  });
});

app.post("/topic/", function (req, res, next) {
  let title = req.body.title;
  let description = req.body.description;
  fs.writeFile("data/" + title, description, function (err) {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
    res.send("Success!");
  });
});
app.listen(3000, function () {
  console.log("Connected , 3000 port!!!");
});

// supervisor package 를 이용해 따로 서버를 재시작안해도 되게할 수 있다.
