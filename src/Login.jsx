import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate(); // Initialize navigate

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
        // ✅ 1. Store user info in localStorage
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("username", data.user.username);
        
        alert("Login Successful!");
        
        // ✅ 2. Redirect to Dashboard
        navigate("/dashboard");
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Connection error:", error);
      alert("Could not connect to the server.");
    }
  };

  return (
    <div className="container">
      <form className="card" onSubmit={handleSubmit}>
        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Login to your account</p>

        {/* Note: Your server only checks email/password for login, 
            so 'username' here is optional unless you want it for display */}
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

        <button type="submit">Login</button>
        <p style={{ marginTop: "10px", fontSize: "0.9rem" }}>
          Don't have an account? <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/register")}>Register</span>
        </p>
      </form>
    </div>
  );
}

export default Login;
