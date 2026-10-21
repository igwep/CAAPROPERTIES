import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import notify from './api/notify';

// Local stand-in for the Vercel api/notify.ts function so the newsletter and
// acquisition mails work with `npm run dev`. The handler is the very same module
// the serverless function ships, so behaviour stays identical.
// Reads RESEND_API_KEY / RESEND_FROM from .env.local (vite.config.ts runs on the Node side only).
function mailDev(): Plugin {
  return {
    name: 'caa-mail-dev',
    configureServer(server) {
      server.middlewares.use('/api/notify', (req: any, res: any) => {
        res.setHeader('content-type', 'application/json');
        let raw = '';
        req.on('data', (chunk: string) => { raw += String(chunk); });
        req.on('end', () => {
          let body: unknown = {};
          try { body = JSON.parse(raw || '{}'); } catch { body = {}; }
          const shim = { status: (code: number) => ({ json: (payload: unknown) => { res.statusCode = code; res.end(JSON.stringify(payload)); } }) };
          void notify({ method: req.method, body }, shim);
        });
      });
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
