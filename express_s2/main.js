const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const template = require("./lib/template.js");
const path = require("path");
const sanitizeHtml = require("sanitize-html");
const qs = require("querystring");
const bodyParser = require("body-parser");
const compression = require("compression");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());
app.get("*", function (req, res, next) {
  fs.readdir("./data", function (error, filelist) {
    req.list = filelist;
    next();
  });
});

app.get("/", (req, res) => {
  var title = "Welcome";
  var description = "Hello, Node.js";
  var list = template.list(req.list);
  var html = template.HTML(
    title,
    list,
    `<h2>${title}</h2>${description}`,
    `<a href="/create">create</a>`
  );
  res.send(html);
});

app.get("/page/:pageId", (req, res, next) => {
  var filteredId = path.parse(req.params.pageId).base;
  fs.readFile(`data/${filteredId}`, "utf8", function (err, description) {
    if (err) {
      next(err);
    } else {
      var title = req.params.pageId;
      var sanitizedTitle = sanitizeHtml(title);
      var sanitizedDescription = sanitizeHtml(description, {
        allowedTags: ["h1"],
      });
      var list = template.list(req.list);
      var html = template.HTML(
        sanitizedTitle,
        list,
        `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
        ` <a href="/create">create</a>
                  <a href="/update/${sanitizedTitle}">update</a>
                  <form action="/delete_process" method="post">
                    <input type="hidden" name="id" value="${sanitizedTitle}">
                    <input type="submit" value="delete">
                  </form>`
      );
      res.send(html);
    }
  });
});

app.get("/create", (req, res) => {
  var title = "WEB - create";
  var list = template.list(req.list);
  var html = template.HTML(
    title,
    list,
    `
          <form action="/create" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
        `,
    ""
  );
  res.send(html);
});

app.post("/create", (req, res) => {
  var post = req.body;
  var title = post.title;
  var description = post.description;
  fs.writeFile(`data/${title}`, description, "utf8", function (err) {
    res.writeHead(302, { Location: `/?id=${title}` });
    res.end();
    var body = "";
    req.on("data", function (data) {
      body = body + data;
    });
  });

  // req.on("end", function () {
  //   var post = qs.parse(body);
  //   var title = post.title;
  //   var description = post.description;
  //   fs.writeFile(`data/${title}`, description, "utf8", function (err) {
  //     res.writeHead(302, { Location: `/?id=${title}` });
  //     res.end();
  //   });
  // });
});

app.get("/update/:pageId", (req, res) => {
  var filteredId = path.parse(req.params.pageId).base;
  fs.readFile(`data/${filteredId}`, "utf8", function (err, description) {
    var title = req.params.pageId;
    var list = template.list(req.list);
    var html = template.HTML(
      title,
      list,
      `
                <form action="/update_process" method="post">
                  <input type="hidden" name="id" value="${title}">
                  <p><input type="text" name="title" placeholder="title" value="${title}"></p>
                  <p>
                    <textarea name="description" placeholder="description">${description}</textarea>
                  </p>
                  <p>
                    <input type="submit">
                  </p>
                </form>
                `,
      `<a href="/create">create</a> <a href="/update/${title}">update</a>`
    );
    res.send(html);
  });
});

app.post("/update_process", (req, res) => {
  var post = req.body;
  var id = post.id;
  var title = post.title;
  var description = post.description;
  fs.rename(`data/${id}`, `data/${title}`, function (error) {
    fs.writeFile(`data/${title}`, description, "utf8", function (err) {
      res.redirect(`/?id=${title}`);
    });
  });
});

app.post("/delete_process", (req, res, next) => {
  var post = req.body;
  var id = post.id;
  var filteredId = path.parse(id).base;
  fs.unlink(`data/${filteredId}`, function (error) {
    res.redirect("/");
  });
});

app.use((req, res, next) => {
  res.status(404).send("페이지를 찾을 수 없습니다 !");
});

app.use((err, req, res, next) => {
  res.status(500).send("500 ERROR !");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
