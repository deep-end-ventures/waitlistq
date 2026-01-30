# WaitlistQ 🚀

**Viral waitlists with built-in referral tracking.**

Create embeddable waitlist widgets where users share to move up the list. Perfect for product launches, beta signups, and early access campaigns.

## Features

- 🧩 **Embeddable Widget** — Drop a single script tag on any website
- 🔗 **Referral Engine** — Every signup gets a unique link. Sharing = moving up
- 📊 **Real-Time Analytics** — Signups, referrals, conversions, daily trends
- 📥 **CSV Export** — Download your waitlist anytime
- 📬 **Weekly Digest** — Growth stats delivered to founders every Monday
- 🏆 **Milestone Notifications** — "You moved up 5 spots!"
- ⏰ **Expiry Warnings** — Re-engage before waitlists close
- 🧪 **A/B Test Incentives** — Test different referral rewards

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Database:** Supabase (PostgreSQL + Auth)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
- **Cron:** Vercel Cron Jobs (digest, expiry, milestones)

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/deep-end-ventures/waitlistq.git
cd waitlistq
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in the SQL editor
3. Enable Email Auth in Authentication settings
4. Copy your project URL, anon key, and service role key

### 3. Configure Environment

```bash
cp .env.example .env.local
# Fill in your Supabase credentials
```

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Embed Widget

```html
<div id="waitlistq-widget"></div>
<script
  src="https://your-domain.vercel.app/widget/embed.js"
  data-waitlist-id="YOUR_WAITLIST_ID"
  data-slug="YOUR_WAITLIST_SLUG"
></script>
```

## 90-Day Retention Strategy

Built into the product:

1. **Weekly Digest Emails** (Mondays 9 AM) — New signups, total count, referral stats, top referrer
2. **Referral Milestones** (every 6 hours) — "You moved up X spots!" notifications
3. **Expiry Warnings** (daily at 10 AM) — 7-day and 1-day warnings before waitlist closes
4. **Dashboard Stickiness** — Analytics, trend charts, top referrers, embed code, CSV export

## Pricing

| Plan | Signups | Waitlists | Price |
|------|---------|-----------|-------|
| Free | 100 | 1 | $0/forever |
| Starter | 1,000 | 3 | $19/mo |
| Growth | 10,000 | 10 | $49/mo |
| Scale | Unlimited | Unlimited | $149/mo |

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/waitlist` | GET/POST | List/create waitlists (auth required) |
| `/api/waitlist/join` | POST | Join a waitlist (public) |
| `/api/waitlist/stats` | GET | Get waitlist statistics |
| `/api/waitlist/export` | GET | Export CSV (auth required) |
| `/api/widget` | GET | Get waitlist info for widget |
| `/api/cron/digest` | GET | Weekly digest (Vercel Cron) |
| `/api/cron/expiry` | GET | Expiry warnings (Vercel Cron) |
| `/api/cron/milestones` | GET | Milestone notifications (Vercel Cron) |

## License

MIT — A Deep End Ventures startup.
