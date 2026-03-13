import React from "react";
import { blogs } from "../data/blogs.js";
import AnimatedLink from "../components/AnimatedLink.jsx";

function BlogList() {
  return (
    <div className="relative h-full py-[20vh] px-6">
      <div className="flex flex-row justify-between items-end pb-[8vh]">
        <div className="text-[clamp(3rem,5vw,4.8rem)]">
          <h3>Blogs</h3>
        </div>

        <div className="text-[0.8rem] uppercase text-white/70">
          {blogs.length} Articles
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-16">
        {blogs.map((blog) => (
          <AnimatedLink
            key={blog.id}
            to={`/blog/${blog.slug}`}
            className="space-y-6 group"
          >
            <div className="border-t border-white/40 pt-8" />

            <h2 className="text-[1.5rem] font-[200] group-hover:text-white">
              {blog.title}
            </h2>

            <p className="text-white/50 text-[0.8rem] uppercase">
              {blog.date} · {blog.readTime}
            </p>

            <p className="text-white/70 text-[1rem] max-w-md leading-[120%]">
              {blog.excerpt}
            </p>
          </AnimatedLink>
        ))}
      </div>
    </div>
  );
}

export default BlogList;

