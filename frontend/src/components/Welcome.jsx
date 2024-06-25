import { useState,useEffect } from "react";
import axios from "axios";
import Balance from "./Balance";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Name from "./Name";


export default function Welcome(){
     const navigate = useNavigate();
         const [name,setName]=useState("");
         const token=localStorage.getItem("token");
         useEffect(() => {
          if (token == null) {
            alert("Please login first");
            navigate("/signin");
          } else {
            const fetchBalance = async () => {
              try {
                const response = await axios.get("http://localhost:3000/api/v1/user/userinfo", {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                });
                setName(response.data.  firstname); 
              } catch (error) {
                console.error("Error fetching name:", error);
                alert("Failed to fetch name. Please try again.");
              }
            };
      
            fetchBalance();
          }
        }, [token, navigate]);

     
         return(<div>
          <NavBar name={name}/>

<h1 className=" mt-4 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl ">Welcome <span class="text-green-700">{name}</span></h1>

<div className="flex justify-center">
<Balance/></div>

         </div>)






}