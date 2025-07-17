import db from "./client.js";
import { faker } from "@faker-js/faker";
import { createDepartment } from "./queries/departments.js";
import { createFaculty } from "./queries/faculty.js";
import { createUser } from "./queries/users.js";

import { createFacultyDepartment } from "./queries/faculty_departments.js";

await db.connect();
await seed();
await db.end();
console.log("Database seeded");

async function seed() {
  const departmentIds = [];
  const facultyIds = [];

  // Create 10 fake departments
  for (let i = 0; i < 10; i++) {
    const name = faker.commerce.department();
    const description = faker.lorem.sentence();
    const banner_image = faker.image.urlLoremFlickr({ category: "academia" });
    const { id } = await createDepartment(name, description, banner_image);
    departmentIds.push(id);
  }

  // Create 20 fake professors
  for (let i = 0; i < 20; i++) {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const bio = faker.person.bio();
    const profile_image = faker.image.personPortrait();
    const department_id =
      departmentIds[Math.floor(Math.random() * departmentIds.length)];
    const { id } = await createFaculty(
      name,
      email,
      bio,
      profile_image,
      department_id
    );
    facultyIds.push(id);
  }

  // Create 15+ faculty_departments (random unique pairs)
  const usedPairs = new Set();
  while (usedPairs.size < 15) {
    const facultyId = faker.helpers.arrayElement(facultyIds);
    const departmentId = faker.helpers.arrayElement(departmentIds);
    const key = `${facultyId}-${departmentId}`;
    if (!usedPairs.has(key)) {
      await createFacultyDepartment(facultyId, departmentId);
      usedPairs.add(key);
    }
  }
}
