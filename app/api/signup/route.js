export async function POST() {
  return new Response(
    JSON.stringify({
      error:
        "Candidate signup requires payment. Use /api/payments/razorpay/order.",
    }),
    {
      status: 410,
      headers: { "Content-Type": "application/json" },
    }
  );
}
