const BASE_URL = "https://v2.api.noroff.dev/auth/login";

export async function loginUser(email, password) {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        const data = await response.json();

        return data.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const REGISTER_URL = "https://v2.api.noroff.dev/auth/register";

export async function registerUser(name, email, password, venueManager) {
    try {
        const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
            password,
            venueManager,
        }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.log("REGISTER ERROR:", data);
            return {
                error: data.errors?.[0]?.message || "Register failed",
            };
        }

        return data.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const PROFILE_URL = "https://v2.api.noroff.dev/holidaze/profiles";
const API_KEY = "22c47311-4cac-486b-b6bc-b4d5942ffcd3"; // din key

export async function getProfile(name, token) {
    try {
        const response = await fetch(`${PROFILE_URL}/${name}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "X-Noroff-API-Key": API_KEY,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            console.log("PROFILE ERROR:", data);
            return null;
        }

        return data.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}