import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        Second<span>Chapter</span>
        <small>Est. reader to reader</small>
      </div>

      <div className="nav-links">
        <Link to="/">Browse</Link>
        <Link to="/add">Sell a book</Link>
      </div>
    </nav>
  );
}

export default Navbar;
