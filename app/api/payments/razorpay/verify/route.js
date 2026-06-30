import crypto from "crypto";
import connectDB from "../../../../../lib/mongodb";
import PendingCandidate from "../../../../../models/PendingCandidate";
import { createCandidateFromPayment } from "../../../../../lib/candidateAccount";

function verifySignature(orderId, paymentId, signature) {
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  const received = String(signature || "");
  return (
    expected.length === received.length &&
    crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(received))
  );
}

export async function POST(req) {
  try {
    await connectDB();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return new Response(JSON.stringify({ error: "Payment details required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!process.env.RAZORPAY_KEY_SECRET) {
      return new Response(
        JSON.stringify({ error: "Razorpay secret is not configured." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!verifySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)) {
      return new Response(JSON.stringify({ error: "Invalid payment signature" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const pending = await PendingCandidate.findOne({ razorpayOrderId: razorpay_order_id });
    if (!pending) {
      return new Response(JSON.stringify({ error: "Pending signup not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const candidate = await createCandidateFromPayment(pending, razorpay_payment_id);

    return new Response(
      JSON.stringify({
        ok: true,
        candidateId: candidate._id,
        message: "Account created. Please login with your email and contact number.",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
