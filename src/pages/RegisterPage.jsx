import { useState } from "react";
import { registerUser } from "../api/auth";

function RegisterPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [venueManager, setVenueManager] = useState(false);

    async function handleRegister(event) {
        event.preventDefault();

        const result = await registerUser(name, email, password, venueManager);

        if (result?.error) {
            alert(result.error);
            return;
            }

        if (result) {
            alert("Register successful! You can now login.");
            window.location.href = "/login";
        } else {
        alert("Register failed");
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
        </div>
    );
}

export default RegisterPage;