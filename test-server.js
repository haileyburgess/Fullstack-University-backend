import "dotenv/config";
import express from "express";

const app = express();
const PORT = 3002;

app.use(express.json());

// Simple test endpoint
app.get("/api/test", (req, res) => {
  res.json({
    message: "Server is working!",
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Test server is running" });
});

app.listen(PORT, () => {
  console.log(`🚀 Test Server running on port ${PORT}...`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/test`);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});
