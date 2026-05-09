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

    return (
        <div>
            <h1>My Bookings</h1>
            {bookings.length === 0 && <p>No bookings yet</p>}
            {bookings.map((booking) => (
                <div key={booking.id} style={{ marginBottom: "20px" }}>
                    <h2>{booking.venue?.name}</h2>
                    <p>
                        {booking.dateFrom} → {booking.dateTo}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default MyBookingsPage;