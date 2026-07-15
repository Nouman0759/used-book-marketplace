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

      alert("Bid placed!");

      setBidderName("");
      setBidAmount("");

      onBidPlaced();
    } catch (err) {
      console.error(err);
      alert("Failed to place bid");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Place a Bid</h2>

      <input
        type="text"
        placeholder="Your Name"
        value={bidderName}
        onChange={(e) => setBidderName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Bid Amount"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
      />

      <br />
      <br />

      <button type="submit">Submit Bid</button>
    </form>
  );
}

export default BidForm;