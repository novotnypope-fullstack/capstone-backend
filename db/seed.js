import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const seedDatabase = async () => {
  try {
    console.log("Seeding database...");

    // Insert departments
    const departmentsQuery = `
      INSERT INTO departments (name, description, contact_email, contact_phone, banner_image_url)
      VALUES
        ('Computer Science', 'Our Computer Science department offers cutting-edge programs in software development, artificial intelligence, and data science. We prepare students for the rapidly evolving tech industry with hands-on projects and industry partnerships.', 'cs@fsu.edu', '(555) 123-4567', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=400&fit=crop'),
        ('Business Administration', 'The Business Administration department provides comprehensive education in management, finance, marketing, and entrepreneurship. Our graduates become leaders in the global business community.', 'business@fsu.edu', '(555) 234-5678', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=400&fit=crop'),
        ('Fine Arts', 'Explore your creativity in our Fine Arts department. We offer programs in painting, sculpture, digital media, and performance art, fostering artistic expression and technical excellence.', 'arts@fsu.edu', '(555) 345-6789', 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&h=400&fit=crop'),
        ('Biology', 'The Biology department combines classroom learning with cutting-edge research in genetics, ecology, and molecular biology. Our state-of-the-art labs provide students with hands-on research experience.', 'biology@fsu.edu', '(555) 456-7890', 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&h=400&fit=crop'),
        ('History', 'Study the past to understand the present. Our History department offers courses spanning ancient civilizations to modern global events, developing critical thinking and analytical skills.', 'history@fsu.edu', '(555) 567-8901', 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=1200&h=400&fit=crop')
      RETURNING id, name;
    `;

    const deptResult = await pool.query(departmentsQuery);
    const depts = deptResult.rows;
    console.log(`Created ${depts.length} departments`);

    // Map department names to IDs
    const deptId = {};
    for (const d of depts) deptId[d.name] = d.id;

    // Insert faculty
    const facultyQuery = `
      INSERT INTO faculty (name, bio, email, profile_image_url, department_id)
      VALUES
        ('Dr. Sarah Johnson', 'Dr. Johnson specializes in artificial intelligence and machine learning. She has published over 50 papers and leads several research projects in natural language processing.', 'sjohnson@fsu.edu', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=250&h=250&fit=crop', $1),
        ('Prof. Michael Chen', 'Professor Chen is an expert in cybersecurity and network systems. He has 15 years of industry experience and brings real-world insights to the classroom.', 'mchen@fsu.edu', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250&h=250&fit=crop', $1),
        ('Dr. Emily Rodriguez', 'Dr. Rodriguez focuses on international business and global markets. She has consulted for Fortune 500 companies and teaches strategic management.', 'erodriguez@fsu.edu', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=250&h=250&fit=crop', $2),
        ('Prof. David Thompson', 'Professor Thompson specializes in finance and investment strategies. He is a CFA charterholder with extensive Wall Street experience.', 'dthompson@fsu.edu', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=250&h=250&fit=crop', $2),
        ('Dr. Maria Garcia', 'Dr. Garcia is an accomplished painter and sculptor. Her work has been exhibited internationally, and she mentors students in contemporary art practices.', 'mgarcia@fsu.edu', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=250&h=250&fit=crop', $3),
        ('Prof. James Wilson', 'Professor Wilson specializes in digital media and interactive installations. He bridges traditional art forms with modern technology.', 'jwilson@fsu.edu', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=250&h=250&fit=crop', $3),
        ('Dr. Lisa Anderson', 'Dr. Anderson leads research in molecular genetics and evolutionary biology. Her lab has made groundbreaking discoveries in gene expression.', 'landerson@fsu.edu', 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=250&h=250&fit=crop', $4),
        ('Prof. Robert Martinez', 'Professor Martinez is an ecologist studying climate change impacts on biodiversity. He conducts field research in tropical ecosystems.', 'rmartinez@fsu.edu', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=250&h=250&fit=crop', $4),
        ('Dr. Jennifer Lee', 'Dr. Lee specializes in American history and social movements. She has authored three books on civil rights and political activism.', 'jlee@fsu.edu', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250&h=250&fit=crop', $5),
        ('Prof. Thomas Brown', 'Professor Brown is a historian of ancient civilizations, with expertise in Roman and Greek history. He leads archaeological expeditions.', 'tbrown@fsu.edu', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=250&h=250&fit=crop', $5)
      RETURNING id, name;
    `;

    const facultyResult = await pool.query(facultyQuery, [
      deptId["Computer Science"],
      deptId["Business Administration"],
      deptId["Fine Arts"],
      deptId["Biology"],
      deptId["History"],
    ]);
    console.log(`Created ${facultyResult.rows.length} faculty members`);

    console.log("Database seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
