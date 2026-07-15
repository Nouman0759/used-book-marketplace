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

      alert("Book Added!");

      setTitle("");
      setAuthor("");
      setDescription("");
      setSuggestedPrice("");
      setImages([]);
    } catch (err) {
      console.error(err);
      alert("Error adding book");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Add Book</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <br /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Suggested Price"
          value={suggestedPrice}
          onChange={(e) => setSuggestedPrice(e.target.value)}
        />

        <br /><br />

        <input
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)}
        />

        <br /><br />

        <button type="submit">
          Add Book
        </button>
      </form>
    </div>
  );
}

export default AddBook;