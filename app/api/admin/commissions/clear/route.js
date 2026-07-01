import connectDB from '../../../../../lib/mongodb';
import Employer from '../../../../../models/EmployerSchema';

export async function POST(req) {
  try {
    await connectDB();
    const { employerId, amount } = await req.json();
    if (!employerId) return new Response(JSON.stringify({ error: 'employerId required' }), { status: 400 });
    const amt = Number(amount || 0);
    if (isNaN(amt) || amt <= 0) return new Response(JSON.stringify({ error: 'Invalid amount' }), { status: 400 });

    const emp = await Employer.findById(employerId);
    if (!emp) return new Response(JSON.stringify({ error: 'Employer not found' }), { status: 404 });

    const pending = Number(emp.pendingCommission || 0);
    if (amt > pending) {
      return new Response(JSON.stringify({ error: `Amount cannot exceed pending commission (₹${pending}).` }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    emp.pendingCommission = Math.max(0, pending - amt);
    emp.totalCommissionPaid = (Number(emp.totalCommissionPaid || 0) + amt);
    emp.totalCommissionEarned =
      Number(emp.pendingCommission || 0) + Number(emp.totalCommissionPaid || 0);
    await emp.save();

    return new Response(JSON.stringify({ ok: true, cleared: amt, employer: { id: emp._id, pendingCommission: emp.pendingCommission, totalCommissionPaid: emp.totalCommissionPaid } }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), { status: 500 });
  }
}
