import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";
// Resend test mode only allows delivery to the connection owner's verified email.
// Until a custom domain is verified at resend.com/domains, set CONTACT_EMAIL secret
// to override (e.g. "neeraj0110@proton.me" once a domain is verified).
const TO_EMAIL = Deno.env.get("CONTACT_EMAIL") || "neeraj24solace@gmail.com";
const FROM_EMAIL = "AquaResilience <onboarding@resend.dev>";

const escapeHtml = (s: string) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");

const fmtRow = (k: string, v: unknown) => {
  if (v === undefined || v === null || v === "") return "";
  const val = Array.isArray(v) ? v.join(", ") : String(v);
  return `<tr><td style="padding:8px 12px;background:#f6f8fb;font-weight:500;color:#0a1626;vertical-align:top;width:34%;border-bottom:1px solid #e7eaf0">${escapeHtml(k)}</td><td style="padding:8px 12px;color:#1a2533;white-space:pre-wrap;border-bottom:1px solid #e7eaf0">${escapeHtml(val)}</td></tr>`;
};

const renderTable = (data: Record<string, unknown>) => `
  <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;font-family:Inter,Arial,sans-serif;font-size:14px;border:1px solid #e7eaf0">
    ${Object.entries(data).map(([k, v]) => fmtRow(k, v)).join("")}
  </table>`;

const wrap = (title: string, inner: string) => `
  <div style="background:#f0f3f7;padding:24px;font-family:Inter,Arial,sans-serif">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e7eaf0">
      <div style="background:linear-gradient(135deg,#06122a,#103e5b 60%,#1a7a9c);padding:28px 24px;color:#e6fbff">
        <div style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#5fe3ee;margin-bottom:6px">AquaResilience</div>
        <div style="font-size:22px;font-family:Georgia,serif;font-weight:300">${escapeHtml(title)}</div>
      </div>
      <div style="padding:24px">${inner}</div>
      <div style="padding:16px 24px;font-size:11px;color:#7a8699;border-top:1px solid #e7eaf0">Sent automatically from aquaresilience.com</div>
    </div>
  </div>`;

async function sendEmail(payload: Record<string, unknown>) {
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
  if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

  const res = await fetch(`${GATEWAY_URL}/emails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": RESEND_API_KEY,
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Resend failed [${res.status}]: ${JSON.stringify(data)}`);
  return data;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { kind, payload } = await req.json();
    if (!payload || typeof payload !== "object") {
      return new Response(JSON.stringify({ error: "Invalid payload" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const isJoin = kind === "join";
    const name = String(payload.fullName ?? payload.name ?? "Unknown");
    const email = String(payload.email ?? "");
    const subject = isJoin
      ? `New AquaResilience Join Us Submission — ${name}`
      : `New AquaResilience Contact — ${name}`;

    // 1) Notify founder
    await sendEmail({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: email || undefined,
      subject,
      html: wrap(isJoin ? "New Join Us submission" : "New contact message", renderTable(payload)),
    });

    // 2) Confirmation to applicant (best effort — silently skipped in Resend test mode)
    if (email && email !== TO_EMAIL) {
      try {
        await sendEmail({
          from: FROM_EMAIL,
          to: [email],
          subject: "Thanks for your interest in AquaResilience",
          html: wrap(
            "Thank you",
            `<p style="font-family:Inter,Arial,sans-serif;font-size:15px;color:#1a2533;line-height:1.6">
              Hi ${escapeHtml(name.split(" ")[0] || "there")},<br/><br/>
              Thanks for reaching out to AquaResilience. We've received your ${isJoin ? "submission" : "message"}
              and will get back to you personally. We read every one carefully.<br/><br/>
              — The AquaResilience team
            </p>`
          ),
        });
      } catch (e) {
        console.error("Confirmation email failed (non-fatal — likely Resend test mode):", e);
      }
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-join-submission error:", err);
    const msg = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
