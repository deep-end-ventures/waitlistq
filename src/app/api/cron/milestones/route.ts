import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

// Referral milestone notifications (called by Vercel Cron)
// "You moved up 5 spots!" — checks for subscribers who gained priority recently
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServiceClient();
  const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  // Find recent referral events
  const { data: recentReferrals } = await supabase
    .from('referral_events')
    .select(`
      id,
      referrer_id,
      waitlist_id,
      waitlists!inner(name, referral_bonus)
    `)
    .gte('created_at', dayAgo);

  if (!recentReferrals || recentReferrals.length === 0) {
    return NextResponse.json({ message: 'No recent referrals', notified: 0 });
  }

  // Group by referrer to count milestones
  const referrerMilestones: Record<string, {
    count: number;
    waitlistName: string;
    waitlistId: string;
    bonus: number;
  }> = {};

  for (const ref of recentReferrals) {
    const wl = ref.waitlists as unknown as { name: string; referral_bonus: number };
    const key = ref.referrer_id;
    if (!referrerMilestones[key]) {
      referrerMilestones[key] = {
        count: 0,
        waitlistName: wl.name,
        waitlistId: ref.waitlist_id,
        bonus: wl.referral_bonus || 1,
      };
    }
    referrerMilestones[key].count++;
  }

  let notified = 0;

  // Check milestone thresholds: 1, 3, 5, 10, 25, 50, 100
  const milestones = [1, 3, 5, 10, 25, 50, 100];

  for (const [subscriberId, data] of Object.entries(referrerMilestones)) {
    // Get total referral count
    const { data: subscriber } = await supabase
      .from('subscribers')
      .select('email, name, referral_count')
      .eq('id', subscriberId)
      .single();

    if (!subscriber) continue;

    const totalRefs = subscriber.referral_count || 0;
    const spotsGained = data.count * data.bonus;

    // Check if they just hit a milestone
    const hitMilestone = milestones.find(m =>
      totalRefs >= m && (totalRefs - data.count) < m
    );

    if (hitMilestone || spotsGained >= 3) {
      // Check we haven't already notified
      const { count: existing } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('subscriber_id', subscriberId)
        .eq('type', 'milestone')
        .gte('created_at', dayAgo);

      if (existing && existing > 0) continue;

      await supabase.from('notifications').insert({
        subscriber_id: subscriberId,
        type: 'milestone',
        subject: `🏆 You moved up ${spotsGained} spot${spotsGained > 1 ? 's' : ''} on "${data.waitlistName}"!`,
        body: `Great news, ${subscriber.name || 'there'}!\n\n` +
          `${data.count} friend${data.count > 1 ? 's' : ''} joined "${data.waitlistName}" through your referral link. ` +
          `You've moved up ${spotsGained} spot${spotsGained > 1 ? 's' : ''} on the waitlist!\n\n` +
          `Total referrals: ${totalRefs}\n\n` +
          `Keep sharing to move even higher! 🚀`,
      });
      notified++;
    }
  }

  return NextResponse.json({ notified });
}
