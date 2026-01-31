import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Viral Referral Waitlist — Turn Signups Into Growth | WaitlistQ',
  description: 'Create a waitlist with built-in referral tracking. Every signup gets a unique referral link. Friends who join move the referrer up the queue. Viral growth on autopilot.',
  keywords: ['viral referral waitlist', 'waitlist referral system', 'referral waitlist tool', 'viral waitlist', 'waitlist with referrals', 'referral queue', 'growth waitlist'],
  alternates: {
    canonical: '/viral-referral-waitlist',
  },
  openGraph: {
    title: 'Viral Referral Waitlist | WaitlistQ',
    description: 'Turn every waitlist signup into a growth engine with built-in referral tracking.',
    type: 'website',
    images: ['/og-image.png'],
  },
};

const faqs = [
  {
    question: 'How does the referral waitlist work?',
    answer: 'When someone joins your waitlist, they get a unique referral link. If they share that link and a friend signs up through it, the referrer moves up in the queue. The more friends they refer, the higher their position. This creates a natural viral loop where your subscribers actively promote your launch.',
  },
  {
    question: 'Do referrals move people ahead of non-referrers?',
    answer: 'Yes. Each successful referral bumps the referrer up a set number of positions (configurable by you). Someone who refers 5 friends will be significantly higher in the queue than someone who just signed up. This incentivizes sharing without penalizing early adopters unfairly.',
  },
  {
    question: 'Can people game the referral system?',
    answer: 'WaitlistQ has built-in fraud detection: duplicate email blocking, IP-based rate limiting, and disposable email detection. If someone tries to create fake signups to move up, the system catches it. You can also review and manually adjust positions.',
  },
  {
    question: 'What kind of viral growth can I expect?',
    answer: 'Results vary by product and audience, but well-positioned referral waitlists typically see a 20-40% viral coefficient — meaning for every 10 signups, 2-4 come from referrals. Some launches have seen coefficients above 1.0, where the waitlist grows exponentially.',
  },
  {
    question: 'Can I customize the referral rewards?',
    answer: 'On the Pro plan, you can configure how many positions each referral is worth, set maximum referral bonuses, and even create tiers (e.g., 3 referrals = early access, 10 referrals = founding member). The free plan uses default settings optimized for most launches.',
  },
  {
    question: 'Do I get analytics on referral performance?',
    answer: 'Yes. WaitlistQ tracks referral chains, shows you who your top referrers are, calculates your viral coefficient, and displays referral source breakdown. You can see exactly how your waitlist is growing organically.',
  },
  {
    question: 'Is the referral system available on the free plan?',
    answer: 'Yes! Referral tracking is core to WaitlistQ and available on all plans, including free. The free plan includes up to 100 signups with full referral tracking. Pro adds unlimited signups and advanced customization.',
  },
];

export default function ViralReferralWaitlistPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'WaitlistQ — Viral Referral Waitlist',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: 'Create a viral referral waitlist for your product launch. Built-in referral tracking turns every signup into a growth engine.',
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-indigo-100/60 blur-3xl" />
        </div>
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm text-indigo-700">
            <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            Turn every signup into a growth engine
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl text-balance">
            Viral Referral{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Waitlist</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600 text-balance">
            Your subscribers don&apos;t just wait — they recruit. WaitlistQ gives every signup a unique
            referral link that moves them up the queue when friends join. Viral growth, built in.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/login" className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-200 hover:from-indigo-700 hover:to-purple-700 transition-all">
              Create Referral Waitlist — Free
            </Link>
            <Link href="#how-it-works" className="w-full sm:w-auto rounded-xl border border-gray-200 bg-white px-8 py-3.5 text-base font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              See How It Works ↓
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500">Free referral tracking • No credit card • 2-minute setup</p>
        </div>
      </section>

      {/* The Viral Loop */}
      <section id="how-it-works" className="py-16 sm:py-24 border-t border-gray-100">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">The referral flywheel</h2>
            <p className="mt-4 text-lg text-gray-600">Every step creates more growth. Here&apos;s the loop:</p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { num: '1', icon: '📝', title: 'Someone Signs Up', desc: 'A visitor joins your waitlist and sees their position (#247 in line).' },
              { num: '2', icon: '🔗', title: 'Gets a Referral Link', desc: 'They receive a unique link: waitlistq.com/w/your-app?ref=abc123.' },
              { num: '3', icon: '📤', title: 'Shares With Friends', desc: 'Motivated to move up, they share on Twitter, Discord, or DMs.' },
              { num: '4', icon: '🚀', title: 'Moves Up the Queue', desc: 'Each friend who joins bumps them up. Now they\'re #189. More sharing!' },
            ].map((item) => (
              <div key={item.num} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div className="mb-1 text-xs font-bold text-indigo-600">STEP {item.num}</div>
                <h3 className="mb-2 text-sm font-semibold text-gray-900">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <div className="rounded-full bg-indigo-50 border border-indigo-200 px-6 py-2 text-sm text-indigo-700 font-medium">
              🔄 The cycle repeats — each new signup starts sharing too
            </div>
          </div>
        </div>
      </section>

      {/* Why Referrals Work */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Why referral waitlists outperform</h2>
            <p className="mt-4 text-lg text-gray-600">The psychology behind viral growth</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              { icon: '🏆', title: 'Position Incentive', desc: 'People hate being far back in line. The ability to move up by referring friends creates a powerful motivation loop. It\'s gamification meets FOMO.' },
              { icon: '🤝', title: 'Social Proof', desc: '"I\'m on the waitlist for this cool new thing" is a status signal. Referral links give people an excuse to share something they\'re already excited about.' },
              { icon: '📈', title: 'Compound Growth', desc: 'Each referral brings in someone who also has a referral link. With a viral coefficient above 0.5, your waitlist grows significantly faster than linear signups.' },
              { icon: '🎯', title: 'Qualified Leads', desc: 'Referred signups convert 2-3x better than cold traffic. When a friend recommends something, trust is pre-built. Your waitlist fills with high-intent users.' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <div className="text-2xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Built-in referral analytics</h2>
            <p className="mt-4 text-lg text-gray-600">Track exactly how your waitlist grows virally</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { metric: 'Viral Coefficient', desc: 'How many new signups each subscriber generates' },
              { metric: 'Top Referrers', desc: 'Leaderboard of your most active promoters' },
              { metric: 'Referral Chains', desc: 'See how referrals cascade through networks' },
              { metric: 'Source Breakdown', desc: 'Where referral traffic comes from (Twitter, email, etc.)' },
            ].map((item) => (
              <div key={item.metric} className="rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.metric}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Retention Features */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Keep subscribers engaged while they wait</h2>
            <p className="mt-4 text-lg text-gray-600">A referral waitlist is only as good as its retention</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: '📧', title: 'Weekly Digests', desc: 'Automated emails showing position changes, referral progress, and waitlist milestones. Keeps subscribers coming back to share more.' },
              { icon: '🏅', title: 'Milestone Alerts', desc: 'Celebrate when your waitlist hits 100, 500, 1K signups. Milestone notifications create FOMO and urgency to share.' },
              { icon: '⏰', title: 'Expiry Warnings', desc: 'Inactive subscribers get a nudge before their spot expires. Re-engage dormant users and keep your list healthy.' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-3 text-2xl">{item.icon}</div>
                <h3 className="mb-2 text-base font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Launch with a waitlist that grows itself</h2>
          <p className="text-lg text-gray-600 mb-8">
            Referral tracking is free. No credit card. Set up in 2 minutes.
          </p>
          <Link href="/login" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-indigo-200 hover:from-indigo-700 hover:to-purple-700 transition-all">
            Create Referral Waitlist — Free →
          </Link>
          <p className="mt-3 text-sm text-gray-500">No credit card required</p>
        </div>
      </section>

      {/* Cross-links */}
      <section className="border-t border-gray-100 py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h3 className="text-center text-sm font-semibold uppercase tracking-wider text-gray-400 mb-6">More from WaitlistQ</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/free-waitlist-tool" className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-gray-900 mb-1">Free Waitlist Tool →</h4>
              <p className="text-sm text-gray-500">Everything you need to launch a waitlist — for free</p>
            </Link>
            <Link href="/pre-launch-landing-page" className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-gray-900 mb-1">Pre-Launch Landing Page →</h4>
              <p className="text-sm text-gray-500">Build a beautiful landing page with a waitlist in minutes</p>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
