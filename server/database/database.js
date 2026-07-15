const sqlite3 = require("sqlite3").verbose();
const path = require("path");

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

// Create tables if they don't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Book (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      description TEXT,
      suggestedPrice REAL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS BookImage (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      bookId INTEGER,
      imagePath TEXT,
      FOREIGN KEY(bookId) REFERENCES Book(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Bid (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      bookId INTEGER,
      bidderName TEXT,
      bidAmount REAL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(bookId) REFERENCES Book(id)
    )
  `);
});

module.exports = db;