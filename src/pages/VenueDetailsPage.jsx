import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVenueById } from "../api/venues";

function VenueDetailsPage() {
    const { id } = useParams();
    const [venue, setVenue] = useState(null);

    useEffect(() => {
        async function fetchVenue() {
        const data = await getVenueById(id);
        setVenue(data);
        }

        fetchVenue();
    }, [id]);

    if (!venue) {
        return <p>Loading venue...</p>;
    }

    const imageUrl = venue.media?.[0]?.url;

    return (
        <div>
            <h1>{venue.name}</h1>
            {imageUrl && (<img src={imageUrl} alt={venue.media?.[0]?.alt || venue.name} style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}/>
            )}
            <p>{venue.description}</p>
            <p>Location: {venue.location?.city}</p>
            <p>Price: ${venue.price} per night</p>
            <p>Max guests: {venue.maxGuests}</p>
        </div>
    );
}

export default VenueDetailsPage;