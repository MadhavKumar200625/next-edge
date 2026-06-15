"use server";

import connectDB from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";

const allowedTopics = new Set([
  "Profile support",
  "Jobs and applications",
  "Account and access",
  "Billing question",
  "General question",
]);

function readField(formData, field) {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitContactMessage(_previousState, formData) {
  const fullName = readField(formData, "fullName");
  const email = readField(formData, "email").toLowerCase();
  const phone = readField(formData, "phone");
  const topic = readField(formData, "topic");
  const message = readField(formData, "message");
  const website = readField(formData, "website");

  if (website) {
    return {
      status: "success",
      message: "Thanks. Your message has been received.",
      errors: {},
    };
  }

  const errors = {};

  if (fullName.length < 2 || fullName.length > 80) {
    errors.fullName = "Enter a name between 2 and 80 characters.";
  }

  if (
    email.length > 120 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    errors.email = "Enter a valid email address.";
  }

  if (phone && !/^[+\d\s()-]{7,20}$/.test(phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!allowedTopics.has(topic)) {
    errors.topic = "Select a valid topic.";
  }

  if (message.length < 20 || message.length > 2000) {
    errors.message = "Enter a message between 20 and 2,000 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please review the highlighted fields.",
      errors,
    };
  }

  if (!process.env.MONGODB_URI) {
    return {
      status: "error",
      message:
        "The contact service is not configured yet. Please try again later.",
      errors: {},
    };
  }

  try {
    await connectDB();
    await ContactMessage.create({
      fullName,
      email,
      phone,
      topic,
      message,
    });

    return {
      status: "success",
      message:
        "Thanks for reaching out. Your message has been received by NextEdge.",
      errors: {},
    };
  } catch {
    return {
      status: "error",
      message:
        "We could not send your message right now. Please try again later.",
      errors: {},
    };
  }
}
