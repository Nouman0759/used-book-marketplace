import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BidForm from "../components/BidForm";

function BookDetails() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  const fetchBook = () => {
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setActiveImage(res.data.images[0]?.imagePath ?? null);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  if (!book) return <h2 style={{ padding: "50px" }}>Loading...</h2>;

  return (
    <div className="details">

      <div className="details-grid">

        <div className="image-pocket">

          <img
            className="main-image"
            src={`http://localhost:5000/uploads/${activeImage}`}
            alt={book.title}
          />

          <div className="gallery">

            {book.images.map((img) => (
              <img
                key={img.id}
                src={`http://localhost:5000/uploads/${img.imagePath}`}
                alt=""
                onClick={() => setActiveImage(img.imagePath)}
                className={img.imagePath === activeImage ? "active" : ""}
              />
            ))}

          </div>

        </div>

        <div className="info-card">

          <p className="catalog-no">No. {String(book.id).padStart(3, "0")} &middot; fiction</p>

          <h1>{book.title}</h1>

          <h3>{book.author}</h3>

          <hr />

          <p>{book.description}</p>

          <div className="price-box">

            <div>
              <small>Suggested price</small>
              <h2>Rs. {book.suggestedPrice}</h2>
            </div>

            <div className="highest">
              <small>Highest bid</small>
              <h2>
                {book.highestBid ? `Rs. ${book.highestBid}` : "\u2014"}
              </h2>
            </div>

          </div>

          <div className="ledger">
            <div className="ledger-head">Date due &middot; bid record</div>

            {book.bids.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Bidder</th>
                    <th>Amount</th>
                    <th>Placed</th>
                  </tr>
                </thead>
                <tbody>
                  {book.bids.map((bid, i) => (
                    <tr key={bid.id} className={i === 0 ? "top" : ""}>
                      <td>{bid.bidderName}</td>
                      <td>Rs. {bid.bidAmount}</td>
                      <td>
                        {new Date(bid.timestamp).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="empty">No bids stamped yet &mdash; be the first.</p>
            )}
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
