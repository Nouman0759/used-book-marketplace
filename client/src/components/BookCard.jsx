import { Link } from "react-router-dom";

function BookCard({ book }) {
  return (
    <Link
      to={`/book/${book.id}`}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div className="card">
       <img
          src={
            book.thumbnail
              ? `http://localhost:5000/uploads/${book.thumbnail}`
              : "https://placehold.co/400x600/E7DFC6/24312A?text=No+Image"
        }
  alt={book.title}
/>

        <div className="card-body">
          <h2>{book.title}</h2>

          <p>
            <strong>Author:</strong> {book.author}
          </p>

          <p className="price">
            Rs. {book.suggestedPrice}
          </p>

          <p className="bid">
            {book.bidCount} Bid{book.bidCount !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default BookCard;