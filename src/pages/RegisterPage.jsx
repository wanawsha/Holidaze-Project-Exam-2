import { useState } from "react";
import { registerUser } from "../api/auth";
import Toast from "../components/Toast";

function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [venueManager, setVenueManager] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    async function handleRegister(event) {
        event.preventDefault();

        const result = await registerUser(name, email, password, venueManager);

        if (result?.error) {
            setToastMessage(result.error);
            setShowToast(true);
            return;
        }

        if (result) {
            setToastMessage("Register successful! You can now login.");
            setShowToast(true);

            setTimeout(() => {
                window.location.href = "/login";
            }, 1500);
        } else {
            setToastMessage("Register failed");
            setShowToast(true);
        }
    }

    return (
        <div>
            <h1>Register</h1>

            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email (must be stud.noroff.no)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label>
                    <input
                        type="checkbox"
                        checked={venueManager}
                        onChange={(e) => setVenueManager(e.target.checked)}
                    />
                    Register as Venue Manager
                </label>
                <button type="submit">Register</button>
            </form>
            <Toast message={toastMessage} show={showToast} setShow={setShowToast} />
        </div>
    );
}

export default RegisterPage;