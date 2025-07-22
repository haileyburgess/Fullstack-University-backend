import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT ?? 3002;

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

app.listen(PORT, () => {
  console.log(`🚀 University Backend API running on port ${PORT}...`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🎓 Departments: http://localhost:${PORT}/api/departments`);
  console.log(`👨‍🏫 Faculty: http://localhost:${PORT}/api/faculty`);
});
