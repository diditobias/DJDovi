# DJDovi

Professional DJ booking website for **DJDovi** — Johannesburg, South Africa.

Built with React, Vite, Tailwind CSS, Motion, and Lucide React. Hosted on Netlify with GitHub continuous deploy.

## Local development

```bash
npm install
cp .env.example .env
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

### Environment variables

Copy `.env.example` to `.env` and fill in:

| Variable | Purpose |
| --- | --- |
| `VITE_WHATSAPP_NUMBER` | Digits only, with country code (e.g. `2782…`). Enables **BOOK VIA WHATSAPP**. |
| `VITE_CONTACT_EMAIL` | Optional public email on the Contact section |
| `VITE_INSTAGRAM_URL` | Optional social link |
| `VITE_SOUNDCLOUD_URL` | Optional social / mixes link |
| `VITE_TIKTOK_URL` | Optional social link |

Never invent or commit a WhatsApp number. `.env` is gitignored.

For Netlify, add the same `VITE_*` values under **Site configuration → Environment variables**, then trigger a new deploy.

## Adding gallery photos

1. Drop image files into `public/images/gallery/` (JPG/PNG/WebP preferred for real photos).
2. Update the list in `src/data/content.js` (`galleryImages`).
3. Commit and push to `main` — Netlify rebuilds automatically.

## Booking system

### WhatsApp

The **BOOK VIA WHATSAPP** button validates the form and opens a pre-filled `wa.me` message using `VITE_WHATSAPP_NUMBER`.

### Email (Netlify Forms)

The **BOOK VIA EMAIL** button posts to Netlify Forms (`name="booking"`).

A hidden static form in `index.html` lets Netlify detect the form at build time (required for React SPAs).

#### Enable email notifications on Netlify

1. Deploy the site (connected to this GitHub repo).
2. Open **Forms** in the Netlify site dashboard — you should see a `booking` form after the first successful deploy.
3. Go to **Forms → Form notifications**.
4. Add an **Email notification** for the `booking` form.
5. Enter the inbox that should receive booking enquiries.
6. Submit a test booking from the live site.

Spam protection uses Netlify’s honeypot field (`bot-field`).

## GitHub

```bash
git init
git add .
git commit -m "Initial DJDovi website"
gh auth login
gh repo create DJDovi --private --source=. --remote=origin --push
```

Or create the repo in the GitHub UI, then:

```bash
git remote add origin https://github.com/<YOUR_USERNAME>/DJDovi.git
git branch -M main
git push -u origin main
```

## Netlify

1. Log in at [app.netlify.com](https://app.netlify.com).
2. **Add new site → Import an existing project**.
3. Connect GitHub and select the `DJDovi` repository.
4. Build settings (also in `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add `VITE_WHATSAPP_NUMBER` (and optional vars) in Netlify environment settings.
6. Deploy. Subsequent pushes to `main` update the live site.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Local Vite server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
