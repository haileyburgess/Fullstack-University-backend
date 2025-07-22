import db from "../client.js";

export async function createFaculty(
  name,
  email,
  bio,
  profile_image,
  title = null,
  phone = null,
  office = null,
  education = null,
  publications = 0,
  awards = [],
  research_areas = []
) {
  const sql = `
    INSERT INTO faculty
    (name, email, bio, profile_image, title, phone, office, education, publications, awards, research_areas)
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *
    `;
  const {
    rows: [faculty]
  } = await db.query(sql, [
    name,
    email,
    bio,
    profile_image,
    title,
    phone,
    office,
    education,
    publications,
    awards,
    research_areas
  ]);
  return faculty;
}

export async function getFaculty() {
  const sql = `
    SELECT 
      f.*,
      d.name as department_name,
      d.id as department_id
    FROM faculty f
    LEFT JOIN faculty_departments fd ON f.id = fd.faculty_id
    LEFT JOIN departments d ON fd.department_id = d.id
    ORDER BY f.name
    `;
  const { rows: faculty } = await db.query(sql);
  return faculty;
}

export async function getFacultyById(id) {
  const sql = `
    SELECT 
      f.*,
      d.name as department_name,
      d.id as department_id
    FROM faculty f
    LEFT JOIN faculty_departments fd ON f.id = fd.faculty_id
    LEFT JOIN departments d ON fd.department_id = d.id
    WHERE f.id = $1
    `;
  const {
    rows: [faculty]
  } = await db.query(sql, [id]);
  return faculty;
}

export async function getFacultyByDepartmentId(id) {
  const sql = `
    SELECT f.*
    FROM faculty f
    JOIN faculty_departments fd ON fd.faculty_id = f.id
    WHERE fd.department_id = $1
    ORDER BY f.name
    `;
  const { rows: faculty } = await db.query(sql, [id]);
  return faculty;
}
