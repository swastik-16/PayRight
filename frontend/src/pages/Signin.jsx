import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [button, setButton] = useState("Login");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButton("Logining...");

    try {
      const response = await axios.post("", {
        email,
        password,
      });
      if (!response) {
        alert("Invalid Credentials");
        navigate("/signup");
        setButton("Login");
      }

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setButton("Login");
    }
  };

  const InputField = ({ label, type, value, onChange, placeholder }) => (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
        placeholder={placeholder}
        autoComplete="off"
        required
      />
    </div>
  );

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-green-200 to-blue-200">
      <form className="bg-white shadow-md rounded-lg p-10 max-w-lg w-full" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Welcome to <span className="text-green-700">PayEase</span></h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
       
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
          className="w-full text-white bg-gradient-to-r from-green-500 to-blue-500 hover:bg-gradient-to-l hover:from-green-500 hover:to-blue-500 focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-full text-sm px-5 py-3 text-center transition duration-150 ease-in-out"
        >
          {button}
        </button>
        <div className="flex justify-center mt-4">
          If you do not have an account?
          <a href="/signup" className="ml-1 text-green-700 underline">SignUp</a>
        </div>
      </form>
    </div>
  );
}
