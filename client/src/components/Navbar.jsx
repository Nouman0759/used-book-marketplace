import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px",
        background: "#222",
        color: "white",
      }}
    >
      <Link to="/" style={{ color: "white" }}>
        Used Books
      </Link>

      <Link to="/add" style={{ color: "white" }}>
        Add Book
      </Link>
    </nav>
  );
}

export default Navbar;