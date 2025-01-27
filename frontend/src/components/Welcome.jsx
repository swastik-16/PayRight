import { useState, useEffect } from "react";
import axios from "axios";
import Balance from "./Balance";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

export default function Welcome() {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BACKEND; // Ensure this is correctly set in .env file
  const [name, setName] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Check for token existence
    if (!token) {
      alert("Please login first");
      navigate("/signin");
      return;
    }

    // Fetch user name
    const fetchName = async () => {
      try {
        const response = await axios.get(`${url}/api/v1/user/userinfo`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setName(response.data.firstname || "User"); // Fallback to "User" if firstname is not available
      } catch (error) {
        console.error("Error fetching name:", error);
        if (error.response?.status === 401) {
          alert("Unauthorized! Please log in again.");
          localStorage.removeItem("token");
          navigate("/signin");
        } else {
          alert("Failed to fetch name. Please try again later.");
        }
      }
    };

    fetchName();
  }, [token, navigate, url]);

  return (
    <div>
      <NavBar name={name} />

      <h1 className="mt-4 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl">
        Welcome <span className="text-green-700">{name}</span>
      </h1>

      <div className="flex justify-center">
        <Balance />
      </div>
    </div>
  );
}
