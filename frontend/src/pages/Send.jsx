import { useSearchParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import CardComponent from '../components/Card';

export default function Send() {
  const [searchParams] = useSearchParams();
  const to = searchParams.get("to");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0); 
  const [nav, setNav] = useState(""); 

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const url=import.meta.env.VITE_BACKEND;

  useEffect(() => {
   
    if (token === null || to==null || name==null) {
     if(token===null){
      alert("Please Login First");}
      else{
            alert("Please select a user to send money to");
      }
      navigate("/signin");
    } else {
     
      fetchBalance();
    }
  }, [navigate, token]);

  const fetchBalance = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/user/userinfo`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNav(response.data.firstname); // Assuming firstname is the correct property
    } catch (error) {
      console.error("Error fetching name:", error);
      alert("Failed to fetch name. Please try again.");
    }
  };

  return (
    <div>
      <NavBar name={nav} />
      <div className="m-2">

        <div className="flex items-center gap-2">
        <CardComponent name={name} to={to}/>
        </div>
      </div>
    </div>
  );
}
