const mongoose = require("mongoose");
// const dotenv = require("dotenv");
const Job = require("./models/Job"); // Adjust path if needed
const User = require("./models/User"); // Adjust path if needed

// dotenv.config();

// MOCK JOBS
const jobs = [
  {
    title: "Senior React Developer",
    company: "TechFlow Systems",
    location: "San Francisco, CA",
    type: "full-time",
    salaryRange: "$120k - $160k",
    description: "We are looking for an experienced React developer.",
    requirements: ["React", "Redux", "Tailwind"],
  },
  {
    title: "Backend Engineer",
    company: "CloudScale Inc.",
    location: "Remote",
    type: "remote",
    salaryRange: "$100k - $140k",
    description: "Build high-performance APIs with Node.js.",
    requirements: ["Node.js", "MongoDB", "AWS"],
  },
  {
    title: "UI/UX Intern",
    company: "Creative Studio",
    location: "New York, NY",
    type: "internship",
    salaryRange: "$30/hr",
    description: "Design mobile interfaces.",
    requirements: ["Figma", "HTML/CSS"],
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ai_interviewer"
    );
    console.log("🔥 Connected to DB...");

    // 1. Find the first user in your DB to assign these jobs to
    // (Ideally, this should be an HR user, but any user works for testing)
    const user = await User.findOne();

    if (!user) {
      console.log("❌ No users found! Register a user first.");
      process.exit();
    }

    // 2. Clear existing jobs (Optional)
    await Job.deleteMany();
    console.log("🧹 Cleared old jobs...");

    // 3. Add 'createdBy' to all mock jobs
    const jobsWithUser = jobs.map((job) => ({
      ...job,
      createdBy: user._id,
    }));

    // 4. Insert Jobs
    await Job.insertMany(jobsWithUser);
    console.log("✅ Jobs Imported Successfully!");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
