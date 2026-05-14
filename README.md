# Spotsylvania Rugby Football Club — Website

Founding interest landing page for Spotsylvania RFC. Built with [Astro](https://astro.build) — static, fast, and easy to deploy.

---

## Running locally

```bash
npm install
npm run dev
```

The dev server starts at **http://localhost:5000**.

---

## Project structure

```
/
├── public/
│   └── assets/
│       └── spotsylvania-rfc-crest.png   ← club crest (transparent PNG)
├── src/
│   ├── components/
│   │   ├── Header.astro                 ← fixed top nav
│   │   ├── Hero.astro                   ← full-viewport hero section
│   │   ├── Pillars.astro                ← "Why Build It" vision section
│   │   ├── StripeQuote.astro            ← full-width quote banner
│   │   ├── InterestSection.astro        ← "The First Test" info section
│   │   ├── RegistrationForm.astro       ← founding list sign-up form
│   │   └── Footer.astro                 ← site footer
│   ├── layouts/
│   │   └── BaseLayout.astro             ← HTML shell, SEO meta, fonts
│   ├── pages/
│   │   └── index.astro                  ← main page (assembles components)
│   └── styles/
│       └── global.css                   ← all site styles
├── astro.config.mjs
└── package.json
```

---

## Updating the logo

Replace `public/assets/spotsylvania-rfc-crest.png` with a new transparent PNG. The image is referenced in `src/components/Hero.astro`.

---

## Connecting the form

The form in `src/components/RegistrationForm.astro` is ready to connect to any simple form provider. Look for the `TODO` comments in that file for step-by-step instructions.

**Supported options (all free tiers available):**

| Provider | Notes |
|----------|-------|
| [Formspree](https://formspree.io) | Set `action="https://formspree.io/f/YOUR_ID"` and `method="POST"` |
| [Tally](https://tally.so) | Embed a Tally iframe or use their webhook |
| [Netlify Forms](https://docs.netlify.com/forms/setup/) | Add `netlify` attribute to `<form>` tag, deploy to Netlify |

---

## Building for production

```bash
npm run build
```

Output goes to `dist/`. Deploy that folder to any static host:

- **Netlify** — drag and drop the `dist/` folder or connect your repo
- **Vercel** — `vercel` CLI or connect your repo, set framework to Astro
- **GitHub Pages** — push `dist/` or use the Astro GitHub Actions workflow
- **Cloudflare Pages** — connect repo, build command `npm run build`, output dir `dist`

---

## SEO

Edit the meta values in `src/layouts/BaseLayout.astro`. The canonical URL and `og:url` placeholders are commented out — uncomment and fill in your domain once the site is live.

---

## Phase 2 ideas (not built yet)

- Match schedule and results
- Player registration with Stripe payments
- Coach and volunteer directory
- Sponsor recognition page
- Supabase for storing registrations
