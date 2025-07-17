import express from "express";
import getUserFromToken from "./middleware/getUserFromToken.js";
import requireBody from "./middleware/requireBody.js";
import { createUser, getUserByUsernameAndPassword } from "#db/queries/users";
import { signToken } from "./utils/jwt.js";

const app = express();

app.use(express.json());
app.use(getUserFromToken);

app.post(
  "/users/register",
  requireBody(["username", "password"]),
  async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await createUser(username, password);
      const token = signToken({ id: user.id });
      res.status(201).send(token);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).send("Internal server error");
    }
  }
);

app.post(
  "/users/login",
  requireBody(["username", "password"]),
  async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await getUserByUsernameAndPassword(username, password);
      if (!user) {
        return res.status(401).send("Invalid credentials");
      }
      const token = signToken({ id: user.id });
      res.send(token);
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).send("Internal server error");
    }
  }
);

// app.use("/faculty", facultyRouter);
// app.use("/departments", departmentsRouter);

export default app;
