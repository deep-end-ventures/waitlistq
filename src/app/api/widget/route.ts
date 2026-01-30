import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

// Public endpoint: Get waitlist info for widget embedding
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const waitlistId = searchParams.get('id');

    if (!slug && !waitlistId) {
      return NextResponse.json({ error: 'Slug or ID required' }, { status: 400 });
    }

    const supabase = createServiceClient();

    let query = supabase
      .from('waitlists')
      .select('id, name, slug, description, is_active, closes_at, branding')
      .eq('is_active', true);

    if (slug) {
      query = query.eq('slug', slug);
    } else {
      query = query.eq('id', waitlistId);
    }

    const { data: waitlist, error } = await query.single();

    if (error || !waitlist) {
      return NextResponse.json({ error: 'Waitlist not found' }, { status: 404 });
    }

    // Get subscriber count
    const { count } = await supabase
      .from('subscribers')
      .select('*', { count: 'exact', head: true })
      .eq('waitlist_id', waitlist.id);

    // Log view
    await supabase.from('analytics_events').insert({
      waitlist_id: waitlist.id,
      event_type: 'view',
    });

    return NextResponse.json({
      waitlist: {
        ...waitlist,
        subscriberCount: count || 0,
      },
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Widget API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
