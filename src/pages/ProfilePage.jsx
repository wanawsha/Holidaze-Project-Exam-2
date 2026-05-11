import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfile } from "../api/auth";

function ProfilePage() {
    const name = localStorage.getItem("name");
    const token = localStorage.getItem("token");
    const isManager = localStorage.getItem("venueManager") === "true";

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        async function fetchProfile() {
            const data = await getProfile(name, token);
            setProfile(data);
        }

        fetchProfile();
    }, [name, token]);

    if (!profile) {
        return <p>Loading profile...</p>;
    }

    return (
        <div style={{ padding: "20px" }}>
            {profile.banner?.url && (
                <img
                    src={profile.banner.url}
                    alt={profile.banner.alt || "Profile banner"}
                    style={{ width: "100%", height: "250px", objectFit: "cover" }}
                />
            )}

            {profile.avatar?.url && (
                <img
                    src={profile.avatar.url}
                    alt={profile.avatar.alt || "Profile avatar"}
                    style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                        borderRadius: "50%",
                        marginTop: "-60px",
                        border: "4px solid white",
                    }}
                />
            )}
            <h1>{profile.name}</h1>
            <p>{profile.email}</p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <Link to="/profile/edit">
                    <button>Edit Profile</button>
                </Link>
                {isManager && (
                    <>
                        <Link to="/venues/create">
                            <button>Create Venue</button>
                        </Link>
                        <Link to="/my-venues">
                            <button>My Venues</button>
                        </Link>
                        <Link to="/my-bookings">
                            <button>My Bookings</button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default ProfilePage;