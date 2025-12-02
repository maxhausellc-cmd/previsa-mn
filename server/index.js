import express from "express";
import cors from "cors";

const app = express();

// CORS тохиргоо
app.use(cors({
  origin: ["http://localhost:5173", "https://previsa-mn-frontend.vercel.app"],
  methods: ["GET","POST","PUT","DELETE"]
}));

app.use(express.json()); // POST body-г parse хийх

// Simple in-memory users (жишээ)
let users = [];

// Register
app.post("/api/auth/register", (req, res) => {
  const { email, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }
  users.push({ email, password });
  res.json({ message: "User registered successfully" });
});

// Login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  res.json({ message: "Login successful", user: { email } });
});

app.listen(3001, () => console.log("Server running on port 3001"));