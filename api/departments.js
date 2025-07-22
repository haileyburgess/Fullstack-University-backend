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
  getDepartmentByFacultyId,
} from "../db/queries/departments.js";
import db from "../db/client.js";

// get all departments

router.route("/").get(async (req, res) => {
  try {
    const departments = await getDepartments();
    res.json(departments);
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
  res.send(req.department);
});

// add new department

router
  .route("/:id/departments")
  .post(
    requireUser,
    requireBody(["name", "description", "banner_image"]),
    async (req, res) => {
      try {
        const { id } = req.params;
        const { name, description, banner_image } = req.body;
        const department = await createDepartment(
          name,
          description,
          banner_image,
          id
        );
        res.status(201).json(department);
      } catch (error) {
        console.error("Error adding department", error);
        res.status(500).json({ error: "Server error" });
      }
    }
  );

// remove department

router.route("/:id/departments").delete(async (req, res) => {
  const { id } = req.params;

  try {
    const query = "DELETE FROM departments WHERE id = $1 RETURNING *";
    const result = await db.query(query, [id]);

    if (result.rows.length === 0) {
      // ← Fixed: rows not row
      return res.status(404).json({ error: "Department not found" });
    }

    res.json({
      message: "Department deleted successfully",
      department: result.rows[0],
    });
  } catch (error) {
    console.error("Error deleting department:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// update department

router
  .route("/:id")
  .put(
    requireUser,
    requireBody(["name", "description", "banner_image"]),
    async (req, res) => {
      try {
        const departmentId = req.params.id;
        const { name, description, banner_image } = req.body;

        const existingDepartment = await getDepartmentById(departmentId);
        if (!existingDepartment) {
          return res.status(404).json({ error: "Department not found" });
        }

        if (
          req.user.role !== "admin" &&
          req.user.id !== existingDepartment.userId
        ) {
          return res
            .status(403)
            .json({ error: "Forbidden: Cannot update this department" });
        }

        const updatedDepartment = await updateDepartment(departmentId, {
          name,
          description,
          banner_image,
        });
        res.status(200).json(updatedDepartment);
      } catch (error) {
        console.error("Error updating department:", error);
        res.status(500).json({ error: "Server error" });
      }
    }
  );
