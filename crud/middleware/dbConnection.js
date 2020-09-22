const mysql = require("mysql");
const dbInfo = require("./config.json");

const connection = mysql.createConnection({
  host: dbInfo.host,
  user: dbInfo.user,
  password: dbInfo.password,
  database: dbInfo.database,
});

module.exports = connection;
