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

      alert("🎉 Bid placed successfully!");

      setBidderName("");
      setBidAmount("");

      onBidPlaced();
    } catch (err) {
      console.error(err);
      alert("Failed to place bid.");
    }
  };

  return (
    <div className="bid-card">
      <h2>Place Your Bid</h2>

      <p className="bid-subtitle">
        Submit your best offer for this book.
      </p>

      <form className="bid-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={bidderName}
          onChange={(e) => setBidderName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Bid Amount (Rs.)"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          required
        />

        <button type="submit">
          Place Bid
        </button>
      </form>
    </div>
  );
}

export default BidForm;