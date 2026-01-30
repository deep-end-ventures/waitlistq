import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

// Expiry warning notifications (called by Vercel Cron)
// Sends warnings at 7 days and 1 day before closes_at
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServiceClient();
  const now = new Date();
  const sevenDays = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const oneDay = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  // Waitlists closing in ~7 days
  const { data: closingSoon } = await supabase
    .from('waitlists')
    .select('id, name, owner_id, closes_at, profiles!inner(email, full_name)')
    .eq('is_active', true)
    .not('closes_at', 'is', null)
    .lte('closes_at', sevenDays.toISOString())
    .gt('closes_at', oneDay.toISOString());

  let notified = 0;

  if (closingSoon) {
    for (const wl of closingSoon) {
      const closesAt = new Date(wl.closes_at!);
      const daysLeft = Math.ceil((closesAt.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));

      // Notify owner
      const ownerProfile = wl.profiles as unknown as { full_name: string };
      await supabase.from('notifications').insert({
        owner_id: wl.owner_id,
        type: 'expiry_warning',
        subject: `⏰ "${wl.name}" closes in ${daysLeft} days`,
        body: `Hey ${ownerProfile?.full_name || 'there'},\n\n` +
          `Your waitlist "${wl.name}" is set to close in ${daysLeft} days.\n\n` +
          `Make sure to:\n` +
          `• Share your waitlist link one more time\n` +
          `• Send invitations to your top waitlisters\n` +
          `• Export your email list before it closes\n\n` +
          `— WaitlistQ`,
      });
      notified++;
    }
  }

  // Waitlists closing tomorrow
  const { data: closingTomorrow } = await supabase
    .from('waitlists')
    .select('id, name, owner_id, closes_at, profiles!inner(email, full_name)')
    .eq('is_active', true)
    .not('closes_at', 'is', null)
    .lte('closes_at', oneDay.toISOString())
    .gt('closes_at', now.toISOString());

  if (closingTomorrow) {
    for (const wl of closingTomorrow) {
      const ownerProfile = wl.profiles as unknown as { full_name: string };
      await supabase.from('notifications').insert({
        owner_id: wl.owner_id,
        type: 'expiry_warning',
        subject: `🚨 "${wl.name}" closes TOMORROW`,
        body: `Hey ${ownerProfile?.full_name || 'there'},\n\n` +
          `Your waitlist "${wl.name}" closes tomorrow! Last chance to:\n\n` +
          `• Export your subscriber list\n` +
          `• Send final invite emails\n` +
          `• Consider extending the deadline\n\n` +
          `— WaitlistQ`,
      });
      notified++;
    }
  }

  return NextResponse.json({ notified });
}
