# Money EFT Practitioner — 2-Day LIVE Workshop

Landing page for the **Money EFT Practitioner Certification — 2-Day LIVE Workshop** (17–18th October, 12–3 PM IST) by Sonal Wadhwa.

## Features
- **High-Converting Responsive Layout**: Designed with a luxury emerald-gold palette, glassmorphic elevations, and mobile-first ergonomics.
- **Client-Side Urgency Countdown**: 15-minute rolling countdown timer persisted in `sessionStorage` per visitor session, preventing loss on page reload and auto-extending gracefully upon expiration.
- **Dynamic Curriculum Presentation**: Full 2-day roadmap (3 hours each day) covering foundations, somatic meridian points, custom scripting, live session delivery, and monetization launch.
- **Interactive Testimonials Carousel & Lightbox**: Expandable high-res proof of client breakthroughs and student wins.
- **Accordion FAQ**: 10 essential questions answered cleanly with accessible expand/collapse state.
- **Sticky Conversion Bar**: Bottom floating CTA bar with live price, countdown timer, and quick registration access.
- **Vercel & Production Ready**: Static zero-dependency build ready for instant deployment.

## Deployment to Vercel
You can deploy this repository directly on Vercel:
1. Push to GitHub (`rishirajsingh13/money-eft-practitioner`).
2. Import repository in [Vercel](https://vercel.com).
3. Framework Preset: **Other** / Static HTML.
4. Deploy!

## Updating Date, Time & Price from Vercel

You can change the workshop date, time, and pricing directly from your Vercel Dashboard without touching any code:

1. Go to your project on **[Vercel Dashboard](https://vercel.com)**.
2. Navigate to **Settings** → **Environment Variables**.
3. Add or edit the following variables:
   - `EVENT_DATE`: e.g. `24–25th October` or `7–8th November`
   - `EVENT_TIME`: e.g. `12–3 PM` or `12:00 PM – 3:00 PM IST`
   - `EVENT_PRICE`: e.g. `199` or `299`
   - `EVENT_ORIGINAL_PRICE`: e.g. `999` or `1499`
   - *(Optional)* `EVENT_PAYMENT_URL`: e.g. `https://live.sonalwadhwa.com/payment-secure-page`
4. Click **Save** and trigger a **Redeploy** (or push a commit) to apply changes.

### Local Development
To test locally:
1. Copy or edit `.env`:
   ```bash
   cp .env.example .env
   ```
2. Run the build script to update static config:
   ```bash
   npm run build
   ```

