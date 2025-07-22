import express from "express";
import cors from "cors";
import departmentsRouter from "./api/departments.js";
import facultyRouter from "./api/faculty.js";
import usersRouter from "./api/users.js";

const app = express();

// CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3004",
      "http://localhost:5173"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
  })
);

app.use(express.json());

// API routes with /api prefix
app.use("/api/departments", departmentsRouter);
app.use("/api/faculty", facultyRouter);
app.use("/api/users", usersRouter);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "University Backend API is running",
    timestamp: new Date().toISOString(),
    endpoints: {
      departments: "/api/departments",
      faculty: "/api/faculty",
      health: "/api/health"
    }
  });
});

app.get("/", (req, res) => {
  res.send("University Backend API - Use /api/health for status check");
});

export default app;
