import { useEffect, useState } from "react";
import { getMyVenues, deleteVenue } from "../api/venues";
import { Link } from "react-router-dom";
import Toast from "../components/Toast";
import VenueImage from "../components/VenueImage";

function MyVenuesPage() {
    const [venues, setVenues] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        async function fetchVenues() {
            const data = await getMyVenues(token);
            setVenues(data);
        }

        fetchVenues();
    }, []);

    async function handleDelete(id) {
        const token = localStorage.getItem("token");

        const confirmDelete = confirm("Are you sure?");
        if (!confirmDelete) return;

        const success = await deleteVenue(id, token);

        if (success) {
            setToastMessage("Venue deleted!");
            setShowToast(true);

            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } else {
            setToastMessage("Delete failed");
            setShowToast(true);
        }
    }

    return (
        <div style={{ padding: "40px" }}>
            <h1 style={{ marginBottom: "30px" }}>My Venues</h1>

            {venues.length === 0 && <p>No venues yet.</p>}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                {venues.map((venue) => {
                    const imageUrl = venue.media?.[0]?.url;

                    return (
                        <div key={venue.id} style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                            <VenueImage src={imageUrl} alt={venue.name} />

                            <div style={{ padding: "20px" }}>
                                <h2 style={{ marginBottom: "8px" }}>{venue.name}</h2>
                                <p style={{ color: "#666", marginBottom: "8px" }}>{venue.location?.city || "Unknown location"}</p>
                                <p style={{ fontWeight: "600", marginBottom: "16px" }}>${venue.price} / night</p>

                                <div style={{ display: "flex", gap: "10px" }}>
                                    <Link to={`/venues/${venue.id}/edit`}>
                                        <button>Edit</button>
                                    </Link>

                                    <button onClick={() => handleDelete(venue.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <Toast message={toastMessage} show={showToast} setShow={setShowToast} />
        </div>
    );
}

export default MyVenuesPage;