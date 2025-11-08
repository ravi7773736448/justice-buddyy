// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");


// Load environment variables
dotenv.config();

// Routes
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blogs");

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5000",
      "http://localhost:5173",
      "http://localhost:5174",
      "https://justice-buddyai.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic test route
app.get("/", (req, res) => res.send("Backend is live!"));

// Routes
app.use("/api/admin", authRoutes);
app.use("/api/blogs", blogRoutes);

// ----------------- CHAT ENDPOINT -----------------
app.post("/chat", async (req, res) => {
  const { message, language } = req.body;

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return res.status(400).json({ error: "Message is required" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res
      .status(500)
      .json({ error: "Google Gemini API key not configured in .env" });
  }

  const prompt = `You are "Justice Buddy", an AI legal assistant for Indian users.
Answer in ${language || "English"} clearly and practically. Do not replace a lawyer.
User question: ${message.trim()}`;

  try {
    console.log("🔄 Sending request to Gemini...");
    console.log("API key exists:", !!apiKey);

    const model = "gemini-2.0-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const text = await response.text();
    const contentType = response.headers.get("content-type") || "";

    console.log("🔍 Gemini raw response (first 200 chars):", text.slice(0, 200));

    if (!contentType.includes("application/json")) {
      console.error("❌ Gemini returned non-JSON.");
      return res.status(502).json({
        error: "Gemini returned invalid data. Check API key or endpoint URL.",
      });
    }

    const data = JSON.parse(text);

    if (data.error) {
      console.error("❌ Gemini API error:", data.error);
      return res.status(502).json({
        error: data.error.message || "Gemini API returned an error.",
      });
    }

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No reply received from Gemini.";

    console.log("✅ Gemini reply:", reply.slice(0, 100));
    res.json({ reply });
  } catch (error) {
    console.error("🔥 Error calling Gemini:", error);
    res
      .status(500)
      .json({ error: "Internal server error while contacting Gemini." });
  }
});

// ----------------- CONNECT MONGODB -----------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ----------------- START SERVER -----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
