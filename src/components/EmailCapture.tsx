"use client";

import { useState } from "react";

interface EmailCaptureProps {
  variant?: "card" | "inline";
  heading?: string;
  subheading?: string;
  source?: string;
}

export default function EmailCapture({
  variant = "card",
  heading = "Get Launch Tips Delivered",
  subheading = "Pre-launch strategies, viral growth tactics, and product updates. No spam — unsubscribe anytime.",
  source = "homepage",
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to subscribe");
    }
  };

  if (status === "success") {
    return (
      <div
        className={
          variant === "card"
            ? "rounded-2xl border border-indigo-200 bg-indigo-50 p-8 text-center"
            : "rounded-xl bg-indigo-50 border border-indigo-100 p-4 text-center"
        }
      >
        <div className="text-2xl mb-2">✅</div>
        <p className="text-gray-900 font-semibold">You&apos;re subscribed!</p>
        <p className="text-gray-500 text-sm mt-1">
          Check your inbox for a welcome email.
        </p>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
        <p className="text-sm font-medium text-gray-900 mb-2">{heading}</p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
            className="flex-1 rounded-lg bg-white border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors whitespace-nowrap"
          >
            {status === "loading" ? "..." : "Subscribe"}
          </button>
        </form>
        {status === "error" && (
          <p className="text-red-500 text-xs mt-2">{errorMsg}</p>
        )}
      </div>
    );
  }

  // Card variant
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
      <div className="text-3xl mb-3">📬</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{heading}</h3>
      <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">{subheading}</p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          required
          className="flex-1 rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all whitespace-nowrap"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe →"}
        </button>
      </form>
      {status === "error" && (
        <p className="text-red-500 text-sm mt-3">{errorMsg}</p>
      )}
      <p className="text-gray-400 text-xs mt-4">
        No spam. Unsubscribe anytime. We respect your inbox.
      </p>
    </div>
  );
}
