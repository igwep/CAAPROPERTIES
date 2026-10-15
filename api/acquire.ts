// Vercel serverless endpoint: POST { email, residence } → acquisition notification to Agency@caameetings.com via Resend.
import { sendAcquisition } from './_shared';

type Req = { method?: string; body?: unknown };
type Res = { status: (code: number) => { json: (body: unknown) => void } };

export default async function handler(req: Req, res: Res) {
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }
  const { status, body } = await sendAcquisition(req.body ?? {});
  res.status(status).json(body);
}
