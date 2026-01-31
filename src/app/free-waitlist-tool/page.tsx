import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Free Waitlist Tool — Launch with a Viral Waitlist | WaitlistQ',
  description: 'Create a free waitlist for your product launch. Built-in referral tracking, embeddable widget, real-time analytics, and CSV export. No credit card required.',
  keywords: ['free waitlist tool', 'waitlist software free', 'free waitlist builder', 'product launch waitlist', 'waitlist widget free', 'waitlist signup tool'],
  alternates: {
    canonical: '/free-waitlist-tool',
  },
  openGraph: {
    title: 'Free Waitlist Tool | WaitlistQ',
    description: 'Create a viral waitlist for your product launch — free. Referral tracking, analytics, and embeddable widget included.',
    type: 'website',
    images: ['/og-image.png'],
  },
};

const faqs = [
  {
    question: 'Is WaitlistQ really free?',
    answer: 'Yes! The free plan includes 1 waitlist with up to 100 signups, basic analytics, an embeddable widget, CSV export, and a public waitlist page. No credit card required. Upgrade to Pro ($19/mo) for unlimited waitlists, unlimited signups, advanced analytics, and priority support.',
  },
  {
    question: 'How do I add a waitlist to my website?',
    answer: 'WaitlistQ gives you an embeddable widget — a small code snippet you paste into your HTML. It creates a beautiful signup form that matches your site. You also get a hosted public waitlist page at waitlistq.vercel.app/w/your-slug that you can share anywhere.',
  },
  {
    question: 'Does the free waitlist tool include referral tracking?',
    answer: 'Yes! Every person who joins your waitlist gets a unique referral link. When their friends sign up using that link, the referrer moves up in the queue. This viral loop is built into every WaitlistQ waitlist, including the free plan.',
  },
  {
    question: 'Can I export my waitlist data?',
    answer: 'Absolutely. You can export your entire waitlist as a CSV file at any time — emails, referral counts, signup dates, and position. Your data is yours. No lock-in.',
  },
  {
    question: 'How does WaitlistQ compare to Waitlist.me or LaunchList?',
    answer: 'WaitlistQ is purpose-built for product launches with viral growth. Unlike generic queue tools, WaitlistQ includes referral tracking, position-based urgency, milestone notifications, and weekly digests — all designed to keep your audience engaged before launch.',
  },
  {
    question: 'Do I need a developer to set it up?',
    answer: 'No. Create your waitlist in under 2 minutes, customize the branding, and copy-paste the widget code. If you can edit HTML, you can use WaitlistQ. No coding knowledge needed beyond that.',
  },
  {
    question: 'What happens after I launch my product?',
    answer: 'Export your waitlist to your email marketing tool (Mailchimp, ConvertKit, etc.) and send your launch announcement. WaitlistQ also supports invite-style launches where you onboard users in batches based on their waitlist position.',
  },
];

const competitors = [
  { feature: 'Free tier', waitlistq: '✅ 100 signups', launchlist: '✅ 100 signups', getwaitlist: '✅ 75 signups' },
  { feature: 'Referral tracking', waitlistq: '✅ Built-in', launchlist: '✅ Built-in', getwaitlist: '✅ Built-in' },
  { feature: 'Embeddable widget', waitlistq: '✅ Free', launchlist: '💰 Paid', getwaitlist: '✅ Free' },
  { feature: 'Public waitlist page', waitlistq: '✅ Free', launchlist: '✅ Free', getwaitlist: '✅ Free' },
  { feature: 'CSV export', waitlistq: '✅ Free', launchlist: '✅ Free', getwaitlist: '💰 Paid' },
  { feature: 'Weekly digest emails', waitlistq: '✅ Built-in', launchlist: '❌', getwaitlist: '❌' },
  { feature: 'Milestone notifications', waitlistq: '✅ Built-in', launchlist: '❌', getwaitlist: '❌' },
  { feature: 'Expiry warnings', waitlistq: '✅ Built-in', launchlist: '❌', getwaitlist: '❌' },
  { feature: 'Pro price', waitlistq: '$19/mo', launchlist: '$29/mo', getwaitlist: '$15/mo' },
];

export default function FreeWaitlistToolPage() {
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
    name: 'WaitlistQ — Free Waitlist Tool',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: 'Free waitlist tool with referral tracking, embeddable widget, and real-time analytics for product launches.',
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-purple-100/60 blur-3xl" />
        </div>
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 text-sm text-purple-700">
            <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
            Free forever — up to 100 signups
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl text-balance">
            Free Waitlist Tool for{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Product Launches</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600 text-balance">
            Build hype before you launch. WaitlistQ gives you a viral waitlist with built-in referral tracking,
            real-time analytics, and a beautiful embeddable widget — completely free.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/login" className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-200 hover:from-indigo-700 hover:to-purple-700 transition-all">
              Create Your Waitlist — Free
            </Link>
            <Link href="#features" className="w-full sm:w-auto rounded-xl border border-gray-200 bg-white px-8 py-3.5 text-base font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              See Features ↓
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500">No credit card • 2-minute setup • Free referral tracking</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24 border-t border-gray-100">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Launch a waitlist in 3 steps</h2>
            <p className="mt-4 text-lg text-gray-600">No coding required. Go from zero to collecting signups in under 2 minutes.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: '1', icon: '✨', title: 'Create Your Waitlist', desc: 'Name it, add a description, customize the branding. WaitlistQ generates a public page and a unique embed code instantly.' },
              { step: '2', icon: '📋', title: 'Share & Embed', desc: 'Paste the widget on your landing page or share the public waitlist URL on social media. Signups start flowing in.' },
              { step: '3', icon: '🚀', title: 'Watch It Grow', desc: 'Every signup gets a referral link. Friends who join move the referrer up. Your waitlist grows itself through word of mouth.' },
            ].map((item) => (
              <div key={item.step} className="relative rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-2xl">{item.icon}</div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-purple-600">Step {item.step}</div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Everything you need — free</h2>
            <p className="mt-4 text-lg text-gray-600">WaitlistQ packs enterprise features into a free tool</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: '🔗', title: 'Viral Referral Engine', desc: 'Every signup gets a unique referral link. Referred friends move the referrer up the queue. Growth on autopilot.' },
              { icon: '📊', title: 'Real-Time Analytics', desc: 'Track signups, referrals, conversion rates, and daily trends. Know exactly how your launch is building momentum.' },
              { icon: '🧩', title: 'Embeddable Widget', desc: 'Drop a code snippet on any website. Beautiful, responsive, customizable. Works with any platform or builder.' },
              { icon: '📧', title: 'Weekly Digests', desc: 'Keep subscribers engaged with automated weekly emails showing their position, referral count, and waitlist growth.' },
              { icon: '🏆', title: 'Milestone Notifications', desc: 'Celebrate when your waitlist hits 100, 500, 1000 signups. Milestone emails keep the excitement alive.' },
              { icon: '⏰', title: 'Expiry Warnings', desc: 'Inactive subscribers get a gentle nudge before their spot expires. Reduce churn and keep your list engaged.' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-3 text-2xl">{item.icon}</div>
                <h3 className="mb-2 text-base font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">How WaitlistQ compares</h2>
            <p className="mt-4 text-lg text-gray-600">More retention features, lower price</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-4 text-sm font-semibold text-gray-600 border-b border-gray-200">Feature</th>
                  <th className="p-4 text-sm font-semibold text-purple-700 border-b border-gray-200 bg-purple-50/50">WaitlistQ</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 border-b border-gray-200">LaunchList</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 border-b border-gray-200">GetWaitlist</th>
                </tr>
              </thead>
              <tbody>
                {competitors.map((row) => (
                  <tr key={row.feature} className="border-b border-gray-100 last:border-b-0">
                    <td className="p-4 text-sm text-gray-700 font-medium">{row.feature}</td>
                    <td className="p-4 text-sm text-center bg-purple-50/30 font-medium text-gray-900">{row.waitlistq}</td>
                    <td className="p-4 text-sm text-center text-gray-500">{row.launchlist}</td>
                    <td className="p-4 text-sm text-center text-gray-500">{row.getwaitlist}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Perfect for any launch</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: '📱', title: 'SaaS Products', desc: 'Build anticipation for your new app. Gauge demand before writing a line of code.' },
              { icon: '🎮', title: 'Games & Apps', desc: 'Create buzz for your mobile game or consumer app with a referral-powered waitlist.' },
              { icon: '📦', title: 'Physical Products', desc: 'Launching a hardware product or CPG brand? Measure demand and collect early adopters.' },
              { icon: '📚', title: 'Courses & Content', desc: 'Build an audience for your course, newsletter, or content platform before it launches.' },
              { icon: '🏪', title: 'Marketplaces', desc: 'Collect supply and demand signups separately. Launch with both sides ready.' },
              { icon: '🎨', title: 'Creative Projects', desc: 'Kickstarter pre-launch, album drops, or art collections — build your list first.' },
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Start collecting signups today — free</h2>
          <p className="text-lg text-gray-600 mb-8">
            Your waitlist can be live in 2 minutes. Referral tracking included. No credit card needed.
          </p>
          <Link href="/login" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-indigo-200 hover:from-indigo-700 hover:to-purple-700 transition-all">
            Create Your Waitlist — Free →
          </Link>
          <p className="mt-3 text-sm text-gray-500">No credit card required</p>
        </div>
      </section>

      {/* Cross-links */}
      <section className="border-t border-gray-100 py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h3 className="text-center text-sm font-semibold uppercase tracking-wider text-gray-400 mb-6">More from WaitlistQ</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/viral-referral-waitlist" className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-gray-900 mb-1">Viral Referral Waitlist →</h4>
              <p className="text-sm text-gray-500">Turn every signup into a growth engine with referral tracking</p>
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
