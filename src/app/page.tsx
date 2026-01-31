import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

const features = [
  {
    icon: '🚀',
    title: 'Viral Referral Engine',
    description: 'Every signup gets a unique referral link. Friends who join move the referrer up the waitlist. Growth on autopilot.',
  },
  {
    icon: '📊',
    title: 'Real-Time Analytics',
    description: 'Track signups, referrals, conversion rates, and daily trends. Know exactly how your launch is performing.',
  },
  {
    icon: '🧩',
    title: 'Embeddable Widget',
    description: 'Drop a simple code snippet on any website. Beautiful, responsive, and fully customizable.',
  },
  {
    icon: '📧',
    title: 'Export & Integrate',
    description: 'Export your waitlist as CSV anytime. Connect with your favorite email marketing tools.',
  },
  {
    icon: '🔔',
    title: 'Smart Notifications',
    description: 'Milestone alerts, position updates, and expiry warnings keep your audience engaged.',
  },
  {
    icon: '📈',
    title: 'Weekly Digest',
    description: 'Get weekly growth reports delivered to your inbox. Never miss a trend in your waitlist data.',
  },
];

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for testing the waters',
    features: ['1 waitlist', 'Up to 100 signups', 'Basic analytics', 'Embeddable widget', 'CSV export', 'Public waitlist page'],
    cta: 'Start Free',
    href: '/login',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    description: 'For serious launches',
    features: ['Unlimited waitlists', 'Unlimited signups', 'Referral tracking', 'Custom branding', 'Full API access', 'Advanced analytics', 'Weekly digest emails', 'Priority support'],
    cta: 'Upgrade to Pro',
    href: '/pricing',
    featured: true,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-indigo-700 font-medium">Now in public beta</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
              Viral waitlists
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                that grow themselves
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Create an embeddable waitlist widget with built-in referral tracking.
              Users share their link to move up the list. Watch your signup count
              explode.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-xl shadow-indigo-200 text-lg"
              >
                Start for Free →
              </Link>
              <a
                href="#features"
                className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-lg"
              >
                See How It Works
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Free up to 100 signups. No credit card required.
            </p>
          </div>

          {/* Widget Preview */}
          <div className="mt-16 max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 transform hover:scale-[1.02] transition-transform">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Join our waitlist</h3>
                <p className="text-gray-600 text-sm">Be the first to try the next big thing</p>
                <p className="text-xs text-gray-400 mt-2">2,847 people already joined</p>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-400 bg-gray-50"
                  disabled
                />
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-400 bg-gray-50"
                  disabled
                />
                <div className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl text-center text-sm shadow-lg shadow-indigo-200">
                  Join the Waitlist
                </div>
              </div>
              <p className="mt-4 text-center text-xs text-gray-400">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Everything you need to launch
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From signup to viral growth, WaitlistQ handles it all
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-gray-50 rounded-2xl p-8 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 transition-all group"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-lg text-gray-600">Three steps to viral growth</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: '1',
                title: 'Create your waitlist',
                desc: 'Sign up, name your waitlist, and get your embed code in seconds.',
              },
              {
                step: '2',
                title: 'Embed on your site',
                desc: 'Drop a single script tag on your landing page. The widget handles the rest.',
              },
              {
                step: '3',
                title: 'Watch it grow',
                desc: 'Each signup gets a referral link. Sharing moves them up. Your list grows itself.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-200">
                  <span className="text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Retention Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Built for retention
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We don&apos;t just help you collect emails. We keep your audience engaged for the long haul.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: '📬',
                title: 'Weekly Digest Emails',
                desc: 'Founders get weekly growth reports: new signups, referral stats, top referrers. Keeps you coming back to the dashboard.',
              },
              {
                icon: '🏆',
                title: 'Referral Milestones',
                desc: '"You moved up 5 spots!" Notifications keep waitlist members engaged and sharing.',
              },
              {
                icon: '⏰',
                title: 'Expiry Warnings',
                desc: '"Your waitlist closes in 7 days" — urgency-driven re-engagement for both founders and subscribers.',
              },
              {
                icon: '🧪',
                title: 'A/B Test Incentives',
                desc: 'Test different referral rewards and messaging. Find what drives the most shares.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-6 rounded-2xl bg-gray-50 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all"
              >
                <div className="text-3xl shrink-0">{item.icon}</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-gray-600">
              Start free. Scale when you&apos;re ready.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 ${
                  plan.featured
                    ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-200 relative'
                    : 'bg-white border border-gray-200 hover:border-indigo-200 transition-colors'
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <h3 className={`text-lg font-bold mb-1 ${plan.featured ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className={`text-4xl font-extrabold ${plan.featured ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ${plan.featured ? 'text-indigo-200' : 'text-gray-400'}`}>
                    {plan.period}
                  </span>
                </div>
                <p className={`text-sm mb-6 ${plan.featured ? 'text-indigo-200' : 'text-gray-500'}`}>
                  {plan.description}
                </p>
                <ul className="space-y-2 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className={`text-sm flex items-start gap-2 ${plan.featured ? 'text-indigo-100' : 'text-gray-600'}`}>
                      <svg className={`w-4 h-4 mt-0.5 shrink-0 ${plan.featured ? 'text-green-300' : 'text-green-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`block text-center py-3 rounded-xl text-sm font-semibold transition-all ${
                    plan.featured
                      ? 'bg-white text-indigo-600 hover:bg-gray-50'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </Link>
                {plan.featured && (
                  <p className="mt-2 text-center text-xs text-indigo-300">Pay with USDC on Base</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-6">
            Ready to build your waitlist?
          </h2>
          <p className="text-xl text-indigo-200 mb-10">
            Join thousands of founders using WaitlistQ to launch their products with a bang.
          </p>
          <Link
            href="/login"
            className="inline-block px-10 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-xl text-lg"
          >
            Get Started for Free →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
