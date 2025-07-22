import express from "express";
const router = express.Router();
export default router;

import { createUser } from "../db/queries/users.js";
import { getUserByUsernameAndPassword } from "../db/queries/users.js";
import { createToken } from "../utils/jwt.js";
import requireBody from "../middleware/requireBody.js";

router
  .route("/register")
  .post(requireBody(["username", "email", "password"]), async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await createUser(username, email, password);
      const token = createToken({ id: user.id });
      res
        .status(201)
        .json({
          token,
          user: { id: user.id, username: user.username, email: user.email }
        });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(400).json({ error: "Registration failed" });
    }
  });

router
  .route("/login")
  .post(requireBody(["username", "password"]), async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await getUserByUsernameAndPassword(username, password);
      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
      const token = createToken({ id: user.id });
      res.json({ token, user: { id: user.id, username: user.username } });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });
