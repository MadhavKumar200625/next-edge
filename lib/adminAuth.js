import Admin from "../models/Admin";

function readToken(req) {
  const auth = req.headers.get("authorization") || "";
  if (auth.startsWith("Bearer ")) return auth.slice(7);
  return req.headers.get("x-admin-token") || "";
}

export async function requireAdmin(req, { superOnly = false } = {}) {
  const token = readToken(req);

  if (!token) {
    return {
      error: new Response(JSON.stringify({ error: "Admin token required" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }),
    };
  }

  let decoded = "";
  try {
    decoded = Buffer.from(token, "base64").toString("utf8");
  } catch (err) {
    decoded = "";
  }

  const [email, role] = decoded.split(":");
  if (!email || !role) {
    return {
      error: new Response(JSON.stringify({ error: "Invalid admin token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }),
    };
  }

  const admin = await Admin.findOne({ email, isActive: true }).lean();
  if (!admin || admin.role !== role) {
    return {
      error: new Response(JSON.stringify({ error: "Invalid admin token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }),
    };
  }

  if (superOnly && admin.role !== "super_admin") {
    return {
      error: new Response(
        JSON.stringify({ error: "Super admin access required" }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      ),
    };
  }

  return { admin };
}
