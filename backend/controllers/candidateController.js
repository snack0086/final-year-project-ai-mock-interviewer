const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");
const InterviewEvaluation = require("../models/InterviewEvaluation");

// @desc    Get candidate dashboard data
// @route   GET /api/candidates/dashboard
// @access  Private (candidate)
exports.getDashboard = async (req, res) => {
  try {
    const candidateId = req.user.id;

    if (!candidateId) {
      return res.status(400).json({
        success: false,
        message: "Candidate ID is required",
      });
    }

    const candidate = await User.findById(candidateId).select("-password");
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    const [applications, jobs] = await Promise.all([
      Application.find({ candidate: candidateId })
        .populate("job")
        .sort({ createdAt: -1 }),
      Job.find({ isActive: true }).sort({ createdAt: -1 }),
    ]);

    res.status(200).json({
      success: true,
      candidate,
      applications,
      availableJobs: jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Get all available job openings
// @route   GET /api/candidates/jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Get candidate's applications
// @route   GET /api/candidates/applications
exports.getApplications = async (req, res) => {
  try {
    const candidateId = req.user.id;

    if (!candidateId) {
      return res.status(400).json({
        success: false,
        message: "Candidate ID is required",
      });
    }

    const applications = await Application.find({ candidate: candidateId })
      .populate("job")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Apply for a job
// @route   POST /api/candidates/apply
// exports.applyForJob = async (req, res) => {
//   try {
//     const candidateId = req.user.id;
//     const { jobId, resumeUrl } = req.body;

//     if (!candidateId || !jobId) {
//       return res.status(400).json({
//         success: false,
//         message: "Candidate ID and Job ID are required",
//       });
//     }

//     const job = await Job.findById(jobId);
//     if (!job) {
//       return res.status(404).json({
//         success: false,
//         message: "Job not found",
//       });
//     }

//     const existing = await Application.findOne({
//       candidate: candidateId,
//       job: jobId,
//     });
//     if (existing) {
//       return res.status(400).json({
//         success: false,
//         message: "You have already applied to this job",
//       });
//     }

//     const application = await Application.create({
//       candidate: candidateId,
//       job: jobId,
//       hr: job.createdBy,
//       status: "pending",
//       resumeUrl: resumeUrl || "https://drive.google.com/file/d/1Yp1sIgEJhmpaavmad9joetOyXEZ-GbY4/view", // Fallback
//       appliedDate: Date.now(),
//     });

//     res.status(201).json({
//       success: true,
//       message: "Application submitted successfully",
//       data: application,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

exports.applyForJob = async (req, res) => {
  try {
    const candidateId = req.user.id;
    const { jobId } = req.body;

    if (!candidateId || !jobId) {
      return res.status(400).json({
        success: false,
        message: "Candidate ID and Job ID are required",
      });
    }

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const existing = await Application.findOne({
      candidate: candidateId,
      job: jobId,
    });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "You have already applied to this job",
      });
    }

    // Build a local URL from the saved filename (disk storage)
    const resumeUrl = `/uploads/resumes/${req.file.filename}`;

    // 1. Create the application
    let application = await Application.create({
      candidate: candidateId,
      job: jobId,
      hr: job.createdBy,
      status: "pending",
      resumeUrl: resumeUrl,
      appliedDate: Date.now(),
    });

    // 2. 👇 CRITICAL STEP: POPULATE THE JOB DETAILS
    // This transforms "job": "ID_STRING" into "job": { title: "...", company: "..." }
    application = await application.populate("job");

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      // 3. 👇 Send as 'application' (Flattened) to match your frontend logic
      application: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Upload resume for a job application
// @route   POST /api/candidates/upload-resume
exports.uploadResume = async (req, res) => {
  try {
    const candidateId = req.user.id;
    const { jobId, resumeUrl } = req.body;

    if (!candidateId || !jobId || !resumeUrl) {
      return res.status(400).json({
        success: false,
        message: "Candidate ID, Job ID and resume URL are required",
      });
    }

    const application = await Application.findOneAndUpdate(
      { candidate: candidateId, job: jobId },
      { resumeUrl },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
