'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PaymentModal } from '@/components/PaymentModal';

const freeFeatures = [
  '1 waitlist',
  'Up to 100 signups',
  'Basic analytics',
  'Embeddable widget',
  'CSV export',
  'Public waitlist page',
];

const proFeatures = [
  'Unlimited waitlists',
  'Unlimited signups',
  'Referral tracking',
  'Custom branding',
  'Full API access',
  'Advanced analytics',
  'Weekly digest emails',
  'Priority support',
];

export default function PricingPage() {
  const [showPayment, setShowPayment] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              Simple, transparent pricing
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start free with 1 waitlist and 100 signups. Upgrade to Pro for unlimited growth.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {/* Free */}
            <div className="rounded-2xl bg-white border border-gray-200 p-8 hover:border-gray-300 transition-colors">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900">Free</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold text-gray-900">$0</span>
                  <span className="text-gray-400">/forever</span>
                </div>
                <p className="mt-3 text-sm text-gray-500">
                  Perfect for testing the waters with your first launch.
                </p>
              </div>
              <ul className="mb-8 space-y-3">
                {freeFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/login"
                className="block w-full text-center py-3 rounded-xl bg-gray-100 text-gray-900 text-sm font-semibold hover:bg-gray-200 transition-colors"
              >
                Get Started Free
              </Link>
            </div>

            {/* Pro */}
            <div className="relative rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-8 text-white shadow-xl shadow-indigo-200">
              <div className="absolute -top-3 left-6 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                MOST POPULAR
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-bold">Pro</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold">$19</span>
                  <span className="text-indigo-200">/month</span>
                </div>
                <p className="mt-3 text-sm text-indigo-200">
                  For serious launches that need unlimited growth.
                </p>
              </div>
              <ul className="mb-8 space-y-3">
                {proFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-indigo-100">
                    <svg className="w-4 h-4 text-green-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowPayment(true)}
                className="block w-full text-center py-3 rounded-xl bg-white text-indigo-600 text-sm font-semibold hover:bg-gray-50 transition-colors"
              >
                Upgrade to Pro — $19/mo
              </button>
              <p className="mt-3 text-center text-xs text-indigo-300">
                Pay with USDC on Base network
              </p>
            </div>
          </div>

          {/* Feature Comparison */}
          <div className="mt-20 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Feature Comparison</h2>
            <div className="overflow-hidden rounded-2xl border border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">Free</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-indigo-600">Pro</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ['Waitlists', '1', 'Unlimited'],
                    ['Signups', '100', 'Unlimited'],
                    ['Analytics', 'Basic', 'Advanced'],
                    ['Referral Tracking', '—', '✓'],
                    ['Custom Branding', '—', '✓'],
                    ['API Access', '—', '✓'],
                    ['Widget Embed', '✓', '✓'],
                    ['CSV Export', '✓', '✓'],
                    ['Weekly Digest', '—', '✓'],
                    ['Priority Support', '—', '✓'],
                  ].map(([feature, free, pro]) => (
                    <tr key={feature} className="hover:bg-gray-50">
                      <td className="px-6 py-3 text-sm text-gray-700">{feature}</td>
                      <td className="px-6 py-3 text-center text-sm text-gray-400">{free}</td>
                      <td className="px-6 py-3 text-center text-sm text-gray-900 font-medium">{pro}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: 'How do I pay?',
                  a: 'We accept USDC on the Base network. Click "Upgrade to Pro" and send the payment to the provided wallet address. Your Pro access is activated instantly.',
                },
                {
                  q: 'Can I try Pro features before upgrading?',
                  a: 'The Free tier includes all core features with limits on waitlists and signups. Upgrade whenever you need more.',
                },
                {
                  q: 'What happens to my data if I downgrade?',
                  a: 'Your data is always safe. On the Free tier, only your first waitlist remains active. Others are paused but not deleted.',
                },
                {
                  q: 'Do you offer annual pricing?',
                  a: 'Not yet! Annual plans with a discount are coming soon.',
                },
              ].map((item) => (
                <div key={item.q} className="rounded-2xl bg-gray-50 border border-gray-200 p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-2">{item.q}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {showPayment && (
        <PaymentModal
          onClose={() => setShowPayment(false)}
          onSuccess={() => {
            setShowPayment(false);
            window.location.href = '/dashboard';
          }}
        />
      )}
    </div>
  );
}
