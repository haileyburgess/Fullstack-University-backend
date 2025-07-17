import express from "express";
const router = express.Router();
export default router;

import {
  getFaculty,
  getFacultyById,
  getFacultyByDepartmentId,
} from "../db/queries/faculty";
import requireUser from "../middleware/requireUser";

router.route("/").get(async (req, res) => {
  const faculty = await getFaculty();
  res.send(faculty);
});

router.route("/").get(async (req, res) => {
  const { id } = req.params;
  const faculty = await getFacultyById(id);
  res.send(faculty);
});
