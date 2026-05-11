import { useEffect, useState } from "react";
import { getMyBookings } from "../api/booking";

function MyBookingsPage() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        async function fetchBookings() {
            const data = await getMyBookings(token);
            setBookings(data);
        }

        fetchBookings();
    }, []);

    function formatDate(date) {
        return new Date(date).toLocaleDateString("en-GB");
    }

    return (
        <div style={{ padding: "40px" }}>
            <h1 style={{ marginBottom: "30px" }}>My Bookings</h1>
            {bookings.length === 0 && (
                <p>No bookings yet.</p>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
                {bookings.map((booking) => {
                    const venue = booking.venue;
                    const imageUrl = venue?.media?.[0]?.url;

                    return (
                        <div key={booking.id} style={{ border: "1px solid #ddd", borderRadius: "16px", overflow: "hidden", background: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                            {imageUrl && (
                                <img src={imageUrl} alt={venue.name} style={{ width: "100%", height: "220px", objectFit: "cover" }}/>
                            )}
                            <div style={{ padding: "20px" }}>
                                <h2 style={{ marginBottom: "10px", fontSize: "24px" }}>
                                    {venue.name}
                                </h2>
                                <p style={{ color: "#666", marginBottom: "8px" }}>
                                    {formatDate(booking.dateFrom)} → {formatDate(booking.dateTo)}
                                </p>
                                <p style={{ marginTop: "10px" }}>
                                    Guests: {booking.guests}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MyBookingsPage;