import mongoose from "mongoose";

const CandidateSchema = new mongoose.Schema(
  {
    // Authentication

    fullName: {
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

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    // Personal Details

    fatherName: {
      type: String,
      default: "",
    },

    dateOfBirth: {
      type: Date,
      default: null,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: null,
    },

    maritalStatus: {
      type: String,
      enum: ["Single", "Married", "Divorced", "Widowed"],
      default: null,
    },

    // Contact Details

    alternatePhone: {
      type: String,
      default: "",
    },

    currentAddress: {
      type: String,
      default: "",
    },

    permanentAddress: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      default: "",
    },

    // Identity

    aadhaarNumber: {
      type: String,
      default: "",
    },

    panNumber: {
      type: String,
      default: "",
    },

    aadhaarCardFile: {
      type: String,
      default: "",
    },

    panCardFile: {
      type: String,
      default: "",
    },

    // Education

    highestQualification: {
      type: String,
      default: "",
    },

    specialization: {
      type: String,
      default: "",
    },

    passingYear: {
      type: String,
      default: "",
    },

    collegeUniversity: {
      type: String,
      default: "",
    },

    // Employment

    currentCompany: {
      type: String,
      default: "",
    },

    currentDesignation: {
      type: String,
      default: "",
    },

    totalExperience: {
      type: Number,
      default: 0,
    },

    currentCTC: {
      type: Number,
      default: 0,
    },

    expectedCTC: {
      type: Number,
      default: 0,
    },

    noticePeriod: {
      type: String,
      default: "",
    },

    preferredJobLocation: {
      type: String,
      default: "",
    },

    // Skills

    keySkills: {
      type: [String],
      default: [],
    },

    industryPreference: {
      type: String,
      default: "",
    },

    jobType: {
      type: String,
      enum: ["Full Time", "Part Time", "Remote"],
      default: "",
    },

    immediateJoining: {
      type: Boolean,
      default: false,
    },

    // Resume

    resumeFile: {
      type: String,
      default: "",
    },

    // Referral System

    referralCodeUsed: {
      type: String,
      default: "",
    },

    referredByEmployerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employer",
      default: null,
    },

    // Subscription

    hasActivePlan: {
      type: Boolean,
      default: false,
    },

    activeSubscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      default: null,
    },

    planExpiryDate: {
      type: Date,
      default: null,
    },

    // Status

    isVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

CandidateSchema.index({ email: 1 });
CandidateSchema.index({ phone: 1 });
CandidateSchema.index({ referralCodeUsed: 1 });
CandidateSchema.index({ referredByEmployerId: 1 });

export default mongoose.models.Candidate ||
  mongoose.model("Candidate", CandidateSchema);