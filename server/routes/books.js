const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("../database/database");

// Configure image storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { files: 3 },
});
router.post("/", upload.array("images", 3), (req, res) => {
  const { title, author, description, suggestedPrice } = req.body;

  db.run(
    `INSERT INTO Book (title, author, description, suggestedPrice)
     VALUES (?, ?, ?, ?)`,
    [title, author, description, suggestedPrice],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      const bookId = this.lastID;

      if (req.files.length === 0) {
        return res.json({ message: "Book added successfully" });
      }

      req.files.forEach((file) => {
        db.run(
          `INSERT INTO BookImage (bookId, imagePath)
           VALUES (?, ?)`,
          [bookId, file.filename]
        );
      });

      res.json({
        message: "Book added successfully",
        bookId,
      });
    }
  );
});
router.get("/", (req, res) => {
  const query = `
    SELECT
      Book.id,
      Book.title,
      Book.author,
      Book.description,
      Book.suggestedPrice,
      (
        SELECT imagePath
        FROM BookImage
        WHERE BookImage.bookId = Book.id
        LIMIT 1
      ) AS thumbnail,
      (
        SELECT COUNT(*)
        FROM Bid
        WHERE Bid.bookId = Book.id
      ) AS bidCount
    FROM Book
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(rows);
  });
});
router.get("/:id", (req, res) => {
  const id = req.params.id;

  db.get(
    "SELECT * FROM Book WHERE id = ?",
    [id],
    (err, book) => {
      if (err) return res.status(500).json(err);

      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      db.all(
        "SELECT * FROM BookImage WHERE bookId = ?",
        [id],
        (err, images) => {

          db.all(
            "SELECT * FROM Bid WHERE bookId = ? ORDER BY bidAmount DESC",
            [id],
            (err, bids) => {

              res.json({
                ...book,
                images,
                bids,
                highestBid: bids.length ? bids[0].bidAmount : null
              });

            }
          );

        }
      );

    }
  );
});
router.post("/:id/bid", (req, res) => {

  const { bidderName, bidAmount } = req.body;
  const bookId = req.params.id;

  db.run(
    `
    INSERT INTO Bid (bookId, bidderName, bidAmount)
    VALUES (?, ?, ?)
    `,
    [bookId, bidderName, bidAmount],
    function (err) {

      if (err)
        return res.status(500).json(err);

      res.json({
        message: "Bid placed successfully"
      });

    }
  );

});
module.exports = router;