import db from "../client.js";

export async function createFacultyDepartment(facultyId, departmentId) {
  const sql = `
    INSERT INTO faculty_departments
    (faculty_id, department_id)
    VALUES ($1, $2)
    RETURNING *
    `;
  const {
    rows: [facultyDepartment],
  } = await db.query(sql, [facultyId, departmentId]);
  return facultyDepartment;
}
