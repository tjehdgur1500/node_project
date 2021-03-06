const express = require("express");
const fs = require("fs");
const app = express();
app.set("views", "./views_file");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/topic/new", function (req, res, next) {
  fs.readdir("data/", function (err, files) {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
    res.render("new", { topics: files });
  });
});

app.get(["/topic", "/topic/:id"], function (req, res, next) {
  fs.readdir("data/", function (err, files) {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
    var id = req.params.id;
    // id 값이 있으면 id 값을 title로 data의 본문내용을 클라이언트로 보낸다.
    if (id) {
      fs.readFile("data/" + id, "utf8", function (err, data) {
        if (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
        }
        res.render("view", { topics: files, title: id, description: data });
      });
    } else {
      // id 값이 없으면 사용하지 않는 부분은 빈문자열 처리를해서 렌더링한다.
      res.render("view", { topics: files, title: "", description: "" });
    }

    // 동일한 ejs에 보내는 data들은 같아야한다.
  });
});

// app.get("/topic/:id", function (req, res, next) {
//   let id = req.params.id;
//   fs.readdir("data/", function (err, files) {
//     if (err) {
//       console.log(err);
//       res.status(500).send("Internal Server Error");
//     }
//     fs.readFile("data/" + id, "utf8", function (err, data) {
//       if (err) {
//         console.log(err);
//         res.status(500).send("Internal Server Error");
//       }
//       res.render("view", { topics: files, title: id, description: data });
//     });
//   });
// });

app.post("/topic/", function (req, res, next) {
  let title = req.body.title;
  let description = req.body.description;
  fs.writeFile("data/" + title, description, function (err) {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
    res.redirect("/topic/" + title);
  });
});
app.listen(3000, function () {
  console.log("Connected , 3000 port!!!");
});

// supervisor package 를 이용해 따로 서버를 재시작안해도 되게할 수 있다.
