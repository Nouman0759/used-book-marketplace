const express = require("express");
const cors = require("cors");
const db = require("./database/database");
const app = express();
const bookRoutes = require("./routes/books");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/books", bookRoutes);

app.get("/", (req, res) => {
    res.send("Used Book Marketplace API is running...");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});