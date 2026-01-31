const express = require("express");
const router = express.Router();
const candidateController = require("../controllers/candidateController");
const { protect, isCandidate } = require("../middleware/auth");
const { upload } = require("../config/cloudinary");

// @route   GET /api/candidates/dashboard
// @desc    Get candidate dashboard data
// @access  Private
router.get(
  "/dashboard",
  protect,
  isCandidate,
  candidateController.getDashboard
);

// @route   GET /api/candidates/jobs
// @desc    Get all available job openings
// @access  Private
router.get("/jobs", candidateController.getJobs);

// @route   GET /api/candidates/applications
// @desc    Get candidate's applications
// @access  Private
router.get(
  "/applications",
  protect,
  isCandidate,
  candidateController.getApplications
);

// @route   POST /api/candidates/apply
// @desc    Apply for a job (with resume upload)
// @access  Private
router.post(
  "/apply",
  protect,
  isCandidate,
  // 👇 ADD 'upload.single' HERE.
  // 'resume' is the specific name of the form field we will send from frontend.
  upload.single("resume"),
  candidateController.applyForJob
);

// @route   POST /api/candidates/upload-resume
// @desc    Upload resume for a job application
// @access  Private
router.post(
  "/upload-resume",
  protect,
  isCandidate,
  candidateController.uploadResume
);
module.exports = router;

