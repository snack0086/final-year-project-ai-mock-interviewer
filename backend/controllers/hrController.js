const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");
const InterviewEvaluation = require("../models/InterviewEvaluation");

const getHrId = (req) => (req.user && req.user.id) || req.body.hrId;

// @desc    Get HR dashboard data
// @route   GET /api/hr/dashboard
// @access  Private (HR)
// exports.getDashboard = async (req, res) => {
//   try {
//     const hrId = getHrId(req);

//     if (!hrId) {
//       return res.status(400).json({
//         success: false,
//         message: "HR ID is required",
//       });
//     }

//     const [jobs, applications, pendingInterviews] = await Promise.all([
//       Job.find({ createdBy: hrId }).sort({ createdAt: -1 }),
//       Application.find({ hr: hrId }),
//       Application.find({ hr: hrId, status: "interview" }),
//     ]);

//     res.status(200).json({
//       success: true,
//       data: {
//         totalJobs: jobs.length,
//         totalCandidates: applications.length,
//         pendingInterviews: pendingInterviews.length,
//         jobOpenings: jobs,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

exports.getDashboard = async (req, res) => {
  try {
    const hrId = getHrId(req);

    if (!hrId) {
      return res
        .status(400)
        .json({ success: false, message: "HR ID is required" });
    }

    // 1. Get HR Details
    const hrUser = await User.findById(hrId).select("-password");

    // 2. Find Jobs created by this HR
    const jobs = await Job.find({ createdBy: hrId }).sort({ createdAt: -1 });

    // 3. MERGE: Find candidates for EACH job
    const jobsWithCandidates = await Promise.all(
      jobs.map(async (job) => {
        // Find applications for this specific job
        const applications = await Application.find({ job: job._id })
          .populate("candidate", "name email phone location") // Get candidate profile
          .sort({ createdAt: -1 });

        // Format the candidates to match Frontend Mock Data structure
        const formattedCandidates = applications.map((app) => ({
          id: app._id,
          name: app.candidate ? app.candidate.name : "Unknown Candidate",
          email: app.candidate ? app.candidate.email : "N/A",
          phone: app.candidate?.phone || "N/A",
          location: app.candidate?.location || "N/A",
          rating: app.rating || 0,
          status: app.status, // "Pending", "Interview", etc.
          appliedDate: new Date(app.createdAt).toLocaleDateString(),
          jobTitle: job.title,
          // These fields will be populated by your AI later
          summary: app.summary || "Pending AI Evaluation...",
          interpretation: app.interpretation || "Analysis in progress...",
          shouldHire: app.shouldHire,
          transcript: [], // Placeholder for now
        }));

        // Return the Job + The new Candidates Array
        return {
          ...job.toObject(),
          id: job._id, // Map _id to id for frontend convenience
          candidates: formattedCandidates,
        };
      })
    );

    res.status(200).json({
      success: true,
      data: {
        hrName: hrUser.name,
        jobOpenings: jobsWithCandidates,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Get all candidates for a specific job, sorted by rating
// @route   GET /api/hr/jobs/:jobId/candidates
exports.getJobCandidates = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({ job: jobId })
      .populate("candidate")
      .sort({ rating: 1 }); // ascending rating

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

// @desc    Get candidate evaluation details for a job
// @route   GET /api/hr/candidates/:candidateId/evaluation
// @query   jobId (optional, but recommended)
exports.getCandidateEvaluation = async (req, res) => {
  try {
    const { candidateId } = req.params;
    const { jobId } = req.query;

    const query = { candidate: candidateId };
    if (jobId) query.job = jobId;

    const evaluation = await InterviewEvaluation.findOne(query)
      .populate("candidate job hr")
      .lean();

    if (!evaluation) {
      return res.status(404).json({
        success: false,
        message: "Evaluation not found",
      });
    }

    res.status(200).json({
      success: true,
      data: evaluation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Update candidate application status for a specific job
// @route   PUT /api/hr/candidates/:candidateId/status
// @body    { jobId, status }
exports.updateCandidateStatus = async (req, res) => {
  try {
    const { candidateId } = req.params;
    const { jobId, status } = req.body;

    if (!jobId || !status) {
      return res.status(400).json({
        success: false,
        message: "jobId and status are required",
      });
    }

    const application = await Application.findOneAndUpdate(
      { candidate: candidateId, job: jobId },
      { status },
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
      message: "Candidate status updated successfully",
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

// @desc    Post a new job
// @route   POST /api/hr/jobs
// @access  Private (HR)
exports.createJob = async (req, res) => {
  try {
    const hrId = req.user.id; // From middleware

    // 1. Destructure data from the form
    const {
      title,
      company,
      location,
      type,
      salaryRange,
      description,
      requirements,
    } = req.body;

    // 2. Validate essential fields
    if (!title || !company || !description) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide title, company, and description",
        });
    }

    // 3. Create the Job
    const newJob = await Job.create({
      title,
      company,
      location,
      type,
      salaryRange,
      description,
      // If requirements come as a comma-separated string, split them.
      // If sent as an array, use as is.
      requirements: Array.isArray(requirements)
        ? requirements
        : requirements.split(",").map((req) => req.trim()),
      createdBy: hrId, // 👈 Links this job to YOU
    });

    res.status(201).json({
      success: true,
      message: "Job Posted Successfully",
      job: newJob,
    });
  } catch (error) {
    console.error("Create Job Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
