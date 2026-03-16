import React, { useEffect, useState } from "react";
import AnimatedLink from "../components/AnimatedLink.jsx";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (API_BASE) {
      fetch(`${API_BASE}/api/blogs`)
        .then((r) => r.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setBlogs(data);
          } else {
            setBlogs([]);
          }
        })
        .catch(() => {
          // Fallback to localStorage cache if API fails
          try {
            const raw = window.localStorage.getItem("plethora_admin_blogs");
            if (!raw) {
              setBlogs([]);
              return;
            }
            const parsed = JSON.parse(raw);
            setBlogs(Array.isArray(parsed) ? parsed : []);
          } catch {
            setBlogs([]);
          }
        });
    } else {
      // No backend configured: use localStorage only
      try {
        const raw = window.localStorage.getItem("plethora_admin_blogs");
        if (!raw) {
          setBlogs([]);
          return;
        }
        const parsed = JSON.parse(raw);
        setBlogs(Array.isArray(parsed) ? parsed : []);
      } catch {
        setBlogs([]);
      }
    }
  }, []);

  return (
    <div className="relative h-full py-[12vh] sm:py-[20vh] px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-[6vh] sm:pb-[8vh]">
        <div className="text-[clamp(2rem,5vw,4.8rem)] ">
          <h3>Blogs</h3>
        </div>

        <div className="text-[clamp(0.7rem,1.5vw,0.8rem)] uppercase text-white/70">
          {blogs.length} Articles
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-10 sm:gap-16">
        {blogs.map((blog) => (
          <AnimatedLink
            key={blog.id}
            to={`/blog/${blog.id}`}
            className="space-y-4 sm:space-y-6 group"
          >
            <div className="border-t border-white/40 pt-6 sm:pt-8" />

            <h2 className="text-[clamp(1.125rem,2.5vw,1.5rem)] font-[200] group-hover:text-white">
              {blog.title}
            </h2>

            <p className="text-white/50 text-[clamp(0.7rem,1.5vw,0.8rem)] uppercase">
              {blog.writer || "Admin"}
            </p>

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

export default BlogList;

