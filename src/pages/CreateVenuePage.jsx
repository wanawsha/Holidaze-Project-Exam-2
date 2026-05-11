import { useState } from "react";
import { createVenue } from "../api/venues";
import Toast from "../components/Toast";

function CreateVenuePage() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [maxGuests, setMaxGuests] = useState(1);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    async function handleCreateVenue(event) {
        event.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            alert("You must be logged in");
            return;
        }

        const venueData = {
            name,
            description,
            price: Number(price),
            maxGuests: Number(maxGuests),
        };

        const result = await createVenue(venueData, token);

        if (result) {
            setToastMessage("Venue created!");
            setShowToast(true);

            setTimeout(() => {
                window.location.href = "/my-venues";
            }, 1500);
        } else {
            setToastMessage("Failed to create venue");
            setShowToast(true);
        }
    }

    return (
        <div>
            <h1>Create Venue</h1>
            <form onSubmit={handleCreateVenue}>
                <input
                    type="text"
                    placeholder="Venue name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Price per night"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Max guests"
                    value={maxGuests}
                    onChange={(e) => setMaxGuests(e.target.value)}
                />
                <button type="submit">Create Venue</button>
            </form>
            <Toast message={toastMessage} show={showToast} setShow={setShowToast} />
        </div>
    );
}

export default CreateVenuePage;