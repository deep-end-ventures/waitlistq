import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import { generateReferralCode, getReferralUrl } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const { email, name, waitlistId, referralCode } = await request.json();

    if (!email || !waitlistId) {
      return NextResponse.json(
        { error: 'Email and waitlist ID are required' },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    // Get waitlist
    const { data: waitlist, error: wlError } = await supabase
      .from('waitlists')
      .select('*, profiles!inner(plan_limit)')
      .eq('id', waitlistId)
      .single();

    if (wlError || !waitlist) {
      return NextResponse.json({ error: 'Waitlist not found' }, { status: 404 });
    }

    if (!waitlist.is_active) {
      return NextResponse.json({ error: 'This waitlist is no longer accepting signups' }, { status: 403 });
    }

    // Check plan limit
    const { count } = await supabase
      .from('subscribers')
      .select('*', { count: 'exact', head: true })
      .eq('waitlist_id', waitlistId);

    if (count && count >= (waitlist.profiles?.plan_limit || 100)) {
      return NextResponse.json(
        { error: 'This waitlist has reached its capacity' },
        { status: 403 }
      );
    }

    // Check for duplicate
    const { data: existing } = await supabase
      .from('subscribers')
      .select('id, referral_code, position, priority_score')
      .eq('waitlist_id', waitlistId)
      .eq('email', email)
      .single();

    if (existing) {
      // Already signed up — return their info
      const slug = waitlist.slug;
      return NextResponse.json({
        alreadyJoined: true,
        subscriber: {
          ...existing,
          referralUrl: getReferralUrl(slug, existing.referral_code),
        },
        totalCount: count,
      });
    }

    // Get next position
    const { data: maxPos } = await supabase
      .from('subscribers')
      .select('position')
      .eq('waitlist_id', waitlistId)
      .order('position', { ascending: false })
      .limit(1)
      .single();

    const nextPosition = (maxPos?.position || 0) + 1;
    const newReferralCode = generateReferralCode();

    // Find referrer if referral code provided
    let referrerId: string | null = null;
    if (referralCode) {
      const { data: referrer } = await supabase
        .from('subscribers')
        .select('id')
        .eq('referral_code', referralCode)
        .eq('waitlist_id', waitlistId)
        .single();

      if (referrer) {
        referrerId = referrer.id;
      }
    }

    // Insert subscriber
    const { data: subscriber, error: subError } = await supabase
      .from('subscribers')
      .insert({
        waitlist_id: waitlistId,
        email,
        name: name || null,
        referral_code: newReferralCode,
        referred_by: referrerId,
        position: nextPosition,
        priority_score: 0,
      })
      .select()
      .single();

    if (subError) {
      console.error('Insert error:', subError);
      return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 });
    }

    // If referred, update referrer's stats and create event
    if (referrerId) {
      // Increment referral count
      await supabase.rpc('increment_referral_count', { sub_id: referrerId });

      // Bump referrer's priority
      const bonus = waitlist.referral_bonus || 1;
      await supabase
        .from('subscribers')
        .update({ 
          priority_score: (await supabase
            .from('subscribers')
            .select('priority_score')
            .eq('id', referrerId)
            .single()
          ).data?.priority_score + bonus
        })
        .eq('id', referrerId);

      // Log referral event
      await supabase.from('referral_events').insert({
        waitlist_id: waitlistId,
        referrer_id: referrerId,
        referred_id: subscriber.id,
      });

      // Log analytics
      await supabase.from('analytics_events').insert({
        waitlist_id: waitlistId,
        event_type: 'referral_signup',
        metadata: { referrer_id: referrerId, referred_id: subscriber.id },
      });
    }

    // Log signup analytics
    await supabase.from('analytics_events').insert({
      waitlist_id: waitlistId,
      event_type: 'signup',
      metadata: { subscriber_id: subscriber.id },
    });

    return NextResponse.json({
      success: true,
      subscriber: {
        id: subscriber.id,
        position: nextPosition,
        referralCode: newReferralCode,
        referralUrl: getReferralUrl(waitlist.slug, newReferralCode),
      },
      totalCount: (count || 0) + 1,
    });
  } catch (error) {
    console.error('Join error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
