import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { sendSubscription, sendAcquisition } from './api/_shared';

// Local stand-ins for the Vercel api/subscribe.ts and api/acquire.ts functions so the
// newsletter and acquisition mails work with `npm run dev`.
// Reads RESEND_API_KEY / RESEND_FROM from .env.local (vite.config.ts runs on the Node side only).
function mailDev(): Plugin {
  const relay = (send: (payload: any) => Promise<{ status: number; body: Record<string, unknown> }>) => (req: any, res: any) => {
    res.setHeader('content-type', 'application/json');
    if (req.method !== 'POST') { res.statusCode = 405; res.end(JSON.stringify({ error: 'Method not allowed' })); return; }
    let raw = '';
    req.on('data', (chunk: string) => { raw += String(chunk); });
    req.on('end', () => {
      let payload: unknown = {};
      try { payload = JSON.parse(raw || '{}'); } catch { /* invalid payload */ }
      void send(payload).then(({ status, body }) => { res.statusCode = status; res.end(JSON.stringify(body)); });
    });
  };
  return {
    name: 'caa-mail-dev',
    configureServer(server) {
      server.middlewares.use('/api/subscribe', relay(async (payload) => sendSubscription(String((payload as { email?: string })?.email ?? ''))));
      server.middlewares.use('/api/acquire', relay((payload) => sendAcquisition(payload)));
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  if (env.RESEND_API_KEY) process.env.RESEND_API_KEY = env.RESEND_API_KEY;
  if (env.RESEND_FROM) process.env.RESEND_FROM = env.RESEND_FROM;
  return {
    plugins: [react(), mailDev()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
