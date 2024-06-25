import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Balance() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token == null) {
      alert("Please login first");
      navigate("/signin");
    } else {
      const fetchBalance = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setBalance(response.data.balance); 
        } catch (error) {
          console.error("Error fetching balance:", error);
          alert("Failed to fetch balance. Please try again.");
        }
      };

      fetchBalance();
    }
  }, [token, navigate]);

  return (
    <div>
      <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-4xl">
        You have available <mark className="px-2 text-white bg-green-700 rounded">balance:</mark> Rs.{Math.round(balance)}.00
      </h1>
    </div>
  );
}
