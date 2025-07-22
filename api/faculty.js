import express from "express";
const router = express.Router();
export default router;

import {
  getFaculty,
  getFacultyById,
  getFacultyByDepartmentId
} from "../db/queries/faculty.js";
import requireUser from "../middleware/requireUser.js";

// Get all faculty
router.route("/").get(async (req, res) => {
  try {
    const faculty = await getFaculty();
    // Transform the data to match frontend expectations
    const transformedFaculty = faculty.map((member) => ({
      id: member.id,
      name: member.name,
      title: member.title,
      email: member.email,
      bio: member.bio,
      phone: member.phone,
      office: member.office,
      education: member.education,
      publications: member.publications || 0,
      awards: member.awards || [],
      researchAreas: member.research_areas || [],
      department: member.department_name || "Unknown Department",
      departmentId: member.department_id || null
    }));
    res.json(transformedFaculty);
  } catch (error) {
    console.error("Error getting faculty:", error);
    res.status(500).send("Internal server error");
  }
});

// Get faculty by department ID
router.route("/department/:departmentId").get(async (req, res) => {
  try {
    const departmentId = parseInt(req.params.departmentId);
    const faculty = await getFacultyByDepartmentId(departmentId);
    res.json(faculty);
  } catch (error) {
    console.error("Error getting faculty by department:", error);
    res.status(500).send("Internal server error");
  }
});

// Param middleware for faculty ID
router.param("id", async (req, res, next, id) => {
  try {
    const faculty = await getFacultyById(parseInt(id));
    if (!faculty) return res.status(404).send("Faculty member not found.");
    req.faculty = faculty;
    next();
  } catch (error) {
    console.error("Error in faculty param middleware:", error);
    res.status(500).send("Internal server error");
  }
});

// Get faculty by ID
router.route("/:id").get(async (req, res) => {
  // Transform the data to match frontend expectations
  const transformedFaculty = {
    id: req.faculty.id,
    name: req.faculty.name,
    title: req.faculty.title,
    email: req.faculty.email,
    bio: req.faculty.bio,
    phone: req.faculty.phone,
    office: req.faculty.office,
    education: req.faculty.education,
    publications: req.faculty.publications || 0,
    awards: req.faculty.awards || [],
    researchAreas: req.faculty.research_areas || [],
    department: req.faculty.department_name || "Unknown Department",
    departmentId: req.faculty.department_id || null
  };
  res.json(transformedFaculty);
});
