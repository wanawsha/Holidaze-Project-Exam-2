import { Link } from "react-router-dom";
import VenueImage from "./VenueImage";

function VenueCard({ venue }) {
    const imageUrl = venue.media?.[0]?.url;

    return (
        <Link to={`/venues/${venue.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <article style={{ background: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 10px rgba(0,0,0,0.18)", cursor: "pointer" }}>
                <VenueImage src={imageUrl} alt={venue.name} height="190px" />
                <div style={{ padding: "16px 18px" }}>
                    <h2 style={{ fontSize: "15px", marginBottom: "4px" }}>{venue.name}</h2>
                    <p style={{ color: "var(--color-primary)", marginBottom: "28px" }}>
                        📍 {venue.location?.city || "Unknown location"}, {venue.location?.country || ""}
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <p style={{ fontSize: "20px" }}>
                            <strong>${venue.price}</strong> <span style={{ color: "var(--color-primary)" }}>/ night</span>
                        </p>

                        <p style={{ color: "var(--color-primary)" }}>
                            👥 {venue.maxGuests} Guests
                        </p>
                    </div>
                </div>
            </article>
        </Link>
    );
}

export default VenueCard;