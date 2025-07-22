import "dotenv/config";
import pg from "pg";
console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("Type:", typeof process.env.DATABASE_URL);
const db = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

// Connect to database
db.connect()
  .then(() => console.log("✅ Connected to PostgreSQL database"))
  .catch((err) => console.error("❌ Database connection error:", err));

export default db;
