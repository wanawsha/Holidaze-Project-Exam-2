import { useEffect, useState } from "react";
import { getMyVenues } from "../api/venues";

function MyVenuesPage() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function fetchVenues() {
      const data = await getMyVenues(token);
      setVenues(data);
    }

    fetchVenues();
  }, []);

  return (
    <div>
      <h1>My Venues</h1>
      {venues.length === 0 && <p>No venues yet</p>}
      {venues.map((venue) => (
        <div key={venue.id} style={{ marginBottom: "20px" }}>
          <h2>{venue.name}</h2>
          <p>${venue.price} / night</p>
        </div>
      ))}
    </div>
  );
}

export default MyVenuesPage;