import mongoose from "mongoose";

const EmployerSchema = new mongoose.Schema(
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

    // Company Details

    companyName: {
      type: String,
      default: "",
    },

    companyLogo: {
      type: String,
      default: "",
    },

    companyWebsite: {
      type: String,
      default: "",
    },

    designation: {
      type: String,
      default: "",
    },

    industryType: {
      type: String,
      default: "",
    },

    linkedInCompanyPage: {
      type: String,
      default: "",
    },

    socialMediaLinks: {
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
      twitter: { type: String, default: "" },
      other: { type: String, default: "" },
    },

    genderPreference: {
      type: String,
      default: "",
    },

    hiringManagerName: {
      type: String,
      default: "",
    },

    hiringManagerPhone: {
      type: String,
      default: "",
    },

    companyAddress: {
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

    // Referral System

    referralCode: {
      type: String,
      required: true,
      unique: true,
    },

    // Approval

    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },

    approvedAt: {
      type: Date,
      default: null,
    },

    // Job Posting

    unlimitedJobPosting: {
      type: Boolean,
      default: false,
    },

    jobPostingLimit: {
      type: Number,
      default: 0,
    },

    totalJobsPosted: {
      type: Number,
      default: 0,
    },

    activeJobsCount: {
      type: Number,
      default: 0,
    },

    // Referral Statistics

    totalReferredCandidates: {
      type: Number,
      default: 0,
    },

    totalPaidSubscriptions: {
      type: Number,
      default: 0,
    },

    // Commission

    commissionPerSubscription: {
      type: Number,
      default: 9,
    },

    totalCommissionEarned: {
      type: Number,
      default: 0,
    },

    totalCommissionPaid: {
      type: Number,
      default: 0,
    },

    pendingCommission: {
      type: Number,
      default: 0,
    },

    // Bank Details

    accountHolderName: {
      type: String,
      default: "",
    },

    bankName: {
      type: String,
      default: "",
    },

    accountNumber: {
      type: String,
      default: "",
    },

    ifscCode: {
      type: String,
      default: "",
    },

    upiId: {
      type: String,
      default: "",
    },

    // Status

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

EmployerSchema.index({ email: 1 });
EmployerSchema.index({ phone: 1 });
EmployerSchema.index({ referralCode: 1 });
EmployerSchema.index({ approvalStatus: 1 });

export default mongoose.models.Employer ||
  mongoose.model("Employer", EmployerSchema);
