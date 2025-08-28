const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Simple API route
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from Backend (Docker + Node.js) 🚀" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
