import React, { useEffect } from "react";
import "./notification.css";

export default function Notification({ message, type, show, onClose }) {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000); // disappears after 3 seconds

            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    return (
        <div className={`notification-wrapper ${show ? "show" : ""}`}>
            <div className={`notification-box ${type}`}>
                <div className="notification-icon">
                    {type === "success" ? "✓" : "!"}
                </div>
                <div className="notification-text">{message}</div>
            </div>
        </div>
    );
}
