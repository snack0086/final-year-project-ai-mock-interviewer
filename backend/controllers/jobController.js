const Job = require("../models/Job");

const getHrId = (req) => (req.user && req.user.id) || req.body.createdBy;

// @desc    Get all job openings
// @route   GET /api/jobs
exports.getAllJobs = async (req, res) => {
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

// @desc    Get a single job by ID
// @route   GET /api/jobs/:id
exports.getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Create a new job opening
// @route   POST /api/jobs
exports.createJob = async (req, res) => {
  try {
    const hrId = getHrId(req);
    const { title, company, location, type, salaryRange, description, requirements } =
      req.body;

    if (!hrId) {
      return res.status(400).json({
        success: false,
        message: "HR (createdBy) is required",
      });
    }

    // Validation
    if (!title || !company || !location || !type || !description) {
      return res.status(400).json({
        success: false,
        message: "Please provide title, company, location, type and description",
      });
    }

    const job = await Job.create({
      title,
      company,
      location,
      type,
      salaryRange,
      description,
      requirements,
      createdBy: hrId,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Update a job opening
// @route   PUT /api/jobs/:id
exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const job = await Job.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Delete a job opening
// @route   DELETE /api/jobs/:id
exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findByIdAndDelete(id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

