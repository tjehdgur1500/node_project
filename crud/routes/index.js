var express = require("express");
var router = express.Router();
const dbConnection = require("../middleware/dbConnection");

/* GET home page. */
router.get("/", function (req, res, next) {
  dbConnection.query(`SELECT * FROM users`, (error, rows) => {
    if (error) {
      console.log("[ERROR] User info");
    } else {
      console.log("CONNECTION", rows);
      res.render("index", { title: "게시판프로젝트", rows: rows });
    }
  });
});

router.post("/", (req, res, next) => {
  var data = req.body.id;
  res.send({ data: data });
});

module.exports = router;
