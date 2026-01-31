'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import { ProBadge } from '@/components/ProBadge';
import { isPro } from '@/lib/subscription';
import { getBaseUrl, formatNumber } from '@/lib/utils';

interface Waitlist {
  id: string;
  name: string;
  slug: string;
  description: string;
  is_active: boolean;
  closes_at: string | null;
  created_at: string;
  subscribers: { count: number }[];
}

interface Stats {
  totalSubscribers: number;
  weeklySignups: number;
  dailySignups: number;
  totalReferrals: number;
  totalViews: number;
  conversionRate: string | null;
  topReferrers: { id: string; email: string; name: string; referral_count: number }[];
  dailyTrend: Record<string, number>;
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [waitlists, setWaitlists] = useState<Waitlist[]>([]);
  const [selectedWaitlist, setSelectedWaitlist] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [creating, setCreating] = useState(false);
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const fetchWaitlists = useCallback(async () => {
    const res = await fetch('/api/waitlist');
    const data = await res.json();
    if (data.waitlists) {
      setWaitlists(data.waitlists);
      if (data.waitlists.length > 0 && !selectedWaitlist) {
        setSelectedWaitlist(data.waitlists[0].id);
      }
    }
    setLoading(false);
  }, [selectedWaitlist]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      window.location.href = '/login';
      return;
    }
    setUser(user);
    fetchWaitlists();
  };

  useEffect(() => {
    if (selectedWaitlist) {
      fetchStats(selectedWaitlist);
    }
  }, [selectedWaitlist]);

  const fetchStats = async (waitlistId: string) => {
    const res = await fetch(`/api/waitlist/stats?waitlistId=${waitlistId}`);
    const data = await res.json();
    setStats(data);
  };

  const createWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName, description: newDesc }),
    });
    const data = await res.json();
    if (data.waitlist) {
      setShowCreate(false);
      setNewName('');
      setNewDesc('');
      fetchWaitlists();
      setSelectedWaitlist(data.waitlist.id);
    }
    setCreating(false);
  };

  const exportCSV = async () => {
    if (!selectedWaitlist) return;
    window.open(`/api/waitlist/export?waitlistId=${selectedWaitlist}`, '_blank');
  };

  const selectedWl = waitlists.find((w) => w.id === selectedWaitlist);
  const embedCode = selectedWl
    ? `<div id="waitlistq-widget"></div>
<script src="${getBaseUrl()}/widget/embed.js" data-waitlist-id="${selectedWl.id}" data-slug="${selectedWl.slug}"></script>`
    : '';

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center pt-32">
          <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <ProBadge />
            </div>
            <p className="text-gray-500 text-sm mt-1">
              Welcome back{user?.email ? `, ${user.email}` : ''}
              {!isPro() && (
                <> · <a href="/pricing" className="text-indigo-600 hover:text-indigo-700 font-medium">Upgrade to Pro</a></>
              )}
            </p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200 text-sm"
          >
            + New Waitlist
          </button>
        </div>

        {/* Create Modal */}
        {showCreate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Waitlist</h2>
              <form onSubmit={createWaitlist} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="My Awesome Product"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Be the first to try our revolutionary product"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={creating}
                    className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl disabled:opacity-50 text-sm"
                  >
                    {creating ? 'Creating...' : 'Create Waitlist'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreate(false)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl text-sm hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {waitlists.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
            <div className="text-5xl mb-4">📋</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No waitlists yet</h2>
            <p className="text-gray-500 mb-6">Create your first waitlist to get started</p>
            <button
              onClick={() => setShowCreate(true)}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-200"
            >
              Create Your First Waitlist
            </button>
          </div>
        ) : (
          <>
            {/* Waitlist Selector */}
            {waitlists.length > 1 && (
              <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
                {waitlists.map((wl) => (
                  <button
                    key={wl.id}
                    onClick={() => setSelectedWaitlist(wl.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                      selectedWaitlist === wl.id
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-200'
                    }`}
                  >
                    {wl.name}
                  </button>
                ))}
              </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Signups', value: formatNumber(stats?.totalSubscribers || 0), icon: '👥' },
                { label: 'This Week', value: formatNumber(stats?.weeklySignups || 0), icon: '📈' },
                { label: 'Referrals', value: formatNumber(stats?.totalReferrals || 0), icon: '🔗' },
                { label: 'Conversion', value: stats?.conversionRate ? `${stats.conversionRate}%` : 'N/A', icon: '🎯' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-2xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">{stat.label}</span>
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Daily Trend */}
                {stats?.dailyTrend && Object.keys(stats.dailyTrend).length > 0 && (
                  <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Signup Trend (30 days)</h3>
                    <div className="flex items-end gap-1 h-32">
                      {(() => {
                        const entries = Object.entries(stats.dailyTrend);
                        const maxVal = Math.max(...entries.map(([, v]) => v));
                        return entries.map(([date, count]) => (
                          <div
                            key={date}
                            className="flex-1 bg-gradient-to-t from-indigo-600 to-purple-500 rounded-t-sm min-w-[4px] hover:from-indigo-500 hover:to-purple-400 transition-colors group relative"
                            style={{ height: `${Math.max((count / maxVal) * 100, 4)}%` }}
                            title={`${date}: ${count} signups`}
                          >
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                              {count}
                            </div>
                          </div>
                        ));
                      })()}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-400">
                      <span>30 days ago</span>
                      <span>Today</span>
                    </div>
                  </div>
                )}

                {/* Embed Code */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <h3 className="font-bold text-gray-900 mb-2">Embed Widget</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Copy this code and paste it into your website&apos;s HTML.
                  </p>
                  <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                    <code className="text-sm text-green-400 whitespace-pre-wrap break-all">
                      {embedCode}
                    </code>
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(embedCode)}
                    className="mt-3 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    📋 Copy Code
                  </button>
                </div>

                {/* Public Link */}
                {selectedWl && (
                  <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h3 className="font-bold text-gray-900 mb-2">Public Waitlist Page</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Share this link directly — no embedding needed.
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value={`${getBaseUrl()}/w/${selectedWl.slug}`}
                        className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700"
                      />
                      <button
                        onClick={() => navigator.clipboard.writeText(`${getBaseUrl()}/w/${selectedWl.slug}`)}
                        className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Top Referrers */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <h3 className="font-bold text-gray-900 mb-4">🏆 Top Referrers</h3>
                  {stats?.topReferrers && stats.topReferrers.length > 0 ? (
                    <div className="space-y-3">
                      {stats.topReferrers.map((r, i) => (
                        <div key={r.id} className="flex items-center gap-3">
                          <span className="text-sm font-bold text-gray-400 w-6">#{i + 1}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {r.name || r.email}
                            </p>
                          </div>
                          <span className="text-sm font-bold text-indigo-600">
                            {r.referral_count} refs
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">No referrals yet</p>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <button
                      onClick={exportCSV}
                      className="w-full text-left px-4 py-3 bg-gray-50 rounded-xl text-sm hover:bg-gray-100 transition-colors text-gray-700"
                    >
                      📥 Export as CSV
                    </button>
                    {selectedWl && (
                      <a
                        href={`/w/${selectedWl.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-left px-4 py-3 bg-gray-50 rounded-xl text-sm hover:bg-gray-100 transition-colors text-gray-700"
                      >
                        👁 View Public Page
                      </a>
                    )}
                  </div>
                </div>

                {/* Retention Features */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6">
                  <h3 className="font-bold text-gray-900 mb-2">📬 Weekly Digest</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Receive weekly growth stats for your waitlists every Monday morning.
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-5 bg-indigo-600 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5" />
                    </div>
                    <span className="text-sm text-gray-700 font-medium">Enabled</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
