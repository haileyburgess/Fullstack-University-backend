import express from "express";
const router = express.Router();
export default router;

import { getFacultyById } from "../db/queries/faculty";
import { getFacultyByDepartmentId } from "../db/queries/faculty";
import { createFacultyDepartment } from "../db/queries/faculty_departments";
import requireBody from "../middleware/requireBody";
import requireUser from "../middleware/requireUser";
import {
  createDepartment,
  getDepartments,
  getDepartmentById,
  getDepartmentByFacultyId,
} from "../db/queries/departments";

router.use(requireUser);

// get all departments

router.route("/").get(async (req, res) => {
  const departments = await getDepartments();
  res.send(departments);
});

// get 1 department

router.route("/:id").get(async (req, res) => {
  const { id } = req.params;
  const department = await getDepartmentById(id);
  res.send(department);
});
