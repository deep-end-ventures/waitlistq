-- WaitlistQ Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES (waitlist owners / founders)
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  company_name TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'starter', 'growth', 'scale')),
  plan_limit INTEGER DEFAULT 100,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- WAITLISTS
-- ============================================
CREATE TABLE waitlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  website_url TEXT,
  redirect_url TEXT,
  is_active BOOLEAN DEFAULT true,
  closes_at TIMESTAMPTZ,
  referral_bonus INTEGER DEFAULT 1,  -- positions moved up per referral
  custom_fields JSONB DEFAULT '[]'::jsonb,
  branding JSONB DEFAULT '{}'::jsonb,  -- colors, logo, etc.
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_waitlists_owner ON waitlists(owner_id);
CREATE INDEX idx_waitlists_slug ON waitlists(slug);

-- ============================================
-- WAITLIST SUBSCRIBERS
-- ============================================
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  waitlist_id UUID NOT NULL REFERENCES waitlists(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  referral_code TEXT NOT NULL UNIQUE,
  referred_by UUID REFERENCES subscribers(id),
  referral_count INTEGER DEFAULT 0,
  position INTEGER NOT NULL,
  priority_score INTEGER DEFAULT 0,  -- higher = closer to front
  status TEXT DEFAULT 'waiting' CHECK (status IN ('waiting', 'invited', 'joined', 'expired')),
  extra_data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(waitlist_id, email)
);

CREATE INDEX idx_subscribers_waitlist ON subscribers(waitlist_id);
CREATE INDEX idx_subscribers_referral ON subscribers(referral_code);
CREATE INDEX idx_subscribers_position ON subscribers(waitlist_id, priority_score DESC, position ASC);

-- ============================================
-- REFERRAL EVENTS (tracking)
-- ============================================
CREATE TABLE referral_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  waitlist_id UUID NOT NULL REFERENCES waitlists(id) ON DELETE CASCADE,
  referrer_id UUID NOT NULL REFERENCES subscribers(id) ON DELETE CASCADE,
  referred_id UUID NOT NULL REFERENCES subscribers(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_referral_events_waitlist ON referral_events(waitlist_id);

-- ============================================
-- ANALYTICS EVENTS
-- ============================================
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  waitlist_id UUID NOT NULL REFERENCES waitlists(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN ('view', 'signup', 'referral_click', 'referral_signup', 'share')),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_analytics_waitlist ON analytics_events(waitlist_id);
CREATE INDEX idx_analytics_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_created ON analytics_events(created_at);

-- ============================================
-- NOTIFICATIONS / RETENTION
-- ============================================
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subscriber_id UUID REFERENCES subscribers(id) ON DELETE CASCADE,
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN (
    'milestone',           -- "You moved up 5 spots!"
    'weekly_digest',       -- Weekly stats for owners
    'expiry_warning',      -- "Your waitlist closes in 7 days"
    'position_update',     -- "You're now #X in line"
    'welcome'              -- Welcome email
  )),
  subject TEXT,
  body TEXT,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_subscriber ON notifications(subscriber_id);
CREATE INDEX idx_notifications_owner ON notifications(owner_id);

-- ============================================
-- DIGEST TRACKING (retention)
-- ============================================
CREATE TABLE digest_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  waitlist_id UUID NOT NULL REFERENCES waitlists(id) ON DELETE CASCADE,
  period_start TIMESTAMPTZ NOT NULL,
  period_end TIMESTAMPTZ NOT NULL,
  stats JSONB NOT NULL,  -- { new_signups, total, referrals, top_referrer }
  sent_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE digest_log ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/update their own
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Waitlists: owners can CRUD their own
CREATE POLICY "Owners can view own waitlists" ON waitlists FOR SELECT USING (auth.uid() = owner_id);
CREATE POLICY "Owners can create waitlists" ON waitlists FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Owners can update own waitlists" ON waitlists FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Owners can delete own waitlists" ON waitlists FOR DELETE USING (auth.uid() = owner_id);

-- Subscribers: owners can view, public can insert (via API)
CREATE POLICY "Owners can view subscribers" ON subscribers FOR SELECT USING (
  EXISTS (SELECT 1 FROM waitlists WHERE waitlists.id = subscribers.waitlist_id AND waitlists.owner_id = auth.uid())
);
CREATE POLICY "Anyone can join waitlist" ON subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "System can update subscribers" ON subscribers FOR UPDATE USING (true);

-- Referral events: owners can view
CREATE POLICY "Owners can view referral events" ON referral_events FOR SELECT USING (
  EXISTS (SELECT 1 FROM waitlists WHERE waitlists.id = referral_events.waitlist_id AND waitlists.owner_id = auth.uid())
);
CREATE POLICY "Anyone can create referral events" ON referral_events FOR INSERT WITH CHECK (true);

-- Analytics: owners can view, anyone can insert
CREATE POLICY "Owners can view analytics" ON analytics_events FOR SELECT USING (
  EXISTS (SELECT 1 FROM waitlists WHERE waitlists.id = analytics_events.waitlist_id AND waitlists.owner_id = auth.uid())
);
CREATE POLICY "Anyone can log analytics" ON analytics_events FOR INSERT WITH CHECK (true);

-- Notifications: relevant users can view
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (
  auth.uid() = owner_id OR 
  EXISTS (SELECT 1 FROM subscribers WHERE subscribers.id = notifications.subscriber_id AND EXISTS (
    SELECT 1 FROM waitlists WHERE waitlists.id = subscribers.waitlist_id AND waitlists.owner_id = auth.uid()
  ))
);
CREATE POLICY "System can insert notifications" ON notifications FOR INSERT WITH CHECK (true);

-- Digest log: owners can view
CREATE POLICY "Owners can view digest log" ON digest_log FOR SELECT USING (auth.uid() = owner_id);
CREATE POLICY "System can insert digest log" ON digest_log FOR INSERT WITH CHECK (true);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to get next position for a waitlist
CREATE OR REPLACE FUNCTION get_next_position(wl_id UUID)
RETURNS INTEGER AS $$
  SELECT COALESCE(MAX(position), 0) + 1 FROM subscribers WHERE waitlist_id = wl_id;
$$ LANGUAGE SQL;

-- Function to recalculate effective positions based on priority
CREATE OR REPLACE FUNCTION get_effective_position(sub_id UUID)
RETURNS INTEGER AS $$
  WITH ranked AS (
    SELECT 
      s.id,
      ROW_NUMBER() OVER (
        PARTITION BY s.waitlist_id 
        ORDER BY s.priority_score DESC, s.position ASC
      ) as effective_pos
    FROM subscribers s
    WHERE s.waitlist_id = (SELECT waitlist_id FROM subscribers WHERE id = sub_id)
    AND s.status = 'waiting'
  )
  SELECT effective_pos::INTEGER FROM ranked WHERE id = sub_id;
$$ LANGUAGE SQL;

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
