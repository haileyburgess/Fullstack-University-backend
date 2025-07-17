import express from "express";
import getUserFromToken from "./middleware/getUserFromToken";
import requireUser from "./middleware/requireUser";
import requireBody from "./middleware/requireBody";
import { createUser, getUserByUsernameAndPassword } from "#db/queries/users";
import { signToken } from "./utils/jwt";

const app = express();

app.use(express.json());
app.use(getUserFromToken);