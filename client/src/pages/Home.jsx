import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";

function Home() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredBooks = books.filter((book) => {
    const search = query.toLowerCase();

    return (
      book.title.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search)
    );
  });

  return (
    <>
      <section className="hero">
        <h1>
          Every copy has a chapter of its own before it reaches you.
        </h1>

        <p>
          Browse second-hand books uploaded by readers, discover hidden gems,
          and place bids on your next favorite book.
        </p>

        <input
          className="search"
          placeholder="Search by title or author..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </section>

      <section className="book-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))
        ) : (
          <h2>No books found.</h2>
        )}
      </section>
    </>
  );
}

export default Home;