import { Link } from "react-router-dom";

function VenueCard({ venue }) {

    const imageUrl = venue.media?.[0]?.url;

    return (
        <article>
        {imageUrl && (
            <img src={imageUrl} alt={venue.media?.[0]?.alt || venue.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
        )}
        <h2>{venue.name}</h2>
        <p>{venue.location?.city || "Unknown location"}</p>
        <p>${venue.price} per night</p>
        <p>Max guests: {venue.maxGuests}</p>
        <Link to={`/venues/${venue.id}`}>View venue</Link>
        </article>
    );
}

export default VenueCard;