import db from "../client.js";

export async function createDepartment(name, description, banner_image) {
  const sql = `
    INSERT INTO departments
    (name, description, banner_image)
    VALUES
    ($1, $2, $3)
    RETURNING id
    `;
  const {
    rows: [department],
  } = await db.query(sql, [name, description, banner_image]);
  return department;
}

export async function getDepartments() {
  const sql = `
    SELECT *
    FROM departments
    `;
  const { rows: department } = await db.query(sql);
  return department;
}
export async function getDepartmentById(id) {
  const sql = `
    SELECT *
    FROM departments
    WHERE id = $1
    `;

  const {
    rows: [department],
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

export async function deleteDepartment(departmentId) {
  const sql = `
  SELECT departments.*
  FROM departments
  WHERE department_id = $1
  `;
  const {rows: departments} = await db.query(sql, [departmentId]);
  return departments;
}