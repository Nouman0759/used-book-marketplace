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
        <span className="eyebrow label-mono">used · traded · rebound</span>

        <h1>
          Every copy has a chapter of its own before it reaches you.
        </h1>

        <p>
          Browse second-hand books uploaded by readers, discover hidden gems,
          and place bids on your next favorite book.
        </p>

        <div className="search-wrap">
          <label className="label-mono">find a title or author</label>
          <div className="search-row">
            <input
              className="search"
              placeholder="The Great Gatsby, Fitzgerald..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="search-stamp" type="button">
              search
            </button>
          </div>
        </div>
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
