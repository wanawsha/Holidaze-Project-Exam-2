const BASE_URL = "https://v2.api.noroff.dev/holidaze/venues";

export async function getVenues() {
    try {
        const response = await fetch(BASE_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch venues");
        }

        const data = await response.json();

        return data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getVenueById(id) {
    try {
        const response = await fetch(
            `https://v2.api.noroff.dev/holidaze/venues/${id}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch venue");
        }

        const data = await response.json();

        return data.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const API_KEY = "22c47311-4cac-486b-b6bc-b4d5942ffcd3"; 

export async function createVenue(venueData, token) {

    try {
        const response = await fetch(
        "https://v2.api.noroff.dev/holidaze/venues",
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": API_KEY,
            },
            body: JSON.stringify(venueData),
        }
        );

        const data = await response.json();

        if (!response.ok) {
            console.log("API ERROR:", data);
            throw new Error("Failed to create venue");
        }

        return data.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getMyVenues(token) { 
    try {
        const name = localStorage.getItem("name");

        const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/profiles/${name}?_venues=true`,
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
        throw new Error("Failed to fetch venues");
    }

        return data.data.venues || [];
        } catch (error) {
        console.error(error);
        return [];
    }
}