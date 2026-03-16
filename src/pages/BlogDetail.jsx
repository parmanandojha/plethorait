import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    <>
      <section className="px-4 sm:px-6 pt-[12vh] sm:pt-[20vh] pb-[8vh] sm:pb-[10vh] max-w-3xl">
        <p className="text-[clamp(0.7rem,1.5vw,0.8rem)] uppercase text-white/60 mb-4">
          {blog.writer || "Admin"}
        </p>
        <h1 className="text-[clamp(1.75rem,5vw,3.5rem)] mb-4">{blog.title}</h1>
        {blog.keywords && (
          <div className="flex flex-wrap gap-2 sm:gap-3 text-[clamp(0.65rem,1.2vw,0.75rem)] uppercase text-white/60">
            {blog.keywords
              .split(",")
              .map((k) => k.trim())
              .filter(Boolean)
              .map((k) => (
                <span key={k}>#{k}</span>
              ))}
          </div>
        )}
      </section>

      <section className="px-4 sm:px-6 pb-[12vh] sm:pb-[16vh] max-w-3xl space-y-4 sm:space-y-6 text-[clamp(0.9375rem,1.5vw,1rem)] ">
        {paragraphs.map((para, idx) => (
          <p key={idx} className="text-white/80">
            {para}
          </p>
        ))}
      </section>
    </>
  );
}

export default BlogDetail;

