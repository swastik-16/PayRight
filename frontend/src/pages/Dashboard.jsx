import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../components/Avatar";

export default function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token === null) {
            alert("Please Login First");
            navigate("/signin");
        }
    }, [navigate]);

    return (
        <div>hehehe</div>
    );
}
