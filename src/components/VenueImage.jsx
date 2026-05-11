function VenueImage({ src, alt, height = "220px" }) {
    return src ? (
        <img src={src} alt={alt} style={{ width: "100%", height, objectFit: "cover" }} />
    ) : (
        <div style={{ width: "100%", height, background: "#D9E2EC", display: "flex", alignItems: "center", justifyContent: "center", color: "#6B7C93", fontSize: "14px", fontWeight: "500" }}>
            No image available
        </div>
    );
}

export default VenueImage;