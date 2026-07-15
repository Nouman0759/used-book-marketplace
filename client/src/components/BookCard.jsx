import { Link } from "react-router-dom";

function BookCard({ book }) {
  return (
    <Link
      to={`/book/${book.id}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "15px",
        }}
      >
        {book.thumbnail && (
          <img
            src={`http://localhost:5000/uploads/${book.thumbnail}`}
            alt={book.title}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
            }}
          />
        )}

        <h2>{book.title}</h2>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Price:</strong> Rs. {book.suggestedPrice}</p>
        <p><strong>Bids:</strong> {book.bidCount}</p>
      </div>
    </Link>
  );
}

export default BookCard;