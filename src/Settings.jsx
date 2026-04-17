import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Settings() {
  // Theme State
  const [isDark, setIsDark] = useState(localStorage.getItem("theme") === "dark");
  
  // Password State
  const [newPassword, setNewPassword] = useState("");
  const userId = localStorage.getItem("userId");

  // Apply Dark Mode
  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // Handle Password Update
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/users/${userId}/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword })
      });
      const data = await res.json();
      if (res.ok) {
        alert("Password updated successfully! ✅");
        setNewPassword(""); // Clear input
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      alert("Failed to connect to server.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <Link to="/dashboard">⬅️ Back to Dashboard</Link>
      <h1>⚙️ Settings</h1>

      {/* Appearance Section */}
      <section style={{ 
        padding: "20px", marginBottom: "20px",
        backgroundColor: "var(--card-bg)", border: "1px solid var(--border-color)", borderRadius: "10px" 
      }}>
        <h3>Appearance</h3>
        <button onClick={() => setIsDark(!isDark)}>
          {isDark ? "🌙 Switch to Light" : "☀️ Switch to Dark"}
        </button>
      </section>

      {/* Security Section */}
      <section style={{ 
        padding: "20px", 
        backgroundColor: "var(--card-bg)", border: "1px solid var(--border-color)", borderRadius: "10px" 
      }}>
        <h3>Security</h3>
        <form onSubmit={handlePasswordUpdate}>
          <input 
            type="password" 
            placeholder="Enter New Password" 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={{ padding: "8px", marginRight: "10px" }}
          />
          <button type="submit">Update Password</button>
        </form>
      </section>
    </div>
  );
}

export default Settings;
