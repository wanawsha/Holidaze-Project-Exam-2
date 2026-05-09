import { useState } from "react";
import { loginUser } from "../api/auth";

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(event) {
        event.preventDefault();

        const result = await loginUser(email, password);

        if (result) {
        localStorage.setItem("token", result.accessToken);
        localStorage.setItem("name", result.name);
        localStorage.setItem("venueManager", result.venueManager);

        alert("Login successful!");

        window.location.href = "/";
        } else {
        alert("Login failed");
        }
    }

    return (
        <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
        </div>
    );
}

export default LoginPage;