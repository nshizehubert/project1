import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState({ username: "Loading...", email: "..." });
  const navigate = useNavigate();
  
  // Get the ID we saved during login
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:5000/users/${userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };

    fetchProfile();
  }, [userId, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userId"); // Clear session
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto", textAlign: "center" }}>
      <Link to="/dashboard" style={{ display: "block", marginBottom: "20px", color: "var(--text-color)" }}>⬅️ Dashboard</Link>
      
      <div style={{ 
        backgroundColor: "var(--card-bg)", 
        padding: "30px", 
        borderRadius: "15px", 
        border: "1px solid var(--border-color)",
        color: "var(--text-color)",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
      }}>
        <div style={{ 
          width: "80px", height: "80px", borderRadius: "50%", 
          backgroundColor: "#007bff", color: "white", 
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "2rem", margin: "0 auto 15px"
        }}>
          {user.username ? user.username[0].toUpperCase() : "?"}
        </div>

        <h1>{user.username}</h1>
        <p style={{ color: "gray" }}>{user.email}</p>
        <hr style={{ borderColor: "var(--border-color)", margin: "20px 0" }} />
        
        <div style={{ textAlign: "left", fontSize: "0.9rem" }}>
          <p><strong>User ID:</strong> {user.id}</p>
          <p><strong>Status:</strong> ✅ Active Account</p>
        </div>
         <p></p>
        <button 
          onClick={handleLogout}
          style={{ marginTop: "20px", width: "100%", padding: "10px", backgroundColor: "#ff4d4d", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
