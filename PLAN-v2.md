# Money EFT Practitioner - Landing Page v2 Plan

Status: plan only, nothing built. v1 (mobile rebuild) is live at money-eft-practitioner.vercel.app.

## 1. The problem v2 has to solve

People arrive at the webinar with **personal money problems** (debt, EMIs, no savings) and want relief for themselves. The offer is a **practitioner** workshop: learn to run Money EFT sessions for others, as a skill and a second income.

v1 makes the mismatch worse. Its first two screens talk about the visitor's own money pain: the subhead "clear money blocks", the "Does money feel like this?" checklist, and Sonal's personal before/after. That pulls in money-relief seekers. Two things follow:
- **Wrong buyers:** people buy at ₹199 expecting therapy, then feel misled on Day 2 when the content turns to clients and pricing. This hurts show-up, satisfaction and any back-end offer.
- **Lost buyers:** coaches, healers and career switchers, who are the people who should buy, see "money problems" and think the page isn't for them.

**Goal for v2:** the page should make a coach, healer or career switcher think "this is a skill I can use with people," while giving someone with money pain a clear bridge: "heal yours first, then help others."

## 2. Positioning (recommended)

**Lead with the identity, use money pain as the reason the skill sells.**

- Old frame: "Fix your money blocks with tapping."
- New frame: "Become the person people come to when money is breaking them. Learn Money EFT in 2 live days, use it on yourself first, then with clients."

How the page tells the story:
1. **Who you become.** A Money EFT Practitioner who can run a 1-on-1 tapping session.
2. **Why it matters.** Money stress is everywhere around you, people pay to fix it, and few practitioners specialise in it.
3. **How the 2 days get you there.** Day 1 you tap on your own money story. Day 2 you run sessions and learn to get clients.
4. **Proof it works.** Students who now run sessions, not only students who feel calmer.
5. **What you walk away with.** A practitioner kit: scripts, session flow, intake form, pricing guide and the certificate, labelled honestly.

Pain still appears, but in the **third person**: "Your clients, friends and family face this every day." The visitor is the healer, not the patient. Visitors with their own money pain can still see themselves in that list.

Qualifying line near the top: "Best for coaches, healers, therapists and anyone ready to help others. You'll heal your own money story along the way."

## 3. Copy direction

Draft lines to test. These are not final.

**Hero (2-line subhead rule kept, no "Certification" in the hero):**
- H1 (fixed): Master Money EFT Tapping, 2-Day LIVE Hands-On Workshop
- Eyebrow or pill, choose one: "For coaches, healers and career switchers"
- Subhead options:
  - A: "Learn to run Money EFT sessions that help people out of debt stress and scarcity, and turn it into a practice."
  - B: "Tap through your own money blocks on Day 1. Run your first client session on Day 2."
- CTA: "I Want to Become a Practitioner" (same label everywhere)

**Section headline candidates:**
- Opportunity: "Everyone around you is stressed about money. Very few people know how to help."
- Path: "Day 1 is for you. Day 2 is for your clients."
- Kit: "Everything you need to run your first paid session"
- Proof: "From students to practitioners"
- Qualifier: "Is this for you?", with a clear yes list and a short "not for you if" list
- Honest note: "A certificate from Sonal's own program, not an international accreditation"

**Copy rules for v2:**
- Visitor = healer: "your clients", "the people who come to you".
- Plain language. No "meridian calibration", "9-gamut" or "somatic architecture" above the curriculum.
- Specific outcomes over adjectives: "run a 20-minute session" beats "transformational breakthroughs".
- No income promises (keep the FAQ honesty), but show the path to earning: packaging, pricing basics, first clients.
- Zero em-dashes in visible copy. No section eyebrows. No emoji as icons.

## 4. Page structure (mobile-first)

| # | Section | Job | Layout (each type used only once) |
|---|---|---|---|
| 1 | Hero | Identity + CTA on the first screen | Text stack, then a practitioner image, then CTA and price line |
| 2 | Who it's for | Qualify within 2 screens | Two columns of "yes" and "not for you if" |
| 3 | The opportunity | Money pain as market need, in the third person | Full-width tinted band, 3 short facts, no cards |
| 4 | The 2-day path | Day 1 you, Day 2 clients, after: practice | Vertical timeline with 3 steps |
| 5 | What a session looks like | Make the skill concrete | 4-step session flow (intake, rating, tapping rounds, re-rating) as a scroll-snap row |
| 6 | Practitioner proof | Students running sessions | Large quote cards plus the existing WhatsApp rail |
| 7 | Practitioner kit + bonuses | Tools you leave with, valued honestly | Bento: 1 large + 4 small tiles, with real box images |
| 8 | Mentor | Credibility | Split layout: portrait + 3 credentials |
| 9 | Pricing | Single decision | One card, stack, price, CTA, what happens next |
| 10 | FAQ | Practitioner objections | Accordion |
| 11 | Final CTA | Close | Centred, one line + button |

**New FAQ items:**
- Do I need clients already?
- Can I practise on friends and family first?
- How do practitioners usually charge?
- What if I mainly want to fix my own money?
- What exactly is the certificate?

The sticky bottom bar stays, as in v1: it appears after the hero CTA and hides over pricing.

## 5. Design language

The current look (white, emerald, amber, rose, Montserrat) reads as a generic course funnel. v2 should feel like a **professional training for a respected practice**: calm, credible, warm, not hype.

**Three palette directions** (pick one in the shape step):

| Direction | Base | Primary | Accent | Feel |
|---|---|---|---|---|
| A. Deep Teal + Coral (recommended) | Off-white #F7F8F7, ink #12201F | Teal #0F5F5C | Coral #E8664A for CTAs | Calm practice, warm action, clearly different from v1 |
| B. Ink Navy + Saffron | Near-white #F8F8FB, navy #141B34 | Navy | Saffron #F2A33A | Indian warmth, authority, high contrast |
| C. Forest + Amber | White, forest #1E3B2F | Forest | Amber #D98E04 | Closest to v1, lowest risk, least fresh |

Rules for any direction:
- One CTA colour, used only for CTAs.
- One urgency colour, used only for the timer.
- All text at least 4.5:1 contrast.

**Typography:**
- Replace Montserrat with a self-hosted sans that has more character: General Sans or Satoshi (both free from Fontshare) for display, the same family for body.
- Tighter display sizes on mobile (28-32px H1). Body at 16px.

**Visual system:**
- Real photography of Sonal teaching or in session, not only the current poster-style hero graphic.
- One illustrated motif: the tapping points, drawn once as a proper asset and reused in the session-flow section.
- Radius system: 12px buttons, 20px panels. Fewer boxes: group with spacing and tinted bands instead of a card in every section.
- One authored motion moment, the timeline drawing in on scroll, plus button press feedback. All motion respects reduced-motion settings.

## 6. Assets needed from you

1. **Practitioner proof:** 3-6 students who now run sessions (name, city, a 1-line quote, photo or WhatsApp screenshot). This matters most for conversion.
2. **Photos:** Sonal teaching on Zoom or running a session (2-3 shots), plus a clean portrait without baked-in text.
3. **Numbers you can stand behind:** students trained, sessions run, workshops held. The current "4.9/5 from 1,200+" needs a source, or it should come out.
4. **Practitioner kit contents:** what is actually given (session script, intake form, pricing guide). Only list what exists.
5. **Certificate:** a sample image of what students receive.

## 7. Build approach

1. `/impeccable init`: write PRODUCT.md (audience = aspiring practitioners, honesty constraints, brand truths).
2. `/impeccable shape`: lock positioning, the section list and the palette choice. Produce 2-3 hero design mocks to choose from.
3. Build v2 as a **separate route** (`/v2/index.html`), reusing build.js variables and the `data-webinar` contract. v1 stays live.
4. Verify: mobile at 360/390 plus desktop, the design checks (target 0 warnings), Lighthouse mobile LCP under 2.5s.
5. **A/B test:** split Meta ad traffic 50/50 between `/` and `/v2/` for at least 1 week, or about 1,000 landing-page views per variant.

## 8. How we'll know it worked

| Metric | Where | Why |
|---|---|---|
| Landing page view → checkout click | Meta Pixel `InitiateCheckout` on CTA click (add) | Top-of-page persuasion |
| Checkout → purchase | Payment page | Offer clarity |
| **Buyer intent mix** | One question after purchase or in the WhatsApp group: "Why did you join? Fix my own money / Become a practitioner / Both" | The real target: more practitioner-intent buyers |
| Day 2 attendance | Zoom | Right-fit buyers stay |
| Back-end conversion | Next offer | Practitioner buyers are worth more |

Success means v2 matches v1 on purchase rate **and** clearly raises the practitioner-intent share. If v2 converts lower at the top but brings better-fit buyers, that is likely a win; judge it on back-end revenue, not ₹199 sales alone.

Outside the page: the Meta ad creatives and the webinar pitch need the same practitioner framing. If the ads promise money relief, the page can only fix part of the problem.

## 9. Decisions for you

1. Positioning: practitioner-first with a "heal yours first" bridge (recommended), or practitioner-only?
2. Palette: A (Teal + Coral), B (Navy + Saffron) or C (Forest + Amber)?
3. Font change away from Montserrat: yes or no?
4. Is "Certified" allowed outside the hero (pricing, FAQ, footer), given the certificate is Sonal's own and not accredited?
5. Who sends the practitioner proof and photos, and by when?
6. A/B test on a `/v2/` route, or replace v1 outright?
