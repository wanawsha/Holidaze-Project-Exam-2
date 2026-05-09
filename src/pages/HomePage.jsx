import { useEffect, useState } from "react";
import { getVenues } from "../api/venues";

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
            <div key={venue.id} style={{ marginBottom: "20px" }}>
                <h2>{venue.name}</h2>
                <p>{venue.location?.city}</p>
                <p>${venue.price} per night</p>
            </div>
            ))}
        </div>
        </div>
    );
}

export default HomePage;