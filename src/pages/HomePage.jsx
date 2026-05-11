import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getVenues } from "../api/venues";
import VenueCard from "../components/VenueCard";
import SearchBar from "../components/SearchBar";

function HomePage() {
    const [venues, setVenues] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("search") || "");

    useEffect(() => {
        async function fetchData() {
            const data = await getVenues();
            setVenues(data.sort((a, b) => new Date(b.created) - new Date(a.created)));
        }

        fetchData();
    }, []);

    function handleSearchChange(value) {
        setSearch(value);
        setSearchParams(value ? { search: value } : {});
    }

    const filteredVenues = venues.filter((venue) =>
        venue.name.toLowerCase().includes(search.toLowerCase()) ||
        venue.location?.city?.toLowerCase().includes(search.toLowerCase()) ||
        venue.location?.country?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
            <section style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center", borderRadius: "18px", minHeight: "360px", padding: "50px 40px", marginBottom: "40px", color: "white", position: "relative" }}>
                <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>Find your perfect stay</h1>

                <p style={{ maxWidth: "360px", fontSize: "16px" }}>Discover amazing places to stay for your next getaway</p>

                <div style={{ position: "absolute", left: "50%", bottom: "40px", transform: "translateX(-50%)" }}>
                    <SearchBar search={search} setSearch={handleSearchChange} />
                </div>
            </section>

            <h1 style={{ marginBottom: "30px" }}>Venues</h1>

            {filteredVenues.length === 0 && <p>No venues found.</p>}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
                {filteredVenues.map((venue) => (
                    <VenueCard key={venue.id} venue={venue} />
                ))}
            </div>
        </div>
    );
}

export default HomePage;