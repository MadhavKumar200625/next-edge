import mongoose from "mongoose";
import Candidate from "../models/CandidateSchema";
import Employer from "../models/EmployerSchema";

function splitList(value) {
  if (Array.isArray(value)) return value.map(String).map((v) => v.trim()).filter(Boolean);
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function createCandidateFromPayment(pending, razorpayPaymentId = "") {
  if (pending.candidateId) {
    const existing = await Candidate.findById(pending.candidateId);
    if (existing) return existing;
  }

  const data = pending.candidateData || {};
  const exists = await Candidate.findOne({
    $or: [{ email: data.email }, { phone: data.phone }],
  });

  if (exists) {
    pending.status = "paid";
    pending.razorpayPaymentId = razorpayPaymentId || pending.razorpayPaymentId;
    pending.candidateId = exists._id;
    await pending.save();
    return exists;
  }

  const employer = await Employer.findOne({
    referralCode: data.referralCode,
    approvalStatus: "approved",
  });

  if (!employer) {
    throw new Error("Invalid referral code. Candidate account was not created.");
  }

  const encodedPassword = Buffer.from(String(data.phone)).toString("base64");
  const now = new Date();

  const candidate = await Candidate.create({
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    password: encodedPassword,
    dateOfBirth: data.dateOfBirth || null,
    class10: data.class10,
    class12: data.class12,
    graduation: data.graduation || "",
    postGraduation: data.postGraduation || "",
    otherQualifications: data.otherQualifications || "",
    highestQualification: data.postGraduation || data.graduation || data.class12,
    languagesKnown: splitList(data.languagesKnown),
    maritalStatus: data.maritalStatus || "",
    keySkills: splitList(data.keySkills),
    projects: data.projects || "",
    linkedInId: data.linkedInId,
    instagram: data.instagram || "",
    otherSocialProfile: data.otherSocialProfile || "",
    currentAddress: data.currentLocation,
    city: data.currentLocation,
    currentCompany: data.currentOrganization,
    currentOrganization: data.currentOrganization,
    totalExperience: Number(data.totalExperience) || 0,
    currentCTC: Number(data.currentCTC) || 0,
    expectedCTC: Number(data.expectedCTC) || 0,
    noticePeriod: data.noticePeriod,
    reasonForJobChange: data.reasonForJobChange,
    resumeFile: data.resumeFile,
    profileVideo: data.profileVideo || "",
    referralCodeUsed: data.referralCode,
    referredByEmployerId: employer._id,
    hasActivePlan: true,
    activeSubscriptionId: new mongoose.Types.ObjectId(),
    planExpiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    isVerified: true,
    commissionCredited: true,
  });

  const commissionAmount = Number(employer.commissionPerSubscription || 9);
  employer.pendingCommission =
    (Number(employer.pendingCommission) || 0) + commissionAmount;
  employer.totalCommissionEarned =
    (Number(employer.totalCommissionEarned) || 0) + commissionAmount;
  employer.totalPaidSubscriptions =
    (Number(employer.totalPaidSubscriptions) || 0) + 1;
  employer.totalReferredCandidates =
    (Number(employer.totalReferredCandidates) || 0) + 1;
  await employer.save();

  pending.status = "paid";
  pending.razorpayPaymentId = razorpayPaymentId || pending.razorpayPaymentId;
  pending.candidateId = candidate._id;
  await pending.save();

  return candidate;
}
