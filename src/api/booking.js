const BASE_URL = "https://v2.api.noroff.dev/holidaze/bookings";
const API_KEY = "22c47311-4cac-486b-b6bc-b4d5942ffcd3";

export async function createBooking(bookingData, token) {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                "X-Noroff-API-Key": API_KEY,
            },
            body: JSON.stringify(bookingData),
        });

        const data = await response.json();

        if (!response.ok) {
            console.log("API ERROR:", data);
            throw new Error("Failed to create booking");
        }

        return data.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getMyBookings(token) {
    try {
        const name = localStorage.getItem("name");

        const response = await fetch(
            `https://v2.api.noroff.dev/holidaze/profiles/${name}?_bookings=true`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "X-Noroff-API-Key": API_KEY,
                },
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.log("API ERROR:", data);
            throw new Error("Failed to fetch bookings");
        }

        return data.data.bookings || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}