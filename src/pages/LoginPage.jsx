import { useState } from "react";
import { loginUser, getProfile } from "../api/auth";
import Toast from "../components/Toast";

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    async function handleLogin(event) {
        event.preventDefault();

        const result = await loginUser(email, password);

        if (result) {
            const profile = await getProfile(result.name, result.accessToken);

            localStorage.setItem("token", result.accessToken);
            localStorage.setItem("name", result.name);
            localStorage.setItem("venueManager", profile?.venueManager);
            
            setToastMessage("Login successful!");
            setShowToast(true);

            setTimeout(() => {
                window.location.href = "/";
            }, 1500);
        } else {
            setToastMessage("Login failed");
            setShowToast(true);
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
        <Toast message={toastMessage} show={showToast} setShow={setShowToast}/>
        </div>
    );
}

export default LoginPage;