import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Pre-Launch Landing Page with Waitlist — Validate Before You Build | WaitlistQ',
  description: 'Create a pre-launch landing page with a built-in waitlist in minutes. Validate demand, collect emails, and build hype with referral-powered signups. Free to start.',
  keywords: ['pre-launch landing page', 'launch waitlist', 'pre-launch page builder', 'coming soon page', 'landing page waitlist', 'validate product idea', 'pre-launch email collection'],
  alternates: {
    canonical: '/pre-launch-landing-page',
  },
  openGraph: {
    title: 'Pre-Launch Landing Page with Waitlist | WaitlistQ',
    description: 'Validate demand and build hype with a pre-launch landing page. Built-in waitlist with referral tracking.',
    type: 'website',
    images: ['/og-image.png'],
  },
};

const faqs = [
  {
    question: 'What is a pre-launch landing page?',
    answer: 'A pre-launch landing page is a single web page you put up before your product is ready. It explains what you\'re building, why it matters, and lets visitors join a waitlist to be notified at launch. It\'s the fastest way to validate demand — if people won\'t even sign up for a waitlist, they probably won\'t pay for the product.',
  },
  {
    question: 'Do I need to know how to code?',
    answer: 'No. WaitlistQ provides an embeddable widget you can add to any website — Webflow, WordPress, Squarespace, Carrd, or custom HTML. If you don\'t have a landing page yet, you can use WaitlistQ\'s hosted public page as your landing page. Share the URL directly.',
  },
  {
    question: 'How do I drive traffic to my pre-launch page?',
    answer: 'Start with your existing network: tweet about it, post on LinkedIn, share in relevant communities (Reddit, Discord, Slack groups). WaitlistQ\'s referral system amplifies this — each subscriber shares with their network, creating organic growth beyond your initial reach.',
  },
  {
    question: 'Can I use this to validate a product idea?',
    answer: 'Absolutely — that\'s one of the best use cases. Put up a landing page describing your idea, add a WaitlistQ widget, and drive some traffic. If you get signups, there\'s demand. If you don\'t, pivot early before writing code. It\'s the lean startup playbook.',
  },
  {
    question: 'When should I launch my pre-launch page?',
    answer: 'As early as possible. The best time is when you have a clear idea of what you\'re building but before the product is ready. 2-8 weeks before launch is the sweet spot — enough time to build a meaningful list, not so long that subscribers forget about you.',
  },
  {
    question: 'What happens to my waitlist after I launch?',
    answer: 'Export it as CSV and import into your email tool (Mailchimp, ConvertKit, Loops, etc.) to send your launch announcement. Or use WaitlistQ\'s invite system to grant access in batches — top of the waitlist gets in first, creating exclusivity.',
  },
  {
    question: 'How is this different from just using a Google Form?',
    answer: 'Google Forms collect emails. WaitlistQ builds a growth engine. With WaitlistQ you get: referral tracking that grows your list virally, position-based urgency that keeps subscribers engaged, weekly digest emails, milestone celebrations, analytics dashboard, embeddable widget, and a professional public page. All things a Google Form can\'t do.',
  },
];

const playbook = [
  { week: 'Week 1', title: 'Launch Your Page', tasks: ['Create your waitlist on WaitlistQ', 'Set up your landing page (or use the hosted page)', 'Write a compelling value proposition', 'Add the WaitlistQ widget'] },
  { week: 'Week 2', title: 'Seed Your List', tasks: ['Share on Twitter/X with a compelling thread', 'Post in 3-5 relevant communities', 'Tell friends and ask for shares', 'Send to your email contacts'] },
  { week: 'Week 3-4', title: 'Amplify Growth', tasks: ['Referral system kicks in — watch viral growth', 'Post updates about waitlist milestones', 'Engage with your subscribers', 'Collect feedback on what they want most'] },
  { week: 'Launch Day', title: 'Go Live', tasks: ['Export your waitlist to email tool', 'Send launch announcement', 'Invite top referrers first (VIP access)', 'Celebrate with your community'] },
];

export default function PreLaunchLandingPage() {
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
    name: 'WaitlistQ — Pre-Launch Landing Page',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: 'Create a pre-launch landing page with a built-in viral waitlist. Validate demand and collect emails before you build.',
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-orange-100/40 blur-3xl" />
        </div>
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-sm text-orange-700">
            <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
            Validate before you build
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl text-balance">
            Pre-Launch Landing Page with{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Built-In Waitlist</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600 text-balance">
            Don&apos;t build in the dark. Put up a landing page, collect signups, and prove demand before
            you write a single line of code. WaitlistQ makes it dead simple.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/login" className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-200 hover:from-indigo-700 hover:to-purple-700 transition-all">
              Create Pre-Launch Page — Free
            </Link>
            <Link href="#playbook" className="w-full sm:w-auto rounded-xl border border-gray-200 bg-white px-8 py-3.5 text-base font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              See the Playbook ↓
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500">No credit card • Hosted page included • Referral tracking free</p>
        </div>
      </section>

      {/* Why Pre-Launch */}
      <section className="py-16 sm:py-24 border-t border-gray-100">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Why you need a pre-launch page</h2>
            <p className="mt-4 text-lg text-gray-600">The smartest founders validate before they build</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-red-100 bg-red-50/50 p-6">
              <div className="text-2xl mb-3">❌</div>
              <h3 className="font-semibold text-gray-900 mb-2">Without pre-launch</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Spend months building in secret</li>
                <li>• Launch to crickets — zero audience</li>
                <li>• Discover nobody wanted this</li>
                <li>• Scramble to find users from scratch</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-green-100 bg-green-50/50 p-6">
              <div className="text-2xl mb-3">✅</div>
              <h3 className="font-semibold text-gray-900 mb-2">With pre-launch page</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Validate demand in days, not months</li>
                <li>• Launch to a warm, excited audience</li>
                <li>• Know exactly what people want</li>
                <li>• Day-one users ready to try your product</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-purple-100 bg-purple-50/50 p-6">
              <div className="text-2xl mb-3">🚀</div>
              <h3 className="font-semibold text-gray-900 mb-2">With WaitlistQ</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Referral system grows your list virally</li>
                <li>• Weekly digests keep subscribers engaged</li>
                <li>• Analytics show what resonates</li>
                <li>• Export to any email tool at launch</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Two Options */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Two ways to launch your pre-launch page</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                FASTEST
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Use the Hosted Page</h3>
              <p className="text-sm text-gray-600 mb-6">
                WaitlistQ gives you a beautiful public page at <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">waitlistq.deependventures.com/w/your-slug</code>.
                Share this URL directly — no website needed.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2"><span className="text-green-600">✓</span> Ready in 60 seconds</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✓</span> No hosting or domain needed</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✓</span> Mobile-responsive design</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✓</span> Referral tracking built-in</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
                CUSTOMIZABLE
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Embed on Your Site</h3>
              <p className="text-sm text-gray-600 mb-6">
                Already have a landing page? Drop the WaitlistQ widget in with a single code snippet.
                Works with any website or page builder.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2"><span className="text-green-600">✓</span> Works with Webflow, WordPress, etc.</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✓</span> One-line embed code</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✓</span> Matches your site&apos;s design</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✓</span> Full analytics in your dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Launch Playbook */}
      <section id="playbook" className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">The pre-launch playbook</h2>
            <p className="mt-4 text-lg text-gray-600">A proven 4-week plan to build hype and validate demand</p>
          </div>
          <div className="space-y-6">
            {playbook.map((phase) => (
              <div key={phase.week} className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                  <span className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 px-4 py-1.5 text-sm font-bold text-indigo-700 whitespace-nowrap">
                    {phase.week}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900">{phase.title}</h3>
                </div>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {phase.tasks.map((task, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-purple-500 mt-0.5">→</span> {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Ideas */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Where to share your pre-launch page</h2>
            <p className="mt-4 text-lg text-gray-600">Get your first 100 signups from these channels</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: '🐦', title: 'Twitter/X', desc: 'Write a build-in-public thread about what you\'re making and why' },
              { icon: '💼', title: 'LinkedIn', desc: 'Share the problem you\'re solving with your professional network' },
              { icon: '💬', title: 'Reddit', desc: 'Post in relevant subreddits (r/SideProject, r/startups, niche subs)' },
              { icon: '🎮', title: 'Discord/Slack', desc: 'Share in relevant community servers and startup groups' },
              { icon: '📰', title: 'Indie Hackers', desc: 'Post a "building in public" update with your waitlist link' },
              { icon: '📧', title: 'Email', desc: 'Tell your personal and professional contacts about your project' },
              { icon: '🎙️', title: 'Product Hunt', desc: 'Create an upcoming page and link to your waitlist' },
              { icon: '📝', title: 'Blog/Medium', desc: 'Write about the problem you\'re solving and link to your waitlist' },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="text-xl mb-2">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Validate your idea today</h2>
          <p className="text-lg text-gray-600 mb-8">
            Don&apos;t spend months building something nobody wants. Put up a pre-launch page and let the market tell you.
          </p>
          <Link href="/login" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-indigo-200 hover:from-indigo-700 hover:to-purple-700 transition-all">
            Create Pre-Launch Page — Free →
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
            <Link href="/viral-referral-waitlist" className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-gray-900 mb-1">Viral Referral Waitlist →</h4>
              <p className="text-sm text-gray-500">Turn every signup into a growth engine with referral tracking</p>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
