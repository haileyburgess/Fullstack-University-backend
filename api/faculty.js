import express from "express";
const router = express.Router();
export default router;

import {
  getFaculty,
  getFacultyById,
  getFacultyByDepartmentId,
} from "../db/queries/faculty.js";
import requireUser from "../middleware/requireUser.js";

router.route("/").get(async (req, res) => {
  const faculty = await getFaculty();
  res.send(faculty);

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

  router.route("/:id").get(async (req, res) => {
    res.send(req.faculty);
  });
});
