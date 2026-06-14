import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employer",
      required: true,
    },

    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },

    applicationCode: {
      type: String,
      unique: true,
      required: true,
    },

    selectedResumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      default: null,
    },

    answers: [
      {
        fieldLabel: String,
        fieldType: String,
        value: mongoose.Schema.Types.Mixed,
      },
    ],

    status: {
      type: String,
      enum: [
        "Applied",
        "Viewed",
        "Shortlisted",
        "Interview Scheduled",
        "Selected",
        "Rejected",
        "Withdrawn"
      ],
      default: "Applied",
    },

    employerNotes: {
      type: String,
      default: "",
    },

    appliedAt: {
      type: Date,
      default: Date.now,
    },

    viewedAt: {
      type: Date,
      default: null,
    },

    shortlistedAt: {
      type: Date,
      default: null,
    },

    rejectedAt: {
      type: Date,
      default: null,
    },

    selectedAt: {
      type: Date,
      default: null,
    },

    interviewDate: {
      type: Date,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

ApplicationSchema.index({
  candidateId: 1,
  jobId: 1,
});

ApplicationSchema.index({
  employerId: 1,
});

ApplicationSchema.index({
  status: 1,
});

export default mongoose.models.Application ||
  mongoose.model("Application", ApplicationSchema);