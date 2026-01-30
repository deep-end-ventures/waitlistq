import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'WaitlistQ — Viral Waitlists with Referral Tracking';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #eef2ff 0%, #ffffff 50%, #f5f3ff 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ fontSize: 72, marginBottom: 8, display: 'flex' }}>🚀</div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
            backgroundClip: 'text',
            color: '#4f46e5',
            marginBottom: 16,
            display: 'flex',
          }}
        >
          WaitlistQ
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#4b5563',
            maxWidth: 700,
            textAlign: 'center',
            display: 'flex',
          }}
        >
          Viral Waitlists with Referral Tracking
        </div>
        <div
          style={{
            marginTop: 40,
            padding: '12px 32px',
            background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
            borderRadius: 12,
            color: '#ffffff',
            fontSize: 22,
            fontWeight: 600,
            display: 'flex',
          }}
        >
          Start for Free →
        </div>
      </div>
    ),
    { ...size }
  );
}
