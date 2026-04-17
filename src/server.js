const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());

// 🔌 MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // ⚠️ Double check if you have a password
  database: "hubert" 
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to MySQL ✅");
  }
});

// --- 📝 AUTH ROUTES ---

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(sql, [username, email, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "User registered successfully" });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error during registration" });
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) return res.status(400).json({ message: "User not found" });

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });

    res.json({ message: "Login successful", user: { id: user.id, username: user.username, email: user.email } });
  });
});

// --- 🟢 CRUD ROUTES ---

// READ all users
app.get("/users", (req, res) => {
  const sql = "SELECT id, username, email FROM users";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// UPDATE user
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;
  const sql = "UPDATE users SET username = ?, email = ? WHERE id = ?";
  db.query(sql, [username, email, id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User updated successfully" });
  });
});

// DELETE user
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User deleted" });
  });
});

// 🚀 START SERVER (Keep this at the bottom)
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});
