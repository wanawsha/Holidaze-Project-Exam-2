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