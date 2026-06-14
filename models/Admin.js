import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
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

    profileImage: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: [
        "super_admin",
        "admin",
        "accounts_admin",
        "support_admin"
      ],
      default: "admin",
    },

    permissions: {
      type: [String],
      default: ["all"],
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

AdminSchema.index({ email: 1 });
AdminSchema.index({ phone: 1 });

export default mongoose.models.Admin ||
  mongoose.model("Admin", AdminSchema);