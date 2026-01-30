import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase-server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const waitlistId = searchParams.get('waitlistId');

    if (!waitlistId) {
      return NextResponse.json({ error: 'Waitlist ID required' }, { status: 400 });
    }

    // Verify ownership
    const { data: waitlist } = await supabase
      .from('waitlists')
      .select('id, name')
      .eq('id', waitlistId)
      .eq('owner_id', user.id)
      .single();

    if (!waitlist) {
      return NextResponse.json({ error: 'Not found or unauthorized' }, { status: 404 });
    }

    // Get all subscribers
    const { data: subscribers } = await supabase
      .from('subscribers')
      .select('email, name, referral_count, position, priority_score, status, created_at')
      .eq('waitlist_id', waitlistId)
      .order('priority_score', { ascending: false })
      .order('position', { ascending: true });

    if (!subscribers || subscribers.length === 0) {
      return new NextResponse('No subscribers to export', { status: 200 });
    }

    // Build CSV
    const headers = ['Position', 'Email', 'Name', 'Referrals', 'Status', 'Joined'];
    const rows = subscribers.map((s, i) => [
      i + 1,
      s.email,
      s.name || '',
      s.referral_count,
      s.status,
      new Date(s.created_at).toISOString().split('T')[0],
    ]);

    const csv = [
      headers.join(','),
      ...rows.map((r) => r.map((v) => `"${v}"`).join(',')),
    ].join('\n');

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${waitlist.name}-waitlist.csv"`,
      },
    });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
