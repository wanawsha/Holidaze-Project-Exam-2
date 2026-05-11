import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVenueById } from "../api/venues";
import { createBooking } from "../api/booking";
import Toast from "../components/Toast";
import VenueImage from "../components/VenueImage";

function VenueDetailsPage() {
    const { id } = useParams();
    const [venue, setVenue] = useState(null);
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [guests, setGuests] = useState(1);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    useEffect(() => {
        async function fetchVenue() {
            const data = await getVenueById(id);
            setVenue(data);
        }

        fetchVenue();
    }, [id]);

    async function handleBooking() {
        const token = localStorage.getItem("token");

        if (!token) {
            setToastMessage("You must be logged in to book");
            setShowToast(true);
            return;
        }

        const bookingData = {
            dateFrom,
            dateTo,
            guests: Number(guests),
            venueId: venue.id,
        };

        const result = await createBooking(bookingData, token);

        if (result) {
            setToastMessage("Booking successful!");
            setShowToast(true);

            setTimeout(() => {
                window.location.href = "/my-bookings";
            }, 1500);
        } else {
            setToastMessage("Booking failed");
            setShowToast(true);
        }
    }

    if (!venue) {
        return <p>Loading venue...</p>;
    }

    const imageUrl = venue.media?.[0]?.url;

    return (
        <div>
            <h1>{venue.name}</h1>
             <VenueImage src={imageUrl} alt={venue.name} height="400px"/>
            <p>{venue.description}</p>
            <p>Location: {venue.location?.city}</p>
            <p>Price: ${venue.price} per night</p>
            <p>Max guests: {venue.maxGuests}</p>
            <div style={{ marginTop: "30px", padding: "20px", border: "1px solid #ddd" }}>
                <h2>Book this venue</h2>

                <label>Check-in</label>
                <input type="date" value={dateFrom} onChange={(event) => setDateFrom(event.target.value)} />

                <label>Check-out</label>
                <input type="date" value={dateTo} onChange={(event) => setDateTo(event.target.value)} />

                <label>Guests</label>
                <input type="number" min="1" max={venue.maxGuests} value={guests} onChange={(event) => setGuests(event.target.value)} />

                <button onClick={handleBooking} style={{ marginTop: "10px" }}>
                    Book Now
                </button>
            </div>
            <Toast message={toastMessage} show={showToast} setShow={setShowToast} />
        </div>
    );
}

export default VenueDetailsPage;