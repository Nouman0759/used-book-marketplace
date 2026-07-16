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
      .catch(console.error);
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  if (!book) return <h2 style={{ padding: "50px" }}>Loading...</h2>;

  return (
    <div className="details">

      <div className="details-grid">

        <div>

          <img
            className="main-image"
            src={`http://localhost:5000/uploads/${book.images[0]?.imagePath}`}
            alt={book.title}
          />

          <div className="gallery">

            {book.images.map((img) => (
              <img
                key={img.id}
                src={`http://localhost:5000/uploads/${img.imagePath}`}
                alt=""
              />
            ))}

          </div>

        </div>

        <div className="info-card">

          <h1>{book.title}</h1>

          <h3>{book.author}</h3>

          <hr />

          <p>{book.description}</p>

          <div className="price-box">

            <div>

              <small>Suggested Price</small>

              <h2>Rs. {book.suggestedPrice}</h2>

            </div>

            <div>

              <small>Highest Bid</small>

              <h2>

                {book.highestBid
                  ? `Rs. ${book.highestBid}`
                  : "No bids"}

              </h2>

            </div>

          </div>

          <BidForm
            bookId={id}
            onBidPlaced={fetchBook}
          />

        </div>

      </div>

    </div>
  );
}

export default BookDetails;