const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

const db = new sqlite3.Database(
  path.join(__dirname, "../database.sqlite"),
  (err) => {
    if (err) {
      console.error("Database connection failed:", err.message);
    } else {
      console.log("Connected to SQLite database.");
    }
  }
);

// Create tables from schema.sql if they don't exist
const schema = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8");

db.serialize(() => {
  db.exec(schema, (err) => {
    if (err) {
      console.error("Failed to apply schema:", err.message);
    }
  });
});

module.exports = db;