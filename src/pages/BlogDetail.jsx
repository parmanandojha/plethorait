import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/blogs.json")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const found = data.find((b) => String(b.id) === String(slug));
          if (found) {
            setBlog(found);
          }
        }
        setLoaded(true);
      })
      .catch(() => {
        setLoaded(true);
      });
  }, [slug]);

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
        <p className="text-[clamp(0.875rem,1.5vw,1rem)]">Loading…</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
        <p className="text-[clamp(0.875rem,1.5vw,1rem)]">Blog not found.</p>
      </div>
    );
  }

  const paragraphs = (blog.content || "").split(/\n{2,}/);

  return (
    <main className="min-h-screen px-4 sm:px-6 pt-[14vh] sm:pt-[22vh] pb-[14vh] sm:pb-[18vh] flex justify-center">
      <article className="w-full max-w-3xl">
        <div className="mb-8 sm:mb-10 border-b border-white/10 pb-6 sm:pb-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-[clamp(0.7rem,1.5vw,0.8rem)] uppercase text-white/60 tracking-[0.18em]">
              {blog.writer || "Admin"}
            </p>

            <Link
              to="/blog"
              className="text-[clamp(0.75rem,1.4vw,0.9rem)] uppercase text-white/60 hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              ← Back to all articles
            </Link>
          </div>

          <h1 className="text-[clamp(2rem,4.5vw,3.5rem)] leading-tight mb-4 sm:mb-5">
            {blog.title}
          </h1>

          {blog.keywords && (
            <div className="flex flex-wrap gap-2 sm:gap-3 text-[clamp(0.65rem,1.2vw,0.75rem)] uppercase text-white/50">
              {blog.keywords
                .split(",")
                .map((k) => k.trim())
                .filter(Boolean)
                .map((k) => (
                  <span
                    key={k}
                    className="border border-white/15 rounded-full px-3 py-1 tracking-[0.18em]"
                  >
                    #{k}
                  </span>
                ))}
            </div>
          )}
        </div>

        <div className="prose prose-invert max-w-none text-[clamp(0.9375rem,1.5vw,1.05rem)] leading-relaxed sm:leading-8">
          {paragraphs.map((para, idx) => (
            <p key={idx} className="text-white/80 mb-4 sm:mb-6">
              {para}
            </p>
          ))}
        </div>
      </article>
    </main>
  );
}

export default BlogDetail;

