import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getAllSlugs } from "@/content/blog";
import { BlogPostJsonLd } from "@/components/JsonLd";
import { ArrowLeft, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmailCapture from "@/components/EmailCapture";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} — WaitlistQ`,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-white">
      <BlogPostJsonLd
        title={post.title}
        description={post.description}
        date={post.date}
        slug={slug}
      />
      <Navbar />

      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          All Posts
        </Link>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
          <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-medium">
            {post.category}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
          <span>{post.date}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
          {post.title}
        </h1>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-gray-900
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-gray-600 prose-p:leading-relaxed
            prose-li:text-gray-600
            prose-a:text-indigo-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900
            prose-code:text-indigo-700 prose-code:bg-indigo-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
            prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-200 prose-pre:rounded-xl
            prose-table:border-collapse
            prose-th:bg-gray-50 prose-th:p-3 prose-th:text-left prose-th:border prose-th:border-gray-200 prose-th:text-gray-700
            prose-td:p-3 prose-td:border prose-td:border-gray-200 prose-td:text-gray-600
            prose-hr:border-gray-200 prose-hr:my-8"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
        />

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap items-center gap-2">
            {post.keywords.slice(0, 5).map((kw) => (
              <span
                key={kw}
                className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* Email Capture — inline after article */}
      <div className="max-w-3xl mx-auto px-4 mt-8 mb-12">
        <EmailCapture
          variant="inline"
          heading="Enjoyed this post? Get more launch tips →"
          source="blog-post"
        />
      </div>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Build Your Viral Waitlist Today
          </h2>
          <p className="text-indigo-200 mb-6">
            Referral tracking, analytics, and engagement tools — free for up to
            100 signups.
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

/** Minimal markdown → HTML converter */
function markdownToHtml(md: string): string {
  const lines = md.trim().split("\n");
  let html = "";
  let inList = false;
  let listType: "ul" | "ol" = "ul";
  let inTable = false;
  let inCodeBlock = false;
  let codeContent = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Code blocks
    if (trimmed.startsWith("```")) {
      if (inCodeBlock) {
        html += `<pre><code>${escapeHtml(codeContent.trim())}</code></pre>`;
        codeContent = "";
        inCodeBlock = false;
      } else {
        if (inList) {
          html += `</${listType}>`;
          inList = false;
        }
        inCodeBlock = true;
      }
      continue;
    }
    if (inCodeBlock) {
      codeContent += line + "\n";
      continue;
    }

    if (!trimmed) {
      if (inList) {
        html += `</${listType}>`;
        inList = false;
      }
      if (inTable) {
        html += "</tbody></table>";
        inTable = false;
      }
      continue;
    }

    if (trimmed.startsWith("### ")) {
      if (inList) {
        html += `</${listType}>`;
        inList = false;
      }
      html += `<h3>${inline(trimmed.slice(4))}</h3>`;
      continue;
    }
    if (trimmed.startsWith("## ")) {
      if (inList) {
        html += `</${listType}>`;
        inList = false;
      }
      html += `<h2>${inline(trimmed.slice(3))}</h2>`;
      continue;
    }
    if (/^---+$/.test(trimmed)) {
      html += "<hr />";
      continue;
    }

    // Table
    if (trimmed.startsWith("|")) {
      if (/^\|[\s-:|]+\|$/.test(trimmed)) continue;
      const cells = trimmed
        .split("|")
        .filter((c) => c.trim() !== "")
        .map((c) => c.trim());
      if (!inTable) {
        html += "<table><thead><tr>";
        cells.forEach((c) => {
          html += `<th>${inline(c)}</th>`;
        });
        html += "</tr></thead><tbody>";
        inTable = true;
        continue;
      }
      html += "<tr>";
      cells.forEach((c) => {
        html += `<td>${inline(c)}</td>`;
      });
      html += "</tr>";
      continue;
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      if (!inList) {
        listType = "ul";
        html += "<ul>";
        inList = true;
      }
      html += `<li>${inline(trimmed.slice(2))}</li>`;
      continue;
    }
    if (/^\d+\.\s/.test(trimmed)) {
      if (!inList) {
        listType = "ol";
        html += "<ol>";
        inList = true;
      }
      html += `<li>${inline(trimmed.replace(/^\d+\.\s/, ""))}</li>`;
      continue;
    }

    if (inList) {
      html += `</${listType}>`;
      inList = false;
    }
    html += `<p>${inline(trimmed)}</p>`;
  }

  if (inList) html += `</${listType}>`;
  if (inTable) html += "</tbody></table>";
  return html;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function inline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/`(.+?)`/g, "<code>$1</code>");
}
