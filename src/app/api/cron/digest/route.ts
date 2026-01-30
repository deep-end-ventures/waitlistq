import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

// Weekly digest for waitlist owners (called by Vercel Cron)
// Shows: new signups this week, total, referral count, top referrer
export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServiceClient();
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  // Get all active waitlists with owners
  const { data: waitlists } = await supabase
    .from('waitlists')
    .select('id, name, owner_id, profiles!inner(email, full_name)')
    .eq('is_active', true);

  if (!waitlists || waitlists.length === 0) {
    return NextResponse.json({ message: 'No active waitlists' });
  }

  const digests = [];

  for (const wl of waitlists) {
    // Count new signups this week
    const { count: newSignups } = await supabase
      .from('subscribers')
      .select('*', { count: 'exact', head: true })
      .eq('waitlist_id', wl.id)
      .gte('created_at', weekAgo.toISOString());

    // Total subscribers
    const { count: total } = await supabase
      .from('subscribers')
      .select('*', { count: 'exact', head: true })
      .eq('waitlist_id', wl.id);

    // Referrals this week
    const { count: weeklyReferrals } = await supabase
      .from('referral_events')
      .select('*', { count: 'exact', head: true })
      .eq('waitlist_id', wl.id)
      .gte('created_at', weekAgo.toISOString());

    // Top referrer this week
    const { data: topRef } = await supabase
      .from('subscribers')
      .select('email, name, referral_count')
      .eq('waitlist_id', wl.id)
      .gt('referral_count', 0)
      .order('referral_count', { ascending: false })
      .limit(1)
      .single();

    const stats = {
      new_signups: newSignups || 0,
      total: total || 0,
      referrals: weeklyReferrals || 0,
      top_referrer: topRef ? (topRef.name || topRef.email) : null,
    };

    // Log the digest
    await supabase.from('digest_log').insert({
      owner_id: wl.owner_id,
      waitlist_id: wl.id,
      period_start: weekAgo.toISOString(),
      period_end: now.toISOString(),
      stats,
    });

    // Create notification for owner
    const ownerProfile = wl.profiles as unknown as { email: string; full_name: string };
    await supabase.from('notifications').insert({
      owner_id: wl.owner_id,
      type: 'weekly_digest',
      subject: `📊 Weekly Digest: ${wl.name}`,
      body: `Hey ${ownerProfile?.full_name || 'there'}! Here's your weekly update for "${wl.name}":\n\n` +
        `📈 New signups: ${stats.new_signups}\n` +
        `👥 Total: ${stats.total}\n` +
        `🔗 Referrals: ${stats.referrals}\n` +
        (stats.top_referrer ? `🏆 Top referrer: ${stats.top_referrer}\n` : '') +
        `\nKeep growing! — WaitlistQ`,
    });

    digests.push({ waitlist: wl.name, stats });
  }

  return NextResponse.json({ processed: digests.length, digests });
}
