import React, { useState, useEffect } from "react";
import axios from "axios";
import Name from "./Name";

export default function Users() {
    const [input, setInput] = useState("");
    const [users, setUsers] = useState([]);
    const [mine, setMine] = useState(null);
    const [token, setToken] = useState(""); 

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${input}`);
                setUsers(response.data.user); 
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        const fetchMine = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/user/userinfo", {
                    headers: {
                        Authorization: `Bearer ${token}` 
                    }
                });
                setMine(response.data.userid); 
            } catch (error) {
                console.error("Error fetching name:", error);
            }
        };

       
        const storedToken = localStorage.getItem('token'); 
        if (storedToken) {
            setToken(storedToken);
        }

        Promise.all([fetchUsers(), fetchMine()]);
    }, [input, token]); 


    const filteredUsers = users.filter(user => user._id !== mine);

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
                {filteredUsers.map(user => (
                    <div key={user._id} className="flex flex-col gap-1">
                        <Name name={user.firstName} id={user._id} /> 
                    </div>
                ))}
            </div>
        </div>
    );
}
