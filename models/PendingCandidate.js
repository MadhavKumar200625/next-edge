import mongoose from "mongoose";

const PendingCandidateSchema = new mongoose.Schema(
  {
    razorpayOrderId: {
      type: String,
      required: true,
      unique: true,
    },
    razorpayPaymentId: {
      type: String,
      default: "",
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
    candidateData: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    status: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created",
    },
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

PendingCandidateSchema.index({ razorpayOrderId: 1 });
PendingCandidateSchema.index({ razorpayPaymentId: 1 });

export default mongoose.models.PendingCandidate ||
  mongoose.model("PendingCandidate", PendingCandidateSchema);
