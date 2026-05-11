import { Link } from "react-router-dom";

function Navbar() {
    const token = localStorage.getItem("token");
    const isManager = localStorage.getItem("venueManager") === "true";

    function handleLogout() {
        localStorage.clear();
        window.location.href = "/";
    }

    return (
        <header style={{ padding: "16px", borderBottom: "1px solid #ddd" }}>
        <nav style={{ display: "flex", gap: "16px" }}>
            <Link to="/">Holidaze</Link>
            {!token && (
            <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </>
            )}
            {token && (
                <>
                    <Link to="/profile">Profile</Link>
                    <Link to="/my-bookings">My Bookings</Link>
                    {isManager && (
                    <Link to="/my-venues">My Venues</Link>
                    )}
                    <button onClick={handleLogout}>
                    Logout
                    </button>
                </>
            )}
        </nav>
        </header>
    );
}

export default Navbar;