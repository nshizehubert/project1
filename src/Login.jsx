import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      
      if (res.ok) {
        alert("Login Successful!");
        console.log("User data:", data.user);
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Connection error:", error);
      alert("Could not connect to the server. Is your backend running?");
    }
  };

  return (
    <div className="container">
      <form className="card" onSubmit={handleSubmit}>
        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Login to your account</p>

        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
