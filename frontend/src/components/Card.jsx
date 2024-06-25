import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const CardComponent = ({ name, to }) => {
  const [amount, setAmount] = useState(''); 
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    
    if (token === null) {
      alert("Please Login First");
      navigate("/signin");
    }
  }, [navigate, token]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSendMoney = async () => {
  
    if (amount === '' || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

  
    alert(`Sending ${amount} to ${name}`);

    try {
      const response = await axios.post("http://localhost:3000/api/v1/account/transfer", {
        to,
        amount
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Transaction response:", response.data);
      alert("Money sent successfully!"); 
          navigate("/dashboard");
    } catch (error) {
      console.error("Error sending money:", error);
      alert("Failed to send money. Please try again."); 
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 bg-white border border-gray-300 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">You're sending money to</h2>
      <p className="text-green-700 font-bold text-xl mb-4">{name}</p>

      <div className="mb-4">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter amount"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <button
        onClick={handleSendMoney}
        className="block w-full px-4 py-2 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600 focus:outline-none focus:bg-green-600"
      >
        Send Money
      </button>
    </div>
  );
};

export default CardComponent;
