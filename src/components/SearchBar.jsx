function SearchBar({ search, setSearch, width = "420px" }) {
    return (
        <div
            style={{
                background: "white",
                color: "#222",
                borderRadius: "18px",
                padding: "16px 24px",
                display: "flex",
                alignItems: "center",
                gap: "18px",
                width,
                boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
            }}>
            <span style={{ fontSize: "22px" }}>🔍</span>
            <div style={{ flex: 1 }}>
                <strong style={{ display: "block", marginBottom: "4px" }}>
                    Where
                </strong>
                <input
                    type="text"
                    placeholder="Search destination"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        border: "none",
                        outline: "none",
                        fontSize: "15px",
                        width: "100%",
                        margin: 0,
                        padding: 0,
                        borderRadius: 0,
                        background: "transparent",
                    }}
                />
            </div>
        </div>
    );
}

export default SearchBar;