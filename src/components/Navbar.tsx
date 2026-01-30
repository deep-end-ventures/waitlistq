'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Navbar() {
  const [user, setUser] = useState<{ email?: string } | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" fill="none" className="h-8 w-8">
              <defs>
                <linearGradient id="wq-nav" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#7c3aed"/>
                  <stop offset="100%" stopColor="#8b5cf6"/>
                </linearGradient>
                <linearGradient id="wq-nav-tail" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7c3aed"/>
                  <stop offset="100%" stopColor="#a78bfa"/>
                </linearGradient>
              </defs>
              <circle cx="112" cy="118" r="72" fill="url(#wq-nav)"/>
              <circle cx="112" cy="118" r="42" fill="#ffffff"/>
              <path d="M148 152 L200 50 L185 95 L210 82 L165 170 Z" fill="url(#wq-nav-tail)"/>
              <line x1="140" y1="175" x2="120" y2="210" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" opacity="0.6"/>
              <line x1="155" y1="178" x2="145" y2="205" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" opacity="0.4"/>
              <line x1="168" y1="175" x2="165" y2="198" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" opacity="0.3"/>
              <circle cx="82" cy="85" r="6" fill="#7c3aed" opacity="0.5"/>
              <circle cx="72" cy="115" r="6" fill="#7c3aed" opacity="0.6"/>
              <circle cx="80" cy="148" r="6" fill="#7c3aed" opacity="0.7"/>
              <circle cx="108" cy="162" r="6" fill="#7c3aed" opacity="0.8"/>
            </svg>
            <span className="font-bold text-xl text-gray-900">WaitlistQ</span>
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/login"
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md shadow-indigo-200"
                >
                  Get Started Free
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
