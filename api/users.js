import express from "express";
const router = express.Router();
export default router;

import { createUser } from "../db/queries/users";
import { getUserByUsernameAndPassword } from "../db/queries/users";
import { createToken } from "../utils/jwt";

router
  .route("/register")
  .post(requireBody(["username", "password"]), async (req, res) => {
    const { username, password } = req.body;
    const user = await createUser(username, password);
    if (!username) {
      return res.status(400).send("User not found");
    }
    if (!password) {
      return res.status(400).send("Password not found");
    }
    res.status(201).send(token);
  });

router
  .route("/login")
  .post(requireBody(["username", "password"]), async (req, res) => {
    const { username, password } = req.body;
    const user = await getUserByUsernameAndPassword(username, password);
    if (!user) return res.status(401).send("Invalid username or password");
    if (!username) {
      return res.status(400).send("User not found");
    }
    if (!password) {
      return res.status(400).send("Password not found");
    }
    const token = createToken({ id: user.id });
    res.send(token);
  });
