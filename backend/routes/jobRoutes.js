const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");

// @route   GET /api/jobs
// @desc    Get all job openings
// @access  Public
router.get("/", jobController.getAllJobs);

// @route   GET /api/jobs/:id
// @desc    Get a single job by ID
// @access  Public
router.get("/:id", jobController.getJobById);

// @route   POST /api/jobs
// @desc    Create a new job opening (HR only)
// @access  Private (HR)
router.post("/", jobController.createJob);

// @route   PUT /api/jobs/:id
// @desc    Update a job opening (HR only)
// @access  Private (HR)
router.put("/:id", jobController.updateJob);

// @route   DELETE /api/jobs/:id
// @desc    Delete a job opening (HR only)
// @access  Private (HR)
router.delete("/:id", jobController.deleteJob);

module.exports = router;









