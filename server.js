import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT ?? 3002;

app.listen(PORT, () => {
  console.log(`🚀 University Backend API running on port ${PORT}...`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🎓 Departments: http://localhost:${PORT}/api/departments`);
  console.log(`👨‍🏫 Faculty: http://localhost:${PORT}/api/faculty`);
});
