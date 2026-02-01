import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import { createServerSupabase } from '@/lib/supabase-server';

export async function GET(request: NextRequest) {
  try {
    // Require authentication
    const authSupabase = await createServerSupabase();
    const { data: { user }, error: authError } = await authSupabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const waitlistId = searchParams.get('waitlistId');

    if (!waitlistId) {
      return NextResponse.json({ error: 'Waitlist ID required' }, { status: 400 });
    }

    const supabase = createServiceClient();

    // Verify the authenticated user owns this waitlist
    const { data: waitlist, error: wlError } = await supabase
      .from('waitlists')
      .select('id, owner_id')
      .eq('id', waitlistId)
      .single();

    if (wlError || !waitlist) {
      return NextResponse.json({ error: 'Waitlist not found' }, { status: 404 });
    }

    if (waitlist.owner_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden: you do not own this waitlist' }, { status: 403 });
    }

    // Get total subscribers
    const { count: totalSubscribers } = await supabase
      .from('subscribers')
      .select('*', { count: 'exact', head: true })
      .eq('waitlist_id', waitlistId);

    // Get signups in last 7 days
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const { count: weeklySignups } = await supabase
      .from('subscribers')
      .select('*', { count: 'exact', head: true })
      .eq('waitlist_id', waitlistId)
      .gte('created_at', weekAgo);

    // Get signups in last 24 hours
    const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { count: dailySignups } = await supabase
      .from('subscribers')
      .select('*', { count: 'exact', head: true })
      .eq('waitlist_id', waitlistId)
      .gte('created_at', dayAgo);

    // Get total referrals
    const { count: totalReferrals } = await supabase
      .from('referral_events')
      .select('*', { count: 'exact', head: true })
      .eq('waitlist_id', waitlistId);

    // Get top referrers (redact email — show only name and count)
    const { data: topReferrers } = await supabase
      .from('subscribers')
      .select('id, name, referral_count')
      .eq('waitlist_id', waitlistId)
      .gt('referral_count', 0)
      .order('referral_count', { ascending: false })
      .limit(10);

    // Get signup trend (last 30 days, grouped by day)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const { data: recentSignups } = await supabase
      .from('subscribers')
      .select('created_at')
      .eq('waitlist_id', waitlistId)
      .gte('created_at', thirtyDaysAgo)
      .order('created_at', { ascending: true });

    // Group by day
    const dailyTrend: Record<string, number> = {};
    recentSignups?.forEach((s) => {
      const day = new Date(s.created_at).toISOString().split('T')[0];
      dailyTrend[day] = (dailyTrend[day] || 0) + 1;
    });

    // Conversion rate (views to signups)
    const { count: totalViews } = await supabase
      .from('analytics_events')
      .select('*', { count: 'exact', head: true })
      .eq('waitlist_id', waitlistId)
      .eq('event_type', 'view');

    const conversionRate = totalViews && totalViews > 0
      ? ((totalSubscribers || 0) / totalViews * 100).toFixed(1)
      : null;

    return NextResponse.json({
      totalSubscribers: totalSubscribers || 0,
      weeklySignups: weeklySignups || 0,
      dailySignups: dailySignups || 0,
      totalReferrals: totalReferrals || 0,
      totalViews: totalViews || 0,
      conversionRate,
      topReferrers: topReferrers || [],
      dailyTrend,
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
