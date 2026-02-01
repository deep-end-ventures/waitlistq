import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const FROM_EMAIL = "WaitlistQ <hello@deependventures.com>";
const AUDIENCE_NAME = "WaitlistQ Subscribers";

let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

async function getOrCreateAudience(): Promise<string> {
  const resend = getResend();
  const { data: audiences } = await resend.audiences.list();
  const existing = audiences?.data?.find(
    (a: { name: string }) => a.name === AUDIENCE_NAME
  );
  if (existing) return existing.id;

  const { data: created } = await resend.audiences.create({
    name: AUDIENCE_NAME,
  });
  if (!created?.id) throw new Error("Failed to create audience");
  return created.id;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limit: 5 requests per IP per minute
    const ip = getClientIp(req);
    const rl = rateLimit(`subscribe:${ip}`, { limit: 5, windowSeconds: 60 });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": String(Math.ceil((rl.reset - Date.now()) / 1000)) } }
      );
    }

    const { email, source } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    const resend = getResend();
    const audienceId = await getOrCreateAudience();

    await resend.contacts.create({
      audienceId,
      email: email.toLowerCase().trim(),
      firstName: source || "homepage",
      unsubscribed: false,
    });

    await resend.emails.send({
      from: FROM_EMAIL,
      to: email.toLowerCase().trim(),
      subject: "Welcome to WaitlistQ — Let's Build Your Launch 🚀",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="font-size: 28px; margin: 0;">
              <span style="color: #4f46e5;">Waitlist</span><span style="color: #7c3aed;">Q</span>
            </h1>
            <p style="color: #71717a; font-size: 14px; margin-top: 4px;">Viral Waitlists That Grow Themselves</p>
          </div>
          <p style="color: #27272a; font-size: 16px; line-height: 1.6;">Hey! 👋</p>
          <p style="color: #27272a; font-size: 16px; line-height: 1.6;">
            Thanks for subscribing to WaitlistQ updates. Here's what you'll get:
          </p>
          <ul style="color: #27272a; font-size: 16px; line-height: 1.8;">
            <li>Pre-launch marketing strategies that work</li>
            <li>Viral growth tactics for your waitlist</li>
            <li>Case studies from successful launches</li>
            <li>New WaitlistQ features & product updates</li>
          </ul>
          <p style="color: #27272a; font-size: 16px; line-height: 1.6;">
            Ready to launch? <a href="https://waitlistq.vercel.app" style="color: #4f46e5; text-decoration: none; font-weight: 600;">Create your waitlist for free</a> — takes 30 seconds.
          </p>
          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e4e4e7;">
            <p style="color: #a1a1aa; font-size: 13px;">
              WaitlistQ — a <a href="https://deependventures.com" style="color: #a1a1aa;">Deep End Ventures</a> company
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 }
    );
  }
}
