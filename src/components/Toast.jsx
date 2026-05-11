import { useEffect } from "react";

function Toast({ message, show, setShow }) {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setShow(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [show, setShow]);

    if (!show) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: "20px",
                right: "20px",
                backgroundColor: "#474b68",
                color: "#ffffff",
                padding: "14px 18px",
                borderRadius: "14px",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                border: "1px solid #eee",
                zIndex: 9999,
                fontSize: "14px",
                fontWeight: "500",
                maxWidth: "320px",
            }}
        >
            {message}
        </div>
    );
}

export default Toast;