'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import { getBaseUrl } from '@/lib/utils';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${getBaseUrl()}/api/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
      } else {
        setSent(true);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />
      <div className="flex items-center justify-center pt-20 pb-32 px-4">
        <div className="w-full max-w-md">
          {sent ? (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h2>
              <p className="text-gray-600 mb-4">
                We sent a magic link to <span className="font-medium">{email}</span>
              </p>
              <p className="text-sm text-gray-400">
                Click the link in your email to sign in. The link expires in 1 hour.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">Q</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to WaitlistQ</h2>
                <p className="text-gray-600 text-sm">
                  Sign in or create your account with a magic link
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-200"
                >
                  {loading ? 'Sending...' : 'Send Magic Link'}
                </button>
              </form>

              {error && (
                <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
              )}

              <p className="mt-6 text-center text-xs text-gray-400">
                By signing in, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
