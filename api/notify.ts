// POST /api/notify — one self-contained Vercel function for every desk notification.
//   { kind: 'subscribe', email }                       -> journal subscription
//   { kind: 'acquisition', email, residence }          -> acquisition request
//
// IMPORTANT: this file must not use relative imports. Vercel compiles each api/*.ts into
// its own ESM lambda, and Node cannot resolve extensionless local specifiers there
// (ERR_MODULE_NOT_FOUND on /var/task/api/_shared). Keep everything inline.
// RESEND_API_KEY (required) and RESEND_FROM (verified sender) are read from the
// environment — Vercel project env vars / local .env.local — never from client code.

const TO = 'Agency@caameetings.com';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PLAN_LABELS: Record<string, string> = { 'pay.full': 'Full payment', 'pay.half': 'Half payment', 'pay.quarter': 'Quarter payment' };

type Residence = { address?: string; city?: string; beds?: number; baths?: number; sqft?: string | number; mode?: string; plan?: string; total?: number; deposit?: number; balance?: number };
type Payload = { kind?: string; email?: string; residence?: Residence };
type Req = { method?: string; body?: unknown };
type Res = { status: (code: number) => { json: (body: unknown) => void } };

type SendResult = { status: number; body: Record<string, unknown> };

const esc = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const money = (value: number) => '$' + Math.round(Number(value) || 0).toLocaleString('en-US');

// Low-level sender: every notification goes to the CAA desk address above.
async function sendEmail(opts: { subject: string; text: string; html: string; replyTo?: string }): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { status: 500, body: { error: 'RESEND_API_KEY is not configured.' } };
  // The sender must live on a domain verified in Resend (creativeartistproperties.com).
  const from = process.env.RESEND_FROM || 'CAA Private Real Estate <desk@creativeartistproperties.com>';
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'content-type': 'application/json' },
      body: JSON.stringify({ from, to: [TO], ...(opts.replyTo ? { reply_to: opts.replyTo } : {}), subject: opts.subject, text: opts.text, html: opts.html }),
    });
    const body = (await response.json().catch(() => ({}))) as Record<string, unknown>;
    return { status: response.ok ? 200 : 502, body };
  } catch (error) {
    return { status: 502, body: { error: String((error as Error).message || error) } };
  }
}

function sendSubscription(email: string): Promise<SendResult> {
  const trimmed = String(email || '').trim();
  if (!EMAIL_RE.test(trimmed)) return Promise.resolve({ status: 400, body: { error: 'Please enter a valid email address.' } });
  return sendEmail({
    replyTo: trimmed,
    subject: `New Journal subscriber: ${trimmed}`,
    text: `${trimmed} just subscribed to the CAA Private Journal from the website.`,
    html: `<h3>New CAA Journal subscription</h3><p><strong>${esc(trimmed)}</strong> subscribed to the private circulation from the CAA real-estate site.</p>`,
  });
}

// Notifies the desk when an artist confirms a residence on the acquisition summary.
function sendAcquisition(payload: Payload): Promise<SendResult> {
  const r = payload.residence;
  if (!r || typeof r.address !== 'string' || !r.address) return Promise.resolve({ status: 400, body: { error: 'Missing residence details.' } });
  const client = String(payload.email || 'unknown').trim() || 'unknown';
  if (!EMAIL_RE.test(client)) return Promise.resolve({ status: 400, body: { error: 'Sign-in email is missing or invalid.' } });
  const total = Number(r.total) || 0;
  const deposit = Number(r.deposit) || 0;
  const lines: [string, string][] = [
    ['Client', client],
    ['Residence', `${r.address}${r.city ? ` — ${r.city}` : ''}`],
    ['Layout', `${r.beds ?? '—'} beds • ${r.baths ?? '—'} baths • ${r.sqft ?? '—'} sq ft`],
    ['Transaction', r.mode === 'rent' ? 'Rent' : 'Buy'],
    ['Payment plan', PLAN_LABELS[String(r.plan)] ?? String(r.plan ?? '—')],
    ['Total due', money(total)],
    ['25% deposit — already paid by CAA agent', money(deposit)],
    ['Balance due', money(total - deposit)],
    ['Requested on', new Date().toUTCString()],
  ];
  const text = lines.map(([k, v]) => `${k}: ${v}`).join('\n');
  const html = `<h3>Property acquisition request</h3><ul>${lines.map(([k, v]) => `<li><strong>${esc(k)}:</strong> ${esc(v)}</li>`).join('')}</ul>`;
  return sendEmail({ replyTo: client, subject: `Property acquisition request — ${r.address}`, text, html });
}

export default async function handler(req: Req, res: Res) {
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }
  const payload = (req.body ?? {}) as Payload;
  const email = String(payload.email ?? '');
  const { status, body } = payload.kind === 'acquisition' ? await sendAcquisition(payload) : await sendSubscription(email);
  res.status(status).json(body);
}
