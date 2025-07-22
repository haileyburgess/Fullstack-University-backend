import express from "express";
const router = express.Router();
export default router;

import { getFacultyById } from "../db/queries/faculty.js";
import { getFacultyByDepartmentId } from "../db/queries/faculty.js";
import { createFacultyDepartment } from "../db/queries/faculty_departments.js";
import requireBody from "../middleware/requireBody.js";
import requireUser from "../middleware/requireUser.js";
import {
  createDepartment,
  getDepartments,
  getDepartmentById,
  getDepartmentByFacultyId
} from "../db/queries/departments.js";

// get all departments

router.route("/").get(async (req, res) => {
  try {
    const departments = await getDepartments();
    // Transform the data to match frontend expectations
    const transformedDepartments = departments.map((dept) => ({
      id: dept.id,
      name: dept.name,
      description: dept.description,
      phone: dept.phone,
      email: dept.email,
      location: dept.location,
      facultyCount: parseInt(dept.faculty_count) || 0
    }));
    res.json(transformedDepartments);
  } catch (error) {
    console.error("Error getting departments:", error);
    res.status(500).send("Internal server error");
  }
});

// get 1 department

router.param("id", async (req, res, next, id) => {
  try {
    const department = await getDepartmentById(parseInt(id));
    if (!department) return res.status(404).send("Department not found.");
    req.department = department;
    next();
  } catch (error) {
    console.error("Error in dept param middleware:", error);
    res.status(500).send("Internal server error");
  }
});

router.route("/:id").get(async (req, res) => {
  // Transform the data to match frontend expectations
  const transformedDepartment = {
    id: req.department.id,
    name: req.department.name,
    description: req.department.description,
    phone: req.department.phone,
    email: req.department.email,
    location: req.department.location,
    facultyCount: parseInt(req.department.faculty_count) || 0
  };
  res.json(transformedDepartment);
});
