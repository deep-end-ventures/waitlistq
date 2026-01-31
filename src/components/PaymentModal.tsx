'use client';

import { useState } from 'react';
import { WALLET_ADDRESS, PRO_PRICE, generatePaymentRef, setSubscription } from '@/lib/subscription';

interface PaymentModalProps {
  onClose: () => void;
  onSuccess: () => void;
  userEmail?: string;
}

export function PaymentModal({ onClose, onSuccess, userEmail }: PaymentModalProps) {
  const [step, setStep] = useState<'info' | 'pending' | 'claiming' | 'success'>('info');
  const [email, setEmail] = useState(userEmail || '');
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');
  const [paymentRef] = useState(() => generatePaymentRef());
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(WALLET_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClaim = async () => {
    if (!email) {
      setError('Please enter your email');
      return;
    }
    setStep('claiming');
    setError('');

    try {
      const res = await fetch('/api/payment/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          plan: 'pro',
          tx_hash: txHash || null,
          amount: PRO_PRICE,
          payment_ref: paymentRef,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to record payment');
      }

      setSubscription({
        plan: 'pro',
        email,
        activatedAt: new Date().toISOString(),
        txHash: txHash || null,
      });

      setStep('success');
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setStep('pending');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900">
            {step === 'success' ? '🎉 Payment Recorded!' : 'Upgrade to Pro'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-xl"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-6">
          {step === 'success' ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">You&apos;re now on Pro!</h3>
              <p className="text-gray-600">Enjoy unlimited waitlists, signups, referral tracking, and more.</p>
            </div>
          ) : (
            <>
              {/* Plan summary */}
              <div className="mb-6 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-indigo-600 font-medium">WaitlistQ Pro</div>
                    <div className="text-2xl font-bold text-gray-900">${PRO_PRICE}/month</div>
                  </div>
                  <div className="rounded-lg bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
                    USDC on Base
                  </div>
                </div>
              </div>

              {step === 'info' && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                  {error && (
                    <div className="mb-4 text-sm text-red-600">{error}</div>
                  )}
                  <button
                    onClick={() => email ? setStep('pending') : setError('Please enter your email')}
                    className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-sm font-semibold text-white hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200"
                  >
                    Pay with Crypto →
                  </button>
                </>
              )}

              {step === 'pending' && (
                <>
                  <div className="mb-6 space-y-4">
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-2">
                        Send exactly <span className="text-indigo-600 font-bold">{PRO_PRICE} USDC</span> to:
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 rounded-xl bg-gray-50 border border-gray-200 px-3 py-2.5 text-xs text-gray-700 break-all font-mono">
                          {WALLET_ADDRESS}
                        </code>
                        <button
                          onClick={copyAddress}
                          className="shrink-0 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          {copied ? '✓' : '📋'}
                        </button>
                      </div>
                    </div>

                    <div className="rounded-xl bg-amber-50 border border-amber-200 p-3">
                      <div className="flex gap-2 text-sm text-amber-800">
                        <span>⚠️</span>
                        <div>
                          <p className="font-medium">Send on Base network only</p>
                          <p className="text-amber-600 text-xs mt-1">
                            Ref: {paymentRef}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Transaction Hash (optional)
                      </label>
                      <input
                        type="text"
                        value={txHash}
                        onChange={(e) => setTxHash(e.target.value)}
                        placeholder="0x..."
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                      {error}
                    </div>
                  )}

                  <button
                    onClick={handleClaim}
                    className="w-full rounded-xl bg-green-600 py-3 text-sm font-semibold text-white hover:bg-green-500 transition-colors"
                  >
                    I&apos;ve Sent Payment ✓
                  </button>
                  <button
                    onClick={() => setStep('info')}
                    className="w-full mt-2 rounded-xl border border-gray-200 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    ← Back
                  </button>
                </>
              )}

              {step === 'claiming' && (
                <div className="flex flex-col items-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent mb-4" />
                  <p className="text-gray-500">Recording your payment...</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
