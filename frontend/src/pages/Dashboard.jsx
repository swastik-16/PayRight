import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../components/Avatar";
import Welcome from "../components/Welcome";
import Users from "../components/AvailableUser";

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
        <div>
            <Welcome/>
            <Users/></div>
    );
}
