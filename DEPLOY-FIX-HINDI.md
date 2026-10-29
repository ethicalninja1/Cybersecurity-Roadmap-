# CSS fix / Vercel deployment

Aapke index.html mein `/assets/style.css` aur `/assets/roadmap.js` references hain. Sirf `index.html`, `style.css` aur `vercel.json` upload karne se assets missing ho jate hain.

**Is ZIP ke andar ki saari files aur folders** GitHub repository ke root mein upload karein. `assets/`, `api/`, `lib/`, `scripts/` folders preserve karein. Purane `style.css` root mein hone se problem solve nahi hoti; actual file `assets/style.css` mein honi chahiye.

Vercel Settings: Framework Other; Build Command override off; Root Directory repository root; Output Directory override off. Redeploy.

Check `/assets/style.css` aur `/assets/roadmap.js` directly browser mein. Dono mein actual source code aana chahiye, HTML nahi.

Admin backend requires Supabase and environment variables per README.md. Never commit passwords or service keys.
