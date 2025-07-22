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

  // Create departments with realistic data
  const departmentData = [
    {
      name: "Computer Science",
      description:
        "Our Computer Science department is at the forefront of technological innovation, offering cutting-edge programs in software engineering, artificial intelligence, and data science.",
      phone: "(555) 123-4567",
      email: "cs@university.edu",
      location: "Science Building, Room 301"
    },
    {
      name: "Mathematics",
      description:
        "The Mathematics Department provides a rigorous foundation in both pure and applied mathematics. Our faculty conduct research in areas ranging from abstract algebra to mathematical modeling.",
      phone: "(555) 123-4568",
      email: "math@university.edu",
      location: "Science Building, Room 205"
    },
    {
      name: "Physics",
      description:
        "Our Physics Department explores the fundamental laws of nature through cutting-edge research and innovative teaching methods. We offer programs in theoretical and experimental physics.",
      phone: "(555) 123-4569",
      email: "physics@university.edu",
      location: "Science Building, Room 401"
    },
    {
      name: "English Literature",
      description:
        "The English Literature Department fosters critical thinking and creative expression through the study of literature, language, and culture.",
      phone: "(555) 123-4570",
      email: "english@university.edu",
      location: "Humanities Building, Room 101"
    },
    {
      name: "Biology",
      description:
        "The Biology Department offers comprehensive programs in molecular biology, ecology, and biomedical sciences. Our research spans from cellular mechanisms to ecosystem dynamics.",
      phone: "(555) 123-4571",
      email: "biology@university.edu",
      location: "Science Building, Room 501"
    },
    {
      name: "Chemistry",
      description:
        "Our Chemistry Department combines theoretical knowledge with hands-on laboratory experience. We focus on organic chemistry, inorganic chemistry, and biochemistry.",
      phone: "(555) 123-4572",
      email: "chemistry@university.edu",
      location: "Science Building, Room 601"
    }
  ];

  for (const dept of departmentData) {
    const banner_image = faker.image.urlLoremFlickr({ category: "academia" });
    const { id } = await createDepartment(
      dept.name,
      dept.description,
      banner_image,
      dept.phone,
      dept.email,
      dept.location
    );
    departmentIds.push(id);
  }

  // Create faculty with realistic data
  const facultyData = [
    {
      name: "Dr. Sarah Johnson",
      title: "Associate Professor",
      email: "sarah.johnson@university.edu",
      bio: "Dr. Sarah Johnson is an Associate Professor in the Computer Science Department with over 10 years of experience in software engineering and artificial intelligence.",
      phone: "(555) 123-4567",
      office: "Science Building, Room 305",
      education: "Ph.D. Computer Science, Stanford University",
      publications: 50,
      awards: ["NSF Career Award", "Best Paper Award, ICML 2020"],
      research_areas: [
        "Machine Learning",
        "Artificial Intelligence",
        "Healthcare Technology",
        "Software Engineering"
      ]
    },
    {
      name: "Dr. Michael Chen",
      title: "Professor",
      email: "michael.chen@university.edu",
      bio: "Dr. Michael Chen is a Professor and the Director of the Computer Science Department. His research interests include distributed systems, cloud computing, and cybersecurity.",
      phone: "(555) 123-4568",
      office: "Science Building, Room 307",
      education: "Ph.D. Computer Science, MIT",
      publications: 75,
      awards: ["IEEE Fellow", "Distinguished Scientist Award"],
      research_areas: [
        "Distributed Systems",
        "Cloud Computing",
        "Cybersecurity",
        "Database Systems"
      ]
    },
    {
      name: "Dr. Emily Rodriguez",
      title: "Assistant Professor",
      email: "emily.rodriguez@university.edu",
      bio: "Dr. Emily Rodriguez specializes in applied mathematics and mathematical modeling. Her work focuses on developing mathematical models for complex biological systems.",
      phone: "(555) 123-4569",
      office: "Science Building, Room 207",
      education: "Ph.D. Applied Mathematics, UC Berkeley",
      publications: 25,
      awards: ["Young Investigator Award", "NSF Graduate Fellowship"],
      research_areas: [
        "Applied Mathematics",
        "Mathematical Modeling",
        "Biological Systems",
        "Environmental Science"
      ]
    },
    {
      name: "Dr. James Wilson",
      title: "Professor",
      email: "james.wilson@university.edu",
      bio: "Dr. James Wilson is a Professor of Physics specializing in quantum mechanics and particle physics. He has conducted research at CERN and published extensively.",
      phone: "(555) 123-4570",
      office: "Science Building, Room 403",
      education: "Ph.D. Physics, Caltech",
      publications: 60,
      awards: ["APS Fellow", "CERN Distinguished Researcher"],
      research_areas: [
        "Quantum Mechanics",
        "Particle Physics",
        "Theoretical Physics",
        "Quantum Computing"
      ]
    },
    {
      name: "Dr. Lisa Thompson",
      title: "Associate Professor",
      email: "lisa.thompson@university.edu",
      bio: "Dr. Lisa Thompson is an Associate Professor specializing in 19th-century British literature and feminist literary theory.",
      phone: "(555) 123-4571",
      office: "Humanities Building, Room 103",
      education: "Ph.D. English Literature, Yale University",
      publications: 35,
      awards: ["MLA Book Award", "Fulbright Scholar"],
      research_areas: [
        "19th-Century Literature",
        "Feminist Theory",
        "British Literature",
        "Literary Criticism"
      ]
    },
    {
      name: "Dr. David Kim",
      title: "Assistant Professor",
      email: "david.kim@university.edu",
      bio: "Dr. David Kim focuses on human-computer interaction and user experience design. His research explores how technology can be made more accessible.",
      phone: "(555) 123-4572",
      office: "Science Building, Room 309",
      education: "Ph.D. Human-Computer Interaction, Carnegie Mellon",
      publications: 20,
      awards: ["CHI Best Paper Award", "Google Faculty Research Award"],
      research_areas: [
        "Human-Computer Interaction",
        "User Experience Design",
        "Accessibility",
        "User Interface Design"
      ]
    },
    {
      name: "Dr. Maria Garcia",
      title: "Professor",
      email: "maria.garcia@university.edu",
      bio: "Dr. Maria Garcia is a Professor of Biology specializing in molecular biology and genetics. Her research focuses on understanding cellular mechanisms.",
      phone: "(555) 123-4573",
      office: "Science Building, Room 503",
      education: "Ph.D. Molecular Biology, Harvard University",
      publications: 80,
      awards: ["HHMI Investigator", "National Academy of Sciences Member"],
      research_areas: [
        "Molecular Biology",
        "Genetics",
        "Cell Biology",
        "Disease Mechanisms"
      ]
    },
    {
      name: "Dr. Robert Brown",
      title: "Associate Professor",
      email: "robert.brown@university.edu",
      bio: "Dr. Robert Brown specializes in organic chemistry and drug discovery. His research focuses on developing new synthetic methods and discovering novel therapeutic compounds.",
      phone: "(555) 123-4574",
      office: "Science Building, Room 603",
      education: "Ph.D. Chemistry, UC San Diego",
      publications: 45,
      awards: ["ACS Young Investigator Award", "NIH R01 Grant"],
      research_areas: [
        "Organic Chemistry",
        "Drug Discovery",
        "Synthetic Methods",
        "Medicinal Chemistry"
      ]
    }
  ];

  for (const faculty of facultyData) {
    const profile_image = faker.image.personPortrait();
    const { id } = await createFaculty(
      faculty.name,
      faculty.email,
      faculty.bio,
      profile_image,
      faculty.title,
      faculty.phone,
      faculty.office,
      faculty.education,
      faculty.publications,
      faculty.awards,
      faculty.research_areas
    );
    facultyIds.push(id);
  }

  // Create faculty-department relationships
  const facultyDepartmentPairs = [
    { facultyIndex: 0, departmentIndex: 0 }, // Dr. Sarah Johnson - Computer Science
    { facultyIndex: 1, departmentIndex: 0 }, // Dr. Michael Chen - Computer Science
    { facultyIndex: 2, departmentIndex: 1 }, // Dr. Emily Rodriguez - Mathematics
    { facultyIndex: 3, departmentIndex: 2 }, // Dr. James Wilson - Physics
    { facultyIndex: 4, departmentIndex: 3 }, // Dr. Lisa Thompson - English Literature
    { facultyIndex: 5, departmentIndex: 0 }, // Dr. David Kim - Computer Science
    { facultyIndex: 6, departmentIndex: 4 }, // Dr. Maria Garcia - Biology
    { facultyIndex: 7, departmentIndex: 5 } // Dr. Robert Brown - Chemistry
  ];

  for (const pair of facultyDepartmentPairs) {
    const facultyId = facultyIds[pair.facultyIndex];
    const departmentId = departmentIds[pair.departmentIndex];
    await createFacultyDepartment(facultyId, departmentId);
  }
}
