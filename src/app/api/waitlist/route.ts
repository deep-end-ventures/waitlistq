import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase-server';
import { generateSlug } from '@/lib/utils';

// Create a new waitlist
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, description, websiteUrl, redirectUrl, closesAt } = await request.json();

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const slug = generateSlug(name);

    const { data: waitlist, error } = await supabase
      .from('waitlists')
      .insert({
        owner_id: user.id,
        name,
        slug,
        description,
        website_url: websiteUrl,
        redirect_url: redirectUrl,
        closes_at: closesAt,
      })
      .select()
      .single();

    if (error) {
      console.error('Create waitlist error:', error);
      return NextResponse.json({ error: 'Failed to create waitlist' }, { status: 500 });
    }

    return NextResponse.json({ waitlist });
  } catch (error) {
    console.error('Waitlist create error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Get user's waitlists
export async function GET() {
  try {
    const supabase = await createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: waitlists, error } = await supabase
      .from('waitlists')
      .select(`
        *,
        subscribers(count)
      `)
      .eq('owner_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Get waitlists error:', error);
      return NextResponse.json({ error: 'Failed to fetch waitlists' }, { status: 500 });
    }

    return NextResponse.json({ waitlists });
  } catch (error) {
    console.error('Waitlists fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
