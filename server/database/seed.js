const db = require("./database");

const books = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description:
      "Good condition, light shelf wear on the spine, a few pencil underlines in chapter three.",
    suggestedPrice: 1500,
    image: "sample-gatsby.jpg",
    bids: [
      { bidderName: "Amara K.", bidAmount: 1750 },
      { bidderName: "Talha R.", bidAmount: 1600 },
      { bidderName: "Sana M.", bidAmount: 1500 },
    ],
  },
  {
    title: "Norwegian Wood",
    author: "Haruki Murakami",
    description: "Paperback, slightly creased cover, no markings inside.",
    suggestedPrice: 900,
    image: "sample-norwegian-wood.jpg",
    bids: [],
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    description: "Like new, bought but never read.",
    suggestedPrice: 1200,
    image: "sample-sapiens.jpg",
    bids: [{ bidderName: "Bilal H.", bidAmount: 1250 }],
  },
  {
    title: "Circe",
    author: "Madeline Miller",
    description: "Well loved copy, coffee ring on the back cover.",
    suggestedPrice: 700,
    image: "sample-circe.jpg",
    bids: [],
  },
];

function clearTables(callback) {
  db.serialize(() => {
    db.run("DELETE FROM Bid");
    db.run("DELETE FROM BookImage");
    db.run("DELETE FROM Book", callback);
  });
}

function insertBook(book, done) {
  db.run(
    `INSERT INTO Book (title, author, description, suggestedPrice) VALUES (?, ?, ?, ?)`,
    [book.title, book.author, book.description, book.suggestedPrice],
    function (err) {
      if (err) return done(err);

      const bookId = this.lastID;

      db.run(
        `INSERT INTO BookImage (bookId, imagePath) VALUES (?, ?)`,
        [bookId, book.image],
        (err) => {
          if (err) return done(err);

          if (book.bids.length === 0) return done(null);

          let remaining = book.bids.length;
          book.bids.forEach((bid) => {
            db.run(
              `INSERT INTO Bid (bookId, bidderName, bidAmount) VALUES (?, ?, ?)`,
              [bookId, bid.bidderName, bid.bidAmount],
              (err) => {
                if (err) return done(err);
                remaining -= 1;
                if (remaining === 0) done(null);
              }
            );
          });
        }
      );
    }
  );
}

clearTables((err) => {
  if (err) {
    console.error("Failed to clear tables:", err.message);
    process.exit(1);
  }

  let remaining = books.length;

  books.forEach((book) => {
    insertBook(book, (err) => {
      if (err) {
        console.error(`Failed to insert "${book.title}":`, err.message);
        process.exit(1);
      }

      console.log(`Seeded: ${book.title}`);
      remaining -= 1;

      if (remaining === 0) {
        console.log("Done. Sample dataset loaded.");
        db.close();
      }
    });
  });
});
