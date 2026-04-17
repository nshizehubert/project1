import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

// 1. Navbar Component (Can be in this file or its own)
function Navbar() {
  return (
    <nav style={{ 
      background: "#0d279e", 
      padding: "10px", 
      marginBottom: "20px", 
      borderRadius: "5px",
      display: "flex",
      gap: "15px" 
    }}>
      <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>🏠 Home</Link>
      <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>👤 My Profile</Link>
      <Link to="/settings" style={{ color: "white", textDecoration: "none" }}>⚙️ Settings</Link>
      <Link to="/login" style={{ color: "#1fe99b", textDecoration: "none", marginLeft: "auto" }}>Logout</Link>
    </nav>
  );
}

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ username: "", email: "" });

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) { 
      console.error("Fetch error:", err); 
    }
  };

  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;
    try {
      await fetch(`http://localhost:5000/users/${id}`, { method: "DELETE" });
      fetchUsers();
    } catch (err) { 
      console.error("Delete error:", err); 
      alert("Delete failed");
    }
  };

  const updateUser = async (id) => {
    try {
      await fetch(`http://localhost:5000/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm)
      });
      setEditingId(null);
      fetchUsers();
    } catch (err) { 
      console.error("Update error:", err); 
      alert("Update failed");
    }
  };

  const startEdit = (user) => {
    setEditingId(user.id);
    setEditForm({ username: user.username, email: user.email });
  };

  useEffect(() => { fetchUsers(); }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      {/* 2. Insert Navbar at the top */}
      <Navbar />

      <h1>🗄️ User hubert Dashboard</h1>
      <p><em>Manage your users databases</em></p>
      
      {users.length === 0 ? (
        <p>No users found. <Link to="/register">Register someone!</Link></p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {users.map(user => (
            <li key={user.id} style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              padding: "10px", 
              border: "1px solid #ddd", 
              margin: "10px 0",
              borderRadius: "5px"
            }}>
              {editingId === user.id ? (
                <div style={{ flex: 1 }}>
                  <input 
                    value={editForm.username} 
                    onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                    style={{ marginRight: "10px" }}
                  />
                  <input 
                    value={editForm.email} 
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    style={{ marginRight: "10px" }}
                  />
                  <button onClick={() => updateUser(user.id)}>✅ Save</button>
                  <button onClick={() => setEditingId(null)}>❌ Cancel</button>
                </div>
              ) : (
                <div style={{ flex: 1 }}>
                  <strong>{user.username}</strong> — {user.email}
                </div>
              )}
              <div>
                <button onClick={() => startEdit(user)} style={{ marginRight: "10px" }}>✏️ Edit</button>
                <button onClick={() => deleteUser(user.id)} style={{ color: "red" }}>🗑️ Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
