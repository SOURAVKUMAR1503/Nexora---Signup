const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const users = [
  { name: "Demo User", email: "demo@nexora.com", password: "123456" }
];

app.get("/", (req, res) => {
  res.json({ message: "Nexora backend is running" });
});

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  const existingUser = users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );

  if (existingUser) {
    return res.status(409).json({ success: false, message: "An account with this email already exists." });
  }

  users.push({ name, email, password });

  res.status(201).json({ success: true, message: "Account created successfully." });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password
  );

  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid email or password." });
  }

  res.json({
    success: true,
    message: "Login successful.",
    user: { name: user.name, email: user.email }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});