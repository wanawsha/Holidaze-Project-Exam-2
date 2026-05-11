import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfile } from "../api/auth";
import { getMyVenues } from "../api/venues";
import { getMyBookings } from "../api/booking";
import VenueImage from "../components/VenueImage";

function ProfilePage() {
    const name = localStorage.getItem("name");
    const token = localStorage.getItem("token");
    const isManager = localStorage.getItem("venueManager") === "true";

    const [profile, setProfile] = useState(null);
    const [venues, setVenues] = useState([]);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const profileData = await getProfile(name, token);
            const venueData = await getMyVenues(token);
            const bookingData = await getMyBookings(token);

            setProfile(profileData);
            setVenues(venueData.slice(0, 3));
            setBookings(bookingData.slice(0, 3));
        }

        fetchData();
    }, [name, token]);

    if (!profile) {
        return <p>Loading profile...</p>;
    }

    return (
        <div style={{ padding: "20px" }}>
            {profile.banner?.url && (
                <img src={profile.banner.url} alt={profile.banner.alt || "Profile banner"} style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "18px" }} />
            )}
            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginTop: "-60px", paddingLeft: "20px" }}>
                {profile.avatar?.url && (
                    <img src={profile.avatar.url} alt={profile.avatar.alt || "Profile avatar"} style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "50%", border: "4px solid white", background: "#fff" }} />
                )}
                <div style={{ marginTop: "60px" }}>
                    <h1>{profile.name}</h1>
                    <p style={{ color: "#666" }}>{profile.email}</p>
                </div>
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "30px" }}>
                <Link to="/profile/edit">
                    <button className="primary-button">Edit Profile</button>
                </Link>
                <Link to="/my-bookings">
                    <button className="outline-button">My Bookings</button>
                </Link>
                {isManager && (
                    <>
                        <Link to="/my-venues">
                            <button className="outline-button">My Venues</button>
                        </Link>
                        <Link to="/venues/create">
                            <button className="success-button">+ Create Venue</button>
                        </Link>
                    </>
                )}
            </div>
            {isManager && (
                <>
                    <h2 style={{ marginTop: "50px", marginBottom: "20px" }}>Your Recent Venues:</h2>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 420px))", gap: "20px" }}>
                        {venues.map((venue) => {
                            const imageUrl = venue.media?.[0]?.url;

                            return (
                                <div key={venue.id} style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                                    <VenueImage src={imageUrl} alt={venue.name} height="220px" />
                                    <div style={{ padding: "24px" }}>
                                        <h3>{venue.name}</h3>
                                        <p>${venue.price} / night</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
            <h2 style={{ marginTop: "50px", marginBottom: "20px" }}>Your Recent Bookings:</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 420px))", gap: "20px" }}>
                {bookings.map((booking) => {
                    const imageUrl = booking.venue?.media?.[0]?.url;

                    return (
                        <div key={booking.id} style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                            <VenueImage src={imageUrl} alt={booking.venue?.name} height="220px" />

                            <div style={{ padding: "24px" }}>
                                <h3>{booking.venue?.name}</h3>
                                <p>{booking.guests} guests</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ProfilePage;
