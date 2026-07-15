import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BidForm from "../components/BidForm";

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  const fetchBook = () => {
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((res) => setBook(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  if (!book) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{book.title}</h1>
      <h3>{book.author}</h3>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {book.images.map((image) => (
          <img
            key={image.id}
            src={`http://localhost:5000/uploads/${image.imagePath}`}
            alt="Book"
            width="200"
          />
        ))}
      </div>

      <p>{book.description}</p>

      <h3>Suggested Price: Rs. {book.suggestedPrice}</h3>

      <h3>
        Highest Bid:{" "}
        {book.highestBid ? `Rs. ${book.highestBid}` : "No bids yet"}
      </h3>

      <BidForm bookId={id} onBidPlaced={fetchBook} />
    </div>
  );
}

export default BookDetails;