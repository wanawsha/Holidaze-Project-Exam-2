import { Link } from "react-router-dom";

function Navbar() {
    const token = localStorage.getItem("token");
    const isManager = localStorage.getItem("venueManager") === "true";

    function handleLogout() {
        localStorage.clear();
        window.location.href = "/";
    }

    return (
        <header style={{ padding: "28px 60px", borderBottom: "1px solid var(--color-secondary)", background: "#fff" }}>
            <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "30px" }}>
                <Link to="/" style={{ fontSize: "32px", fontWeight: "700", color: "var(--color-primary)" }}>Holidaze</Link>


                <div style={{ display: "flex", alignItems: "center", gap: "24px", marginLeft: "auto" }}>
                    {!token && (
                        <>
                            <Link to="/register" style={{ color: "var(--color-primary)", fontWeight: "600" }}>Register</Link>
                            <Link to="/login"><button className="primary-button">Login</button></Link>
                        </>
                    )}

                    {token && (
                        <>
                            <Link to="/profile" style={{ color: "var(--color-primary)", fontWeight: "600" }}>Profile</Link>
                            <Link to="/my-bookings" style={{ color: "var(--color-primary)", fontWeight: "600" }}>My Bookings</Link>
                            {isManager && <Link to="/my-venues" style={{ color: "var(--color-primary)", fontWeight: "600" }}>My Venues</Link>}
                            <button className="primary-button" onClick={handleLogout}>Logout</button>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Navbar;