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