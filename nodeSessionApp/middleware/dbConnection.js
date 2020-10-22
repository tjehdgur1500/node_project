const mysql = require("mysql");
const config = require("./config");
const { dbTest: dbTest } = config;

const connection = mysql.createConnection({
  host: dbTest.host,
  user: dbTest.user,
  database: dbTest.database,
  password: dbTest.password,
  port: dbTest.port,
  connectionLimit: dbTest.connectionLimit,
  waitForConnections: true,
});

module.exports = connection;
