import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVenueById, updateVenue } from "../api/venues";
import Toast from "../components/Toast";

function EditVenuePage() {
    const { id } = useParams();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [price, setPrice] = useState("");
    const [maxGuests, setMaxGuests] = useState(1);
    const [rating, setRating] = useState(0);
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    useEffect(() => {
        async function fetchVenue() {
            const data = await getVenueById(id);

            if (data) {
                setName(data.name || "");
                setDescription(data.description || "");
                setImageUrl(data.media?.[0]?.url || "");
                setPrice(data.price || "");
                setMaxGuests(data.maxGuests || 1);
                setRating(data.rating || 0);
                setCountry(data.location?.country || "");
                setAddress(data.location?.address || "");
                setCity(data.location?.city || "");
                setZip(data.location?.zip || "");
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
            media: imageUrl ? [{ url: imageUrl, alt: name }] : [],
            price: Number(price),
            maxGuests: Number(maxGuests),
            rating: Number(rating),
            location: {
                country,
                address,
                city,
                zip,
            },
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
        <div className="form-page">
            <div className="form-card">
                <h1 className="form-title">Edit venue</h1>
                <form onSubmit={handleUpdate}>
                    <input className="form-line-input" type="text" placeholder="Title" value={name} onChange={(e) => setName(e.target.value)} />
                    <input className="form-line-input" type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <input className="form-line-input" type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                    {imageUrl && (
                        <img src={imageUrl} alt="Venue preview" style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "12px", marginBottom: "20px" }} />
                    )}
                    <div className="form-grid">
                        <input className="form-rounded-input" type="number" placeholder="Price / night (Nok)" value={price} onChange={(e) => setPrice(e.target.value)} />
                        <input className="form-rounded-input" type="number" placeholder="Max Guests" value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)} />
                    </div>
                    <input className="form-line-input" type="number" placeholder="Rating (0-5)" min="0" max="5" value={rating} onChange={(e) => setRating(e.target.value)} />
                    <h2 style={{ color: "var(--color-primary)", margin: "24px 0 16px", fontSize: "20px" }}>Location</h2>
                    <div className="form-grid">
                        <input className="form-line-input" type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
                        <input className="form-line-input" type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                        <input className="form-line-input" type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                        <input className="form-rounded-input" type="text" placeholder="Zip Code" value={zip} onChange={(e) => setZip(e.target.value)} />
                    </div>
                    <button className="primary-button" type="submit" style={{ width: "100%", marginTop: "40px" }}>
                        Save Changes
                    </button>
                </form>
                <Toast message={toastMessage} show={showToast} setShow={setShowToast} />
            </div>
        </div>
    );
}

export default EditVenuePage;