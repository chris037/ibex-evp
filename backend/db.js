const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",     // or your remote DB host
  user: "root",          // your MySQL user
  password: "",          // your MySQL password
  database: "ibex_db"    // database name (create this first)
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ Connected to MySQL");
});

module.exports = db;