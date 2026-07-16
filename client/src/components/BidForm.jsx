import { useState } from "react";
import axios from "axios";

function BidForm({ bookId, onBidPlaced }) {
  const [bidderName, setBidderName] = useState("");
  const [bidAmount, setBidAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:5000/books/${bookId}/bid`, {
        bidderName,
        bidAmount,
      });

      setBidderName("");
      setBidAmount("");

      onBidPlaced();
    } catch (err) {
      console.error(err);
      alert("Couldn't place that bid. Try again.");
    }
  };

  return (
    <div className="bid-card">
      <h2>Place your bid</h2>

      <p className="bid-subtitle">
        Submit your best offer for this book.
      </p>

      <form className="bid-form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Your name</label>
          <input
            type="text"
            placeholder="Jane Doe"
            value={bidderName}
            onChange={(e) => setBidderName(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label>Bid amount (Rs.)</label>
          <input
            type="number"
            placeholder="1800"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            required
          />
        </div>

        <button type="submit">
          Place bid
        </button>
      </form>
    </div>
  );
}

export default BidForm;
