import db from "../client.js";

export async function createDepartment(
  name,
  description,
  banner_image,
  phone = null,
  email = null,
  location = null
) {
  const sql = `
    INSERT INTO departments
    (name, description, banner_image, phone, email, location)
    VALUES
    ($1, $2, $3, $4, $5, $6)
    RETURNING id
    `;
  const {
    rows: [department]
  } = await db.query(sql, [
    name,
    description,
    banner_image,
    phone,
    email,
    location
  ]);
  return department;
}

export async function getDepartments() {
  const sql = `
    SELECT 
      d.*,
      COUNT(fd.faculty_id) as faculty_count
    FROM departments d
    LEFT JOIN faculty_departments fd ON d.id = fd.department_id
    GROUP BY d.id, d.name, d.description, d.banner_image
    ORDER BY d.name
    `;

  const { rows: departments } = await db.query(sql);
  return departments;
}
export async function getDepartmentById(id) {
  const sql = `
    SELECT 
      d.*,
      COUNT(fd.faculty_id) as faculty_count
    FROM departments d
    LEFT JOIN faculty_departments fd ON d.id = fd.department_id
    WHERE d.id = $1
    GROUP BY d.id, d.name, d.description, d.banner_image
    `;

  const {
    rows: [department]
  } = await db.query(sql, [id]);
  return department;
}

export async function getDepartmentByFacultyId(facultyId) {
  const sql = `
    SELECT departments.*
    FROM departments
    JOIN faculty_departments ON departments.id = faculty_departments.department_id
    WHERE faculty_id = $1
    `;
  const { rows: departments } = await db.query(sql, [facultyId]);
  return departments;
}
