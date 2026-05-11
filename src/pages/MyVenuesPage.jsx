import { useEffect, useState } from "react";
import { getMyVenues, deleteVenue } from "../api/venues";
import { Link } from "react-router-dom";
import Toast from "../components/Toast";

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
        <div>
            <h1>My Venues</h1>
            {venues.length === 0 && <p>No venues yet</p>}
            {venues.map((venue) => (
                <div key={venue.id} style={{ marginBottom: "20px" }}>
                    <h2>{venue.name}</h2>
                    <p>${venue.price}</p>

                    <Link to={`/venues/${venue.id}/edit`}>
                        <button>Edit</button>
                    </Link>

                    <button onClick={() => handleDelete(venue.id)}>Delete</button>
                </div>
            ))}
            <Toast message={toastMessage} show={showToast} setShow={setShowToast} />
        </div>
    );
}

export default MyVenuesPage;