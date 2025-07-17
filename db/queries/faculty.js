import db from "../client.js";

export async function createFaculty(
  name,
  email,
  bio,
  profile_image,
  department_id
) {
  const sql = `
    INSERT INTO faculty
    (name, email, bio, profile_image, department_id)
    VALUES
    ($1, $2, $3, $4, $5)
    RETURNING *
    `;
  const {
    rows: [faculty],
  } = await db.query(sql, [name, email, bio, profile_image, department_id]);
  return faculty;
}

export async function getFaculty() {
  const sql = `
    SELECT *
    FROM faculty
    `;
  const { rows: faculty } = await db.query(sql);
  return faculty;
}

export async function getFacultyById(id) {
  const sql = `
    SELECT * 
    FROM faculty
    WHERE id = $1
    `;
  const {
    rows: [faculty],
  } = await db.query(sql, [id]);
  return faculty;
}

export async function getFacultyByDepartmentId(id) {
  const sql = `
    SELECT faculty.*
    FROM
    faculty
    JOIN faculty_departments ON faculty_departments.faculty_id = products.id
    WHERE faculty_departments.department_id = $1
    `;
  const { rows: faculty } = await db.query(sql, [id]);
  return faculty;
}
