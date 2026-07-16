import { useState } from "react";
import axios from "axios";

function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [suggestedPrice, setSuggestedPrice] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("author", author);
    formData.append("description", description);
    formData.append("suggestedPrice", suggestedPrice);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      await axios.post("http://localhost:5000/books", formData);

      alert("📚 Book added successfully!");

      setTitle("");
      setAuthor("");
      setDescription("");
      setSuggestedPrice("");
      setImages([]);
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="add-page">
      <div className="form-card">

        <h1>Sell Your Book</h1>

        <p>
          Give your well-loved book a new home.
        </p>

        <form className="book-form" onSubmit={handleSubmit}>

          <label>Book Title</label>
          <input
            type="text"
            placeholder="The Great Gatsby"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Author</label>
          <input
            type="text"
            placeholder="F. Scott Fitzgerald"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />

          <label>Description</label>
          <textarea
            rows="5"
            placeholder="Describe the condition of your book..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label>Suggested Price (Rs.)</label>
          <input
            type="number"
            placeholder="1500"
            value={suggestedPrice}
            onChange={(e) => setSuggestedPrice(e.target.value)}
            required
          />

          <label>Upload up to 3 Images</label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages(e.target.files)}
          />

          <button type="submit">
            Publish Listing
          </button>

        </form>

      </div>
    </div>
  );
}

export default AddBook;