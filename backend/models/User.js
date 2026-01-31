const mongoose = require("mongoose");

const candidateProfileSchema = new mongoose.Schema(
  {
    fullName: { type: String, trim: true },
    headline: { type: String, trim: true },
    location: { type: String, trim: true },
    experienceYears: { type: Number, min: 0 },
    skills: [{ type: String, trim: true }],
    resumeUrl: { type: String, trim: true },
    phone: { type: String, trim: true },
  },
  { _id: false }
);

const hrProfileSchema = new mongoose.Schema(
  {
    companyName: { type: String, trim: true },
    companyWebsite: { type: String, trim: true },
    positionTitle: { type: String, trim: true },
    department: { type: String, trim: true },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["candidate", "hr"],
      required: true,
    },
    candidateProfile: candidateProfileSchema,
    hrProfile: hrProfileSchema,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);









