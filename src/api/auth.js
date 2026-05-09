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