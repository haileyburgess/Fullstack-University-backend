import express from "express";
const router = express.Router();
export default router;
import requireUser from "../middleware/requireUser.js";
import requireBody from "../middleware/requireBody.js";

import {
  getFaculty,
  getFacultyById,
  getFacultyByDepartmentId,
  createFaculty,
  // updateFaculty,
} from "../db/queries/faculty.js";

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

// add faculty
router
  .route("/:id/")
  .post(
    requireUser,
    requireBody(["name", "email", "bio", "profile_image"]),
    async (req, res) => {
      try {
        const { name, email, bio, profile_image } = req.body;
        const faculty = await createFaculty(name, email, bio, profile_image);
        res.status(201).json(faculty);
      } catch (error) {
        console.error("Error adding faculty", error);
        res.status(500).json({ error: "Server error" });
      }
    }
  );

// remove faculty
router.route("/:id").delete(requireUser, async (req, res) => {
  const { id } = req.params;

  try {
    const query = "DELETE FROM faculty WHERE id = $1 RETURNING *";
    const result = await db.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Faculty not found" });
    }

    res.json({
      message: "Faculty deleted successfully",
      department: result.rows[0],
    });
  } catch (error) {
    console.error("Error deleting faculty:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// update faculty

// router
//   .route("/:id")
//   .put(
//     requireUser,
//     requireBody(["name", "email", "bio", "profile_image"]),
//     async (req, res) => {
//       try {
//         const facultyId = req.params.id;
//         const { name, email, bio, profile_image } = req.body;

//         const existingFaculty = await getFacultyById(facultyId);
//         if (!existingFaculty) {
//           return res.status(404).json({ error: "Faculty not found" });
//         }

//         if (
//           req.user.role !== "admin" &&
//           req.user.id !== existingFaculty.userId
//         ) {
//           return res
//             .status(403)
//             .json({ error: "Forbidden: Cannot update this faculty" });
//         }

//         const updatedFaculty = await updateFaculty(facultyId, {
//           name,
//           email,
//           bio,
//           profile_image,
//         });
//         res.status(200).json(updatedFaculty);
//       } catch (error) {
//         console.error("Error updating faculty:", error);
//         res.status(500).json({ error: "Server error" });
//       }
//     }
//   );
