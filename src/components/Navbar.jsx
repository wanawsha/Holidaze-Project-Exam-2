import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header style={{ padding: "16px", borderBottom: "1px solid #ddd" }}>
      <nav style={{ display: "flex", gap: "16px" }}>
        <Link to="/">Holidaze</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/my-bookings">My Bookings</Link>
        <Link to="/my-venues">My Venues</Link>
      </nav>
    </header>
  );
}

export default Navbar;