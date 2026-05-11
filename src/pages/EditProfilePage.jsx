import { useState } from "react";
import { updateProfile } from "../api/auth";
import Toast from "../components/Toast";

function EditProfilePage() {
    const name = localStorage.getItem("name");
    const token = localStorage.getItem("token");

    const [avatarUrl, setAvatarUrl] = useState("");
    const [bannerUrl, setBannerUrl] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    async function handleUpdate(event) {
        event.preventDefault();

        const result = await updateProfile(name, avatarUrl, bannerUrl, token);

        if (result) {
            setToastMessage("Profile updated!");
            setShowToast(true);
        } else {
            setToastMessage("Update failed");
            setShowToast(true);
        }
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>Edit Profile</h1>

            <form onSubmit={handleUpdate}>
                <label>Avatar URL</label>
                <input
                    type="text"
                    placeholder="Paste avatar image URL"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                />

                {avatarUrl && (
                    <img
                        src={avatarUrl}
                        alt="Avatar preview"
                        style={{
                            width: "120px",
                            height: "120px",
                            objectFit: "cover",
                            borderRadius: "50%",
                            display: "block",
                            marginTop: "10px",
                        }}
                    />
                )}

                <label>Banner URL</label>
                <input
                    type="text"
                    placeholder="Paste banner image URL"
                    value={bannerUrl}
                    onChange={(e) => setBannerUrl(e.target.value)}
                />

                {bannerUrl && (
                    <img
                        src={bannerUrl}
                        alt="Banner preview"
                        style={{
                            width: "100%",
                            maxWidth: "600px",
                            height: "180px",
                            objectFit: "cover",
                            display: "block",
                            marginTop: "10px",
                        }}
                    />
                )}

                <button type="submit">Save Changes</button>
            </form>

            <Toast message={toastMessage} show={showToast} setShow={setShowToast} />
        </div>
    );
}

export default EditProfilePage;