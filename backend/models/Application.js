const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    hr: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // HR that owns the job
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "interview", "accepted", "rejected"],
      default: "pending",
    },
    resumeUrl: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
    },
    summary: {
      type: String,
    },
    interpretation: {
      type: String,
    },
    shouldHire: {
      type: Boolean,
    },
    // Link to interview evaluations (optional)
    interviewEvaluation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InterviewEvaluation",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);









