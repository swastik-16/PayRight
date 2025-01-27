import React, { useState, useEffect } from "react";
import axios from "axios";
import Name from "./Name";

export default function Users() {
    const [input, setInput] = useState("");
    const [users, setUsers] = useState([]);
    const [mine, setMine] = useState(null);
    const [token, setToken] = useState(""); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const url = import.meta.env.VITE_BACKEND;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${url}/api/v1/user/bulk?filter=${input}`);
                console.log("Users Response:", response.data); // Log full users response
                // Extract users properly
                setUsers(response.data.users || []); // Ensure you're accessing the correct field
            } catch (error) {
                console.error('Error fetching users:', error);
                setError("Failed to fetch users.");
            }
        };

        const fetchMine = async () => {
            try {
                const response = await axios.get(`${url}/api/v1/user/userinfo`, {
                    headers: {
                        Authorization: `Bearer ${token}` 
                    }
                });
                console.log("Mine Response:", response.data); // Log mine response
                setMine(response.data.userid); 
            } catch (error) {
                console.error("Error fetching user info:", error);
                setError("Failed to fetch user info.");
            }
        };

        // Get the token from localStorage
        const storedToken = localStorage.getItem('token'); 
        if (storedToken) {
            setToken(storedToken);
        }

        // Only fetch data if token is available and input is valid
        if (token) {
            setLoading(true); // Start loading when fetching
            Promise.all([fetchUsers(), fetchMine()])
                .then(() => setLoading(false))
                .catch(() => setLoading(false)); // End loading on error
        }
    }, [input, token]); // Dependency on `input` and `token` to re-fetch

    console.log("Filtered Users:", users); // Log users before filtering
    console.log("Mine User ID:", mine); // Log current user ID

    // Ensure mine is valid before filtering and type-check _id and mine
    const filteredUsers = users.filter(user => {
        // Convert both to string to avoid type mismatch (in case _id is an ObjectId)
        const userId = user._id.toString();
        const mineId = mine ? mine.toString() : null;

        console.log("Checking user:", userId, "Against mine:", mineId); // Log each check
        return userId !== mineId; // Compare userId to mineId as strings
    });

    // Show loading or error state
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="m-2">
            <div className="mb-2 text-xl font-bold">Pay to:</div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="block w-full mb-2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
            />
            <div className="flex flex-col items-center">
                {filteredUsers.length === 0 ? (
                    <div>No users found</div>
                ) : (
                    filteredUsers.map(user => (
                        <div key={user._id} className="flex flex-col gap-1">
                            <Name name={user.firstName} id={user._id} /> 
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
