const express = require("express");
const router = express.Router();
const hrController = require("../controllers/hrController");
const { protect, isHR } = require("../middleware/auth");

// @route   GET /api/hr/dashboard
// @desc    Get HR dashboard data
// @access  Private (HR)
router.get("/dashboard", protect, isHR, hrController.getDashboard);

// @route   GET /api/hr/jobs/:jobId/candidates
// @desc    Get all candidates for a specific job
// @access  Private (HR)
router.get("/jobs/:jobId/candidates", hrController.getJobCandidates);

// @route   GET /api/hr/candidates/:candidateId/evaluation
// @desc    Get candidate evaluation details
// @access  Private (HR)
router.get(
  "/candidates/:candidateId/evaluation",
  hrController.getCandidateEvaluation
);

// @route   PUT /api/hr/candidates/:candidateId/status
// @desc    Update candidate application status
// @access  Private (HR)
router.put(
  "/candidates/:candidateId/status",
  hrController.updateCandidateStatus
);

// @route   POST /api/hr/jobs
// @desc    Post a new job
// @access  Private (HR)
router.post("/jobs", protect, isHR, hrController.createJob);

// @route   DELETE /api/hr/jobs/:jobId
// @desc    Delete a job
// @access  Private (HR)
router.delete("/jobs/:jobId", protect, isHR, hrController.deleteJob);

module.exports = router;





