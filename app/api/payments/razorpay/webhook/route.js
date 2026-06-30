import crypto from "crypto";
import connectDB from "../../../../../lib/mongodb";
import PendingCandidate from "../../../../../models/PendingCandidate";
import { createCandidateFromPayment } from "../../../../../lib/candidateAccount";

function isValidWebhook(rawBody, signature) {
  if (!process.env.RAZORPAY_WEBHOOK_SECRET) return false;

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
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

    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!isValidWebhook(rawBody, signature)) {
      return new Response(JSON.stringify({ error: "Invalid webhook signature" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const event = JSON.parse(rawBody);
    const payment = event.payload?.payment?.entity;
    const orderId = payment?.order_id;

    if (!["payment.captured", "order.paid"].includes(event.event) || !orderId) {
      return new Response(JSON.stringify({ ok: true, ignored: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const pending = await PendingCandidate.findOne({ razorpayOrderId: orderId });
    if (pending && pending.status !== "paid") {
      await createCandidateFromPayment(pending, payment?.id || "");
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
