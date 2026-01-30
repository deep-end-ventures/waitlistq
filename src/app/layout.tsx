import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WaitlistQ — Viral Waitlists with Referral Tracking",
  description:
    "Create embeddable waitlists with built-in referral tracking. Users share to move up the list. Free to start.",
  openGraph: {
    title: "WaitlistQ — Viral Waitlists with Referral Tracking",
    description:
      "Create embeddable waitlists with built-in referral tracking. Users share to move up the list.",
    type: "website",
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
