const mongoose = require("mongoose");
// const dotenv = require("dotenv");
const User = require("./models/User"); 
const Job = require("./models/Job");
const Application = require("./models/Application");

// dotenv.config();

const seedApplications = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ai_interviewer");
    console.log("🔥 Connected to DB...");

    // 1. GET THE CANDIDATE (YOU)
    // Replace this with the email you use to login!
    const myEmail = "abubakrog@gmail.com"; 
    
    const candidate = await User.findOne({ email: myEmail });
    if (!candidate) {
      console.log(`❌ User with email ${myEmail} not found. Check the email.`);
      process.exit();
    }
    console.log(`✅ Found Candidate: ${candidate.name}`);

    // 2. GET EXISTING JOBS
    const jobs = await Job.find();
    if (jobs.length < 2) {
      console.log("❌ Not enough jobs found. Run the jobs seeder first.");
      process.exit();
    }

    // 3. CLEAR OLD APPLICATIONS (Optional - keeps it clean)
    await Application.deleteMany({ candidate: candidate._id });
    console.log("dt Cleared old applications...");

    // 4. CREATE MOCK APPLICATIONS
    // We link them to the actual jobs we found in step 2
    const mockApplications = [
      {
        candidate: candidate._id,
        job: jobs[0]._id, // First job in DB
        hr: jobs[0].createdBy, // The HR who owns that job
        status: "interview",
        resumeUrl: "https://drive.google.com/file/d/1Yp1sIgEJhmpaavmad9joetOyXEZ-GbY4/view?usp=drive_link",
        appliedDate: new Date(),
        rating: 8,
      },
      {
        candidate: candidate._id,
        job: jobs[1]._id, // Second job in DB
        hr: jobs[1].createdBy,
        status: "reviewed",
        resumeUrl: "https://drive.google.com/file/d/1Yp1sIgEJhmpaavmad9joetOyXEZ-GbY4/view?usp=drive_link",
        appliedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      },
      {
        // If you have a 3rd job, use it, otherwise reuse job 0
        candidate: candidate._id,
        job: jobs[2] ? jobs[2]._id : jobs[0]._id, 
        hr: jobs[2] ? jobs[2].createdBy : jobs[0].createdBy,
        status: "rejected",
        resumeUrl: "https://drive.google.com/file/d/1Yp1sIgEJhmpaavmad9joetOyXEZ-GbY4/view?usp=drive_link",
        appliedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      }
    ];

    // 5. INSERT INTO DB
    await Application.insertMany(mockApplications);
    console.log("🚀 Applications Seeded Successfully!");

    process.exit();
  } catch (err) {
    console.error("Error seeding applications:", err);
    process.exit(1);
  }
};

seedApplications();