import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WaitlistQ — Viral Waitlists with Referral Tracking",
  description:
    "Create embeddable waitlists with built-in referral tracking. Users share to move up the list. Free to start.",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "WaitlistQ — Viral Waitlists with Referral Tracking",
    description:
      "Create embeddable waitlists with built-in referral tracking. Users share to move up the list.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WaitlistQ — Viral Waitlists with Referral Tracking",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WaitlistQ — Viral Waitlists with Referral Tracking",
    description:
      "Create embeddable waitlists with built-in referral tracking. Users share to move up the list.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
