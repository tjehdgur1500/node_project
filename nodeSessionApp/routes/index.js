var express = require("express");
var router = express.Router();
var connection = require("../middleware/dbConnection");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/register", function (req, res, next) {
  connection.query("select * from user_register", (error, rows, fields) => {
    if (error) throw error;
    console.log("User info is: ", rows);
  });

  res.render("register", { title: "Express" });
});

router.post("/register", function (req, res, next) {
  let query = `INSERT INTO user_register (us_id, us_pw, us_email) VALUES (?,?,?)`;
  let values = [req.body.us_id, req.body.us_pw, req.body.us_email];

  connection.query(query, values, (error, result) => {
    if (error) throw error;
    console.log("User info is: ", result);
  });

  res.send({ flag: "success" });
});
module.exports = router;
