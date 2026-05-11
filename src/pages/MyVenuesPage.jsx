import { useEffect, useState } from "react";
import { getMyVenues } from "../api/venues";
import { deleteVenue } from "../api/venues";

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


    async function handleDelete(id) {
        const token = localStorage.getItem("token");

        const confirmDelete = confirm("Are you sure?");
        if (!confirmDelete) return;

        const success = await deleteVenue(id, token);

        if (success) {
          alert("Venue deleted!");
          window.location.reload();
        } else {
          alert("Delete failed");
        }
    }


  return (
    <div>
      <h1>My Venues</h1>
      {venues.map((venue) => (
        <div key={venue.id} style={{ marginBottom: "20px" }}>
          <h2>{venue.name}</h2>
          <p>${venue.price}</p>
          <button onClick={() => handleDelete(venue.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default MyVenuesPage;
