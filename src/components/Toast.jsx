import { useEffect } from "react";

function Toast({ message, show, setShow }) {
    useEffect(() => {
        if (show) {
        const timer = setTimeout(() => {
            setShow(false);
        }, 3000);

        return () => clearTimeout(timer);
        }
    }, [show]);

    if (!show) return null;

    return (
        <div
        style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            background: "#333",
            color: "#fff",
            padding: "12px 16px",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
        >
        {message}
        </div>
    );
}

export default Toast;