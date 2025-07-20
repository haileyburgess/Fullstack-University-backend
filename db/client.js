import "dotenv/config";
import pg from "pg";
console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("Type:", typeof process.env.DATABASE_URL);
const db = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});
export default db;
