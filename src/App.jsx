import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./Register"; // Create this file next
import Dashboard from "./Dashboard"; // Create this file to see your CRUD in action
import Login from "./Login";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect home to login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* CRUD / Dashboard Route */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
