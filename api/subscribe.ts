// Vercel serverless endpoint: POST { email } → notifies Agency@caameetings.com through Resend.
import { sendSubscription } from './_shared';

type Req = { method?: string; body?: unknown };
type Res = { status: (code: number) => { json: (body: unknown) => void } };

export default async function handler(req: Req, res: Res) {
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }
  const email = (req.body as { email?: string } | undefined)?.email ?? '';
  const { status, body } = await sendSubscription(String(email));
  res.status(status).json(body);
}
