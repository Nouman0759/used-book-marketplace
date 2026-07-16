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
        <div className="price-tag">Rs. {book.suggestedPrice}</div>

        <img
          src={
            book.thumbnail
              ? `http://localhost:5000/uploads/${book.thumbnail}`
              : "https://placehold.co/400x600/EFEADC/6B6558?text=No+image"
          }
          alt={book.title}
        />

        <div className="card-body">
          <h2>{book.title}</h2>
          <p>{book.author}</p>

          {book.description && (
            <p className="card-desc">{book.description}</p>
          )}

          <div className="card-meta">
            <span>No. {String(book.id).padStart(3, "0")}</span>

            {book.bidCount > 0 ? (
              <span className="bid-stamp">
                {book.bidCount} bid{book.bidCount !== 1 ? "s" : ""}
              </span>
            ) : (
              <span>no bids yet</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BookCard;
