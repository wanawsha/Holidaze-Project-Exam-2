import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVenueById, updateVenue } from "../api/venues";
import Toast from "../components/Toast";

function EditVenuePage() {
    const { id } = useParams();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [maxGuests, setMaxGuests] = useState(1);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    useEffect(() => {
        async function fetchVenue() {
            const data = await getVenueById(id);

            if (data) {
                setName(data.name);
                setDescription(data.description);
                setPrice(data.price);
                setMaxGuests(data.maxGuests);
            }
        }

        fetchVenue();
    }, [id]);

    async function handleUpdate(event) {
        event.preventDefault();

        const token = localStorage.getItem("token");

        const venueData = {
            name,
            description,
            price: Number(price),
            maxGuests: Number(maxGuests),
        };

        const result = await updateVenue(id, venueData, token);

        if (result) {
            setToastMessage("Venue updated!");
            setShowToast(true);

            setTimeout(() => {
                window.location.href = "/my-venues";
            }, 1500);
        } else {
            setToastMessage("Update failed");
            setShowToast(true);
        }
    }

    return (
        <div>
            <h1>Edit Venue</h1>
            <form onSubmit={handleUpdate}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                <input type="number" value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)} />
                <button type="submit">Save Changes</button>
            </form>
            <Toast message={toastMessage} show={showToast} setShow={setShowToast} />
        </div>
    );
}

export default EditVenuePage;