import { useEffect, useState } from "react";
import { getVenues } from "../api/venues";
import VenueCard from "../components/VenueCard";

function HomePage() {
    const [venues, setVenues] = useState([]);

    useEffect(() => {
        async function fetchData() {
        const data = await getVenues();
        setVenues(data);
        }

        fetchData();
    }, []);

    return (
        <div>
            <h1>Home</h1>
            {venues.length === 0 && <p>Loading venues...</p>}
            <div>
                {venues.map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
                ))}
            </div>
        </div>
    );
}

export default HomePage;