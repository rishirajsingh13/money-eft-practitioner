# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Primary: Indian adults (mostly women, roughly 28 to 55) arriving from Meta ads and webinars on a phone, who want a practical skill they can use with other people: life coaches, healers (energy, pranic, tarot), therapists and counsellors, trainers, and people looking for a second income or a career switch.

Secondary, and currently the majority of webinar arrivals: people carrying their own money stress (debts, EMIs, no savings, guilt about charging) who want relief for themselves first. The page keeps them through a bridge (Day 1 is for your own money story, Day 2 is for your clients) instead of selling to that pain directly.

## Product Purpose
A 2-day LIVE Zoom workshop (3 hours a day) with Sonal Wadhwa that teaches Money EFT tapping well enough to run 1-on-1 sessions for others, plus the basics of turning it into a practice. Entry price ₹199 (regular ₹999), with bonuses. Success for the page: more buyers whose reason for joining is "become a practitioner", without losing overall purchase rate.

## Positioning
Practitioner-first with a bridge. The workshop combines three things most offers split apart: the EFT skill, a high-demand niche (money stress), and the practitioner path (sessions, pricing, first clients). The visitor is the healer, not the patient; money pain appears as what their future clients face.

## Operating Context
- Traffic: paid Meta ads and webinar follow-ups; mobile is the primary device.
- Checkout: external payment page (https://live.sonalwadhwa.com/payment-secure-page). After payment, buyers join a private WhatsApp group where Zoom links and bonuses are shared.
- Delivery: live only, no recordings.
- Event date, time, price and checkout URL are injected at build time by build.js from Vercel environment variables via `data-webinar` and `data-webinar-link` attributes.

## Capabilities and Constraints
- Static HTML/CSS/vanilla JS, built by build.js, deployed on Vercel (`vercel --prod`; git push does not auto-deploy).
- `data-webinar="..."` elements must stay leaf elements; `data-webinar-link` must come before `href` on CTA anchors.
- Hero must not mention "Certification". H1 stays "Master Money EFT Tapping, 2-Day LIVE Hands-On Workshop". Subhead max 2 lines. No top urgency bar.
- CTA label: "I Want to Become a Practitioner" (one label for every checkout CTA).
- The 15-minute session countdown timer stays as built.
- The certificate is Sonal's own program, not an international accreditation. No income guarantees.

## Brand Commitments
- Mentor: Sonal Wadhwa, EFT Tapping and Money Mindset Coach; author of *One Hundred Percent*; former Fortune 500 business process consultant (EY, KPMG, PwC, Atos).
- Voice: warm, plain, direct, honest about limits. Simple English.
- Visual direction pinned by the owner for v2: Navy + Saffron palette.
- Standing preference (owner, after rejecting a bespoke 'appointment book' concept as unrelatable): v2 follows the category-standard Indian webinar/workshop landing page, executed well. Use the real photos, bonus boxes and testimonial posters, with emoji-style badges and sticker labels. No invented visual metaphors.

## Evidence on Hand
- "4.9/5 from 1,200+ trained practitioners" (confirmed accurate by the owner).
- WhatsApp and review screenshots: images/t1-t4, images/WhatsApp-Image-2026-09-28-*, images/Testimonial*.webp.
- Bonus box images (images/Bonus*.webp, Bonus-stack), hero poster (images/Hero-Section*.webp), about photo (images/about*.webp, has text baked in).
- Not on hand: named practitioner success stories (students now running sessions), photos of Sonal teaching, a certificate sample, verified session-price data. Do not fabricate these; use labelled placeholder slots.

## Product Principles
1. The visitor is the future practitioner; money pain is their clients' problem and their opportunity.
2. Honesty sells here: state what the certificate is, never promise income.
3. One decision per screen on mobile, with the action reachable by thumb.
4. Concrete over mystical: show what a session looks like, not jargon.
5. Respect the ₹199 buyer: no fake scarcity beyond the existing timer, no inflated claims.

## Accessibility & Inclusion
Mobile-first for mid-range Android phones on variable connections: WCAG AA contrast, 44px tap targets, text at least 13px, fast LCP.
