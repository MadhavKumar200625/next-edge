import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employer",
      required: true,
    },

    jobCode: {
      type: String,
      unique: true,
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    positionName: {
      type: String,
      default: "",
    },

    hrName: {
      type: String,
      default: "",
    },

    hrNumber: {
      type: String,
      default: "",
    },

    department: {
      type: String,
      default: "",
    },

    companyName: {
      type: String,
      required: true,
    },

    companyLogo: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    workMode: {
      type: String,
      enum: ["Remote", "Hybrid", "Onsite", "Work From Office"],
      default: "Onsite",
    },

    employmentType: {
      type: String,
      enum: [
        "Full Time",
        "Full-Time",
        "Part Time",
        "Part-Time",
        "Contract",
        "Internship",
        "Freelance"
      ],
      default: "Full Time",
    },

    industry: {
      type: String,
      default: "",
    },

    experienceMin: {
      type: Number,
      default: 0,
    },

    experienceMax: {
      type: Number,
      default: 0,
    },

    salaryMin: {
      type: Number,
      default: 0,
    },

    salaryMax: {
      type: Number,
      default: 0,
    },

    salaryRange: {
      type: String,
      default: "",
    },

    vacancies: {
      type: Number,
      default: 1,
    },

    skillsRequired: {
      type: [String],
      default: [],
    },

    qualificationRequired: {
      type: String,
      default: "",
    },

    preferredCandidates: {
      type: String,
      enum: ["Female Candidates", "Male Candidates", "Both", ""],
      default: "",
    },

    noticePeriod: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      required: true,
    },

    responsibilities: {
      type: [String],
      default: [],
    },

    requirements: {
      type: [String],
      default: [],
    },

    benefits: {
      type: [String],
      default: [],
    },

    workingDays: {
      type: String,
      default: "",
    },

    shiftTiming: {
      type: String,
      default: "",
    },

    cabFacility: {
      type: String,
      enum: ["Yes", "No", ""],
      default: "",
    },

    mealFacility: {
      type: String,
      enum: ["Yes", "No", ""],
      default: "",
    },

    requiredSoftwareTools: {
      type: String,
      default: "",
    },

    languagesRequired: {
      type: [String],
      default: [],
    },

    interviewProcess: {
      type: String,
      default: "",
    },

    applicationFields: [
      {
        label: String,

        type: {
          type: String,
          enum: [
            "text",
            "textarea",
            "number",
            "email",
            "phone",
            "select",
            "checkbox",
            "radio",
            "file",
            "resume"
          ],
        },

        required: {
          type: Boolean,
          default: false,
        },

        options: {
          type: [String],
          default: [],
        },
      },
    ],

    totalApplications: {
      type: Number,
      default: 0,
    },

    totalViews: {
      type: Number,
      default: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: [
        "draft",
        "active",
        "paused",
        "closed"
      ],
      default: "active",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    publishedAt: {
      type: Date,
      default: Date.now,
    },

    closedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

JobSchema.index({ title: "text" });
JobSchema.index({ city: 1 });
JobSchema.index({ state: 1 });
JobSchema.index({ status: 1 });
JobSchema.index({ employerId: 1 });

export default mongoose.models.Job ||
  mongoose.model("Job", JobSchema);
