import React, { useEffect, useState } from "react";
import AnimatedLink from "../AnimatedLink.jsx";

function BlogsSection() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetch("/blogs.json")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFeatured(data.slice(0, 3));
        } else {
          setFeatured([]);
        }
      })
      .catch(() => {
        setFeatured([]);
      });
  }, []);

  return (
    <div className="relative h-full py-[12vh] sm:py-[20vh] px-4 sm:px-6">
      <div className="flex flex-row justify-between items-center sm:items-end gap-4 pb-[6vh] sm:pb-[8vh]">
        <div className="text-[clamp(2.2rem,5vw,4.8rem)]">
          <h3>Blogs</h3>
        </div>

        <div className="underline-link flex flex-col gap-1 text-[clamp(0.7rem,1.5vw,0.8rem)] cursor-pointer">
          <AnimatedLink to="/blog">
            <div className="underline-trigger inline-block">
              <div>[ View All ]</div>

              <div className="underline-line border-b border-white w-full origin-left scale-x-0 pt-1" />
            </div>
          </AnimatedLink>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-10 sm:gap-16">
        {featured.map((blog) => (
          <AnimatedLink
            key={blog.id}
            to={`/blog/${blog.id}`}
            className="space-y-4 sm:space-y-6 group"
          >
            <div className="border-t border-white/40 pt-6 sm:pt-8" />

            <h2 className="text-[clamp(1.125rem,2.5vw,1.5rem)] font-[200] group-hover:text-white">
              {blog.title}
            </h2>

            <p className="text-white/70 text-[clamp(0.875rem,1.5vw,1rem)] max-w-md">
              {(blog.content || "").slice(0, 120)}
              {(blog.content || "").length > 120 ? "…" : ""}
            </p>
          </AnimatedLink>
        ))}
      </div>
    </div>
  );
}

export default BlogsSection;

