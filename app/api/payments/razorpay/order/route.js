import connectDB from "../../../../../lib/mongodb";
import Candidate from "../../../../../models/CandidateSchema";
import Employer from "../../../../../models/EmployerSchema";
import PendingCandidate from "../../../../../models/PendingCandidate";

const BASE_AMOUNT = 99;
const GST_RATE = 0.18;
const TOTAL_AMOUNT = Math.round(BASE_AMOUNT * (1 + GST_RATE) * 100);

const requiredFields = [
  "fullName",
  "email",
  "phone",
  "dateOfBirth",
  "class10",
  "class12",
  "languagesKnown",
  "keySkills",
  "linkedInId",
  "currentLocation",
  "currentOrganization",
  "totalExperience",
  "currentCTC",
  "expectedCTC",
  "noticePeriod",
  "reasonForJobChange",
  "resumeFile",
  "referralCode",
];

function missingFields(data) {
  return requiredFields.filter((field) => !String(data[field] || "").trim());
}

export async function POST(req) {
  try {
    await connectDB();

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return new Response(
        JSON.stringify({ error: "Razorpay keys are not configured." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const candidateData = await req.json();
    const missing = missingFields(candidateData);
    if (missing.length) {
      return new Response(
        JSON.stringify({ error: `Missing required fields: ${missing.join(", ")}` }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const exists = await Candidate.findOne({
      $or: [{ email: candidateData.email }, { phone: candidateData.phone }],
    });
    if (exists) {
      return new Response(
        JSON.stringify({ error: "Email or phone already in use" }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    const employer = await Employer.findOne({
      referralCode: candidateData.referralCode,
      approvalStatus: "approved",
      isActive: true,
    });
    if (!employer) {
      return new Response(
        JSON.stringify({ error: "Invalid referral code. Please contact support." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const auth = Buffer.from(
      `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
    ).toString("base64");

    const orderRes = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 200,
        currency: "INR",
        receipt: `candidate_${Date.now()}`,
        notes: {
          email: candidateData.email,
          phone: candidateData.phone,
        },
      }),
    });

    const order = await orderRes.json();
    if (!orderRes.ok) {
      return new Response(
        JSON.stringify({ error: order.error?.description || "Could not create Razorpay order" }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    await PendingCandidate.create({
      razorpayOrderId: order.id,
      amount: TOTAL_AMOUNT,
      currency: "INR",
      candidateData,
    });

    return new Response(
      JSON.stringify({
        ok: true,
        orderId: order.id,
        keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID,
        amount: TOTAL_AMOUNT,
        currency: "INR",
        breakdown: {
          baseAmount: BASE_AMOUNT,
          gstRate: GST_RATE,
          gstAmount: Number((BASE_AMOUNT * GST_RATE).toFixed(2)),
          totalAmount: TOTAL_AMOUNT / 100,
        },
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
