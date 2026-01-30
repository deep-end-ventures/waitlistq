'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface WaitlistWidgetProps {
  waitlistId: string;
  slug: string;
  name: string;
  description?: string;
  subscriberCount?: number;
  referralCode?: string | null;
  inline?: boolean;
}

export default function WaitlistWidget({
  waitlistId,
  slug,
  name,
  description,
  subscriberCount = 0,
  referralCode,
  inline = false,
}: WaitlistWidgetProps) {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    position?: number;
    referralUrl?: string;
    totalCount?: number;
    alreadyJoined?: boolean;
  } | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/waitlist/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: userName || undefined,
          waitlistId,
          referralCode,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      if (data.alreadyJoined) {
        setResult({
          success: true,
          alreadyJoined: true,
          referralUrl: data.subscriber.referralUrl,
          totalCount: data.totalCount,
        });
      } else {
        setResult({
          success: true,
          position: data.subscriber.position,
          referralUrl: data.subscriber.referralUrl,
          totalCount: data.totalCount,
        });
      }
    } catch {
      setError('Failed to join waitlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyReferralLink = () => {
    if (result?.referralUrl) {
      navigator.clipboard.writeText(result.referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (result?.success) {
    return (
      <div className={cn(
        'bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center',
        inline ? 'max-w-md mx-auto' : 'max-w-md mx-auto'
      )}>
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {result.alreadyJoined ? (
          <h3 className="text-xl font-bold text-gray-900 mb-2">You&apos;re already on the list!</h3>
        ) : (
          <>
            <h3 className="text-xl font-bold text-gray-900 mb-2">You&apos;re on the list! 🎉</h3>
            <p className="text-gray-600 mb-1">
              You&apos;re <span className="font-bold text-indigo-600">#{result.position}</span> in line
            </p>
          </>
        )}

        <p className="text-sm text-gray-500 mb-6">
          {result.totalCount} people are on the waitlist
        </p>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 mb-4">
          <p className="text-sm font-semibold text-gray-800 mb-2">
            🚀 Want to skip the line? Share your link!
          </p>
          <p className="text-xs text-gray-500 mb-3">
            Each friend who joins moves you up the waitlist
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={result.referralUrl || ''}
              className="flex-1 text-xs bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-700 truncate"
            />
            <button
              onClick={copyReferralLink}
              className="px-4 py-2 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700 transition-colors shrink-0"
            >
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="flex gap-2 justify-center">
          <a
            href={`https://twitter.com/intent/tweet?text=I just joined the waitlist for ${encodeURIComponent(name)}! Join me: ${encodeURIComponent(result.referralUrl || '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-black text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            Share on 𝕏
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(result.referralUrl || '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'bg-white rounded-2xl shadow-xl border border-gray-100 p-8',
      inline ? 'max-w-md mx-auto' : 'max-w-md mx-auto'
    )}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
        {description && (
          <p className="text-gray-600 text-sm">{description}</p>
        )}
        {subscriberCount > 0 && (
          <p className="text-xs text-gray-400 mt-2">
            {subscriberCount.toLocaleString()} people already joined
          </p>
        )}
        {referralCode && (
          <div className="mt-2 inline-block bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1 rounded-full">
            👋 You were referred by a friend!
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Your name (optional)"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
        />
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm shadow-lg shadow-indigo-200"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Joining...
            </span>
          ) : (
            'Join the Waitlist'
          )}
        </button>
      </form>

      {error && (
        <p className="mt-3 text-sm text-red-600 text-center">{error}</p>
      )}

      <p className="mt-4 text-center text-xs text-gray-400">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}
