# Ethical Ninja — Vercel Edition 2027

Static HTML/CSS/JS frontend + Vercel Node.js API + Supabase database. PHP is no longer required.

## Deployment
1. Create a Supabase project. In SQL Editor run `supabase.sql`.
2. In a secure terminal run `node scripts/hash-password.mjs "YOUR_NEW_UNIQUE_PASSWORD"` (minimum 12 characters). Copy the generated environment values. Never commit credentials.
3. Set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_USERNAME`, `ADMIN_PASSWORD_SALT`, `ADMIN_PASSWORD_HASH`, and `SESSION_SECRET` in Vercel Project Settings → Environment Variables. Use `ADMIN_USERNAME=Ethicalninja`. Do not use the password previously shared in chat.
4. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY locally and run `node scripts/seed.mjs` once. Alternatively seed using a protected backend script.
5. Push the CONTENTS of this folder to GitHub repository root. In Vercel set Framework Preset `Other`, Root Directory `./`, Build Command override OFF, Output Directory override OFF, and remove `ng build`. Redeploy.
6. Visit `/admin.html` to log in and edit JSON. Changes persist in Supabase. Homepage fetches published data from `/api/roadmap`.

## Security notes
- Server-only service role key; RLS enabled; HttpOnly Secure SameSite cookie with HMAC signature, eight-hour expiry; Origin check for writes; scrypt password hashing.
- In-memory login throttling is best effort on serverless and **not sufficient** against distributed attacks. Enable Vercel Firewall/WAF rate limits for `/api/admin?action=login`, plus bot protection.
- Use Vercel HTTPS and restrict Supabase credentials. Rotate compromised secrets. No public signup is implemented.
- Initial static HTML includes bundled roadmap as a fallback. If database is unavailable, published edits will not be reflected until connectivity returns.
- The admin edits structured JSON, not a visual rich-text editor.
