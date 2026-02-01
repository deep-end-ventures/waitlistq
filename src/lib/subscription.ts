/**
 * Subscription utilities for WaitlistQ
 * Uses localStorage for fast client-side checks + Supabase for persistence
 */

const STORAGE_KEY = 'waitlistq_subscription';
const WALLET_ADDRESS = '0xdA904B18a38261B5Ffe78abE5BA744b666e18A44';
const PRO_PRICE = 19; // USD per month

export interface SubscriptionState {
  plan: 'free' | 'pro';
  email: string | null;
  activatedAt: string | null;
  txHash: string | null;
}

const DEFAULT_STATE: SubscriptionState = {
  plan: 'free',
  email: null,
  activatedAt: null,
  txHash: null,
};

export function getSubscription(): SubscriptionState {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_STATE;
    return JSON.parse(stored);
  } catch {
    return DEFAULT_STATE;
  }
}

export function setSubscription(state: Partial<SubscriptionState>): void {
  if (typeof window === 'undefined') return;
  const current = getSubscription();
  const updated = { ...current, ...state };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function isPro(): boolean {
  return getSubscription().plan === 'pro';
}

export function clearSubscription(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function generatePaymentRef(): string {
  return `WQ-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

/**
 * Server-side subscription verification.
 * Checks the payment_events table for a valid, claimed payment for this email.
 * Use this on the server to enforce Pro features — never trust localStorage alone.
 */
export async function verifySubscriptionServer(email: string): Promise<boolean> {
  const { createClient } = await import('@supabase/supabase-js');
  const supabaseUrl = process.env.CENTRAL_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.CENTRAL_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) return false;

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data, error } = await supabase
    .from('payment_events')
    .select('id')
    .eq('product', 'waitlistq')
    .eq('email', email)
    .eq('status', 'claimed')
    .limit(1)
    .single();

  if (error || !data) return false;
  return true;
}

export { WALLET_ADDRESS, PRO_PRICE };
