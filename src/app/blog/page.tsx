import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/content/blog";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmailCapture from "@/components/EmailCapture";

export const metadata: Metadata = {
  title: "Blog — WaitlistQ | Waitlist Strategy, Launch Marketing & Growth Guides",
  description:
    "Practical guides on building viral waitlists, pre-launch marketing, referral programs, and growth strategies for product launches.",
  keywords: [
    "waitlist strategy",
    "pre-launch marketing",
    "viral waitlist guide",
    "referral program guide",
    "product launch strategy",
  ],
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            Blog & Guides
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Launch Smarter with{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              WaitlistQ
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Practical guides on viral waitlists, pre-launch marketing, referral
            programs, and growth strategies. Written for founders who ship.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block bg-white border border-gray-200 rounded-xl p-6 md:p-8 hover:border-indigo-300 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                  <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                  <span>{post.date}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">{post.description}</p>
                <span className="inline-flex items-center gap-1 text-indigo-600 font-medium text-sm group-hover:gap-2 transition-all">
                  Read article <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-xl mx-auto px-4">
          <EmailCapture
            heading="Get Launch Growth Tips in Your Inbox"
            subheading="Viral waitlist strategies, referral playbooks, and product updates. Free, no spam."
            source="blog-listing"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Build Your Waitlist?
          </h2>
          <p className="text-indigo-200 mb-6">
            Viral referral tracking, analytics, and engagement — set up in 5 minutes.
          </p>
          <Link
            href="/login"
            className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Get Started Free →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
