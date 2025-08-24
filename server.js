// server.js
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Bật CORS cho mọi client
app.use(cors());

// API gốc cần proxy
const TARGET_API = "https://api-hitclub-aipro-vannhat.onrender.com/api/taixiumd5";

// Proxy endpoint
app.get("/api/taixiumd5", async (req, res) => {
  try {
    // Fetch từ API gốc
    const response = await fetch(TARGET_API);
    const data = await response.json();

    // Trả về cho client
    res.json(data);
  } catch (err) {
    console.error("Lỗi khi gọi API:", err);
    res.status(500).json({ error: "Lỗi khi gọi API gốc" });
  }
});

// Chạy server
app.listen(PORT, () => {
  console.log(`✅ Proxy server chạy tại http://localhost:${PORT}`);
});
