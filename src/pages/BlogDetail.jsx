import React from "react";
import { useParams } from "react-router-dom";
import { blogs } from "../data/blogs.js";

function BlogDetail() {
  const { slug } = useParams();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <p className="text-[1rem]">Blog not found.</p>
      </div>
    );
  }

  return (
    <>
      <section className="px-6 pt-[20vh] pb-[10vh] max-w-3xl">
        <p className="text-[0.8rem] uppercase text-white/60 mb-4">
          {blog.date} · {blog.readTime}
        </p>
        <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] mb-4">{blog.title}</h1>
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-3 text-[0.75rem] uppercase text-white/60">
            {blog.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
        )}
      </section>

      <section className="px-6 pb-[16vh] max-w-3xl space-y-6 text-[1rem] leading-[150%]">
        {blog.body.map((para, idx) => (
          <p key={idx} className="text-white/80">
            {para}
          </p>
        ))}
      </section>
    </>
  );
}

export default BlogDetail;

