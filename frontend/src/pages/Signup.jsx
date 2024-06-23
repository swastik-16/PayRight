import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [button, setButton] = useState("Sign Up");

  const handleSubmit = async (e) => {
   
    setButton("Signing Up...");

    try {
      const response = await axios.post("", {
        firstName,
        lastName,
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setButton("Sign Up");
    }
  };

  const InputField = ({  label, type, value, onChange, placeholder }) => (
     <div className="mb-4">
       <label  className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
       <input
         type={type}
         value={value}
         onChange={onChange}
         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
         placeholder={placeholder}
         autoComplete="off" 
         required
       />
     </div>
   );
   

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-green-200 to-blue-200">
      <form className="bg-white shadow-md rounded-lg p-10 max-w-lg w-full" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign Up</h2>
        <InputField
          id="firstName"
          label="First name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Rishit"
        />
        <InputField
          id="lastName"
          label="Last name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Kamboj"
        />
        <InputField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="rishit@gmail.com"
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="●●●●●●●"
        />
        <button
          type="submit"
          className="w-full text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:bg-gradient-to-l hover:from-teal-400 hover:to-blue-500 focus:ring-4 focus:outline-none focus:ring-teal-200 font-medium rounded-lg text-sm px-5 py-3 text-center transition duration-150 ease-in-out"
        >
          {button}
        </button>
      </form>
    </div>
  );
}
