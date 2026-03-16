import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_KEY = "plethora_admin_authed";
const PROJECTS_KEY = "plethora_admin_projects";
const BLOGS_KEY = "plethora_admin_blogs";
const SUBS_KEY = "plethora_subscribers";
const METRICS_KEY = "plethora_consent_metrics";

function downloadJson(filename, data) {
  try {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    // Silent failure – this is a convenience export helper
    // and should not break the dashboard.
    console.error("Failed to download JSON", err);
  }
}

function readLocalArray(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

function writeLocalArray(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");

  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [metrics, setMetrics] = useState([]);

  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingBlogId, setEditingBlogId] = useState(null);

  const [projectForm, setProjectForm] = useState({
    name: "",
    description: "",
    imageName: "",
    imageDataUrl: ""
  });

  const [blogForm, setBlogForm] = useState({
    title: "",
    keywords: "",
    writer: "",
    content: ""
  });

  useEffect(() => {
    const authed = localStorage.getItem(ADMIN_KEY);
    if (authed !== "true") {
      navigate("/admin/login", { replace: true });
      return;
    }

    setProjects(readLocalArray(PROJECTS_KEY));
    setBlogs(readLocalArray(BLOGS_KEY));
    setSubscribers(readLocalArray(SUBS_KEY));
    setMetrics(readLocalArray(METRICS_KEY));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_KEY);
    navigate("/admin/login", { replace: true });
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (!projectForm.name || !projectForm.description) return;

    if (editingProjectId) {
      const updated = projects.map((p) =>
        p.id === editingProjectId ? { ...p, ...projectForm } : p
      );
      setProjects(updated);
      writeLocalArray(PROJECTS_KEY, updated);
    } else {
      const next = [
        {
          ...projectForm,
          id: `work-${Date.now()}`
        },
        ...projects
      ];
      setProjects(next);
      writeLocalArray(PROJECTS_KEY, next);
    }

    setEditingProjectId(null);
    setProjectForm({
      name: "",
      description: "",
      imageName: "",
      imageDataUrl: ""
    });
  };

  const handleBlogSubmit = (e) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.content) return;

    if (editingBlogId) {
      const updated = blogs.map((b) =>
        b.id === editingBlogId ? { ...b, ...blogForm } : b
      );
      setBlogs(updated);
      writeLocalArray(BLOGS_KEY, updated);
    } else {
      const next = [
        {
          ...blogForm,
          id: `blog-${Date.now()}`
        },
        ...blogs
      ];
      setBlogs(next);
      writeLocalArray(BLOGS_KEY, next);
    }

    setEditingBlogId(null);
    setBlogForm({
      title: "",
      keywords: "",
      writer: "",
      content: ""
    });
  };

  const handleProjectImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProjectForm((prev) => ({
        ...prev,
        imageName: file.name,
        imageDataUrl: typeof reader.result === "string" ? reader.result : ""
      }));
    };
    reader.readAsDataURL(file);
  };

  const renderDashboardOverview = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-md p-5">
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wide">
            Work
          </h2>
          <p className="text-xs text-white/70 mb-4">
            Draft entries stored locally in your browser.
          </p>
          <p className="text-3xl font-semibold mb-1">{projects.length}</p>
          <p className="text-xs text-white/60">Items</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-md p-5">
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wide">
            Blogs
          </h2>
          <p className="text-xs text-white/70 mb-4">
            Draft blog posts stored locally in your browser.
          </p>
          <p className="text-3xl font-semibold mb-1">{blogs.length}</p>
          <p className="text-xs text-white/60">Items</p>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-md p-5">
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wide">
            Newsletter Subscribers
          </h2>
          <p className="text-xs text-white/70 mb-4">
            People who subscribed via the footer popup.
          </p>
          <p className="text-3xl font-semibold mb-1">{subscribers.length}</p>
          <p className="text-xs text-white/60">Subscribers</p>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-md p-5 space-y-3 text-xs">
        <h2 className="text-sm font-semibold mb-1 uppercase tracking-wide">
          Export data as JSON
        </h2>
        <p className="text-white/70">
          Download the latest drafts from this browser as JSON files for backup
          or to use them in your codebase / backend.
        </p>
        <div className="flex flex-wrap gap-3 mt-2">
          <button
            type="button"
            onClick={() => downloadJson("work.json", projects)}
            className="px-3 py-1.5 bg-white text-black rounded font-semibold hover:bg-[#f5f5f5] transition-colors"
          >
            Download Work JSON
          </button>
          <button
            type="button"
            onClick={() => downloadJson("blogs.json", blogs)}
            className="px-3 py-1.5 bg-white text-black rounded font-semibold hover:bg-[#f5f5f5] transition-colors"
          >
            Download Blogs JSON
          </button>
          <button
            type="button"
            onClick={() =>
              downloadJson("plethora-content.json", { projects, blogs })
            }
            className="px-3 py-1.5 bg-white text-black rounded font-semibold hover:bg-[#f5f5f5] transition-colors"
          >
            Download All Content
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-md p-5">
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wide">
            Consent metrics
          </h2>
          <p className="text-xs text-white/70 mb-4">
            Location & device when cookies were accepted.
          </p>
          <p className="text-3xl font-semibold mb-1">{metrics.length}</p>
          <p className="text-xs text-white/60">Records</p>
        </div>

      <p className="text-xs text-white/60">
        Note: This admin portal is a prototype. These entries are stored only in
        your browser (localStorage). Use the export buttons above to save them
        into JSON files that you can commit to your repo or feed into a Node.js
        script / backend.
      </p>
    </div>
  );

  const renderProjectsSection = () => (
    <div className="space-y-8">
      <div className="bg-white/5 border border-white/10 rounded-md p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide">
            {editingProjectId ? "Edit Work" : "Add New Work"}
          </h2>
        </div>

        <form
          onSubmit={handleProjectSubmit}
          className="grid md:grid-cols-2 gap-4 text-xs"
        >
          <div className="space-y-2">
            <label className="block uppercase tracking-wide">Work Name</label>
            <input
              type="text"
              value={projectForm.name}
              onChange={(e) =>
                setProjectForm((p) => ({ ...p, name: e.target.value }))
              }
              className="w-full px-2 py-2 bg-black border border-white/20 rounded focus:outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>

          <div className="space-y-2">
            <label className="block uppercase tracking-wide">
              Description
            </label>
            <textarea
              value={projectForm.description}
              onChange={(e) =>
                setProjectForm((p) => ({ ...p, description: e.target.value }))
              }
              rows={3}
              className="w-full px-2 py-2 bg-black border border-white/20 rounded resize-none focus:outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>

          <div className="space-y-2">
            <label className="block uppercase tracking-wide">
              Project Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleProjectImageChange}
              className="block w-full text-[11px] text-white/80 file:mr-2 file:py-1 file:px-2 file:border-0 file:text-xs file:bg-white/10 file:text-white hover:file:bg-white/20"
            />
            {projectForm.imageName && (
              <p className="text-[11px] text-white/60">
                Selected: {projectForm.imageName}
              </p>
            )}
          </div>

          <div className="md:col-span-2 flex justify-end mt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-white text-black text-xs font-semibold rounded hover:bg-[#f5f5f5] transition-colors"
            >
              {editingProjectId ? "Save Work" : "Add Work"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-md p-5">
        <h2 className="text-sm font-semibold mb-4 uppercase tracking-wide">
          Work Drafts
        </h2>
        {projects.length === 0 ? (
          <p className="text-xs text-white/60">No work items added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="text-left text-white/60 border-b border-white/10">
                <tr>
                  <th className="py-2 pr-4">Work Name</th>
                  <th className="py-2 pr-4">Description</th>
                  <th className="py-2 pr-4">Image</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-white/5 last:border-b-0"
                  >
                    <td className="py-2 pr-4">{p.name || p.title}</td>
                    <td className="py-2 pr-4 text-white/80 max-w-xs">
                      {(p.description ||
                        p.subtitle ||
                        "").slice(0, 80) || "—"}
                      {(p.description || p.subtitle || "").length > 80
                        ? "…"
                        : ""}
                    </td>
                    <td className="py-2 pr-4 text-white/80">
                      {p.imageName ? (
                        <span className="text-[11px] text-white/70">
                          {p.imageName}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="py-2 pr-4">
                      <button
                        type="button"
                        className="px-3 py-1 text-[11px] border border-white/30 rounded hover:bg-white hover:text-black transition-colors"
                        onClick={() => {
                          setEditingProjectId(p.id);
                          setProjectForm({
                            name: p.name || p.title || "",
                            description:
                              p.description || p.subtitle || "",
                            imageName: p.imageName || "",
                            imageDataUrl: p.imageDataUrl || ""
                          });
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  const renderBlogsSection = () => (
    <div className="space-y-8">
      <div className="bg-white/5 border border-white/10 rounded-md p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide">
            {editingBlogId ? "Edit Blog" : "Add New Blog"}
          </h2>
        </div>

        <form
          onSubmit={handleBlogSubmit}
          className="grid md:grid-cols-2 gap-4 text-xs"
        >
          <div className="space-y-2">
            <label className="block uppercase tracking-wide">Title</label>
            <input
              type="text"
              value={blogForm.title}
              onChange={(e) =>
                setBlogForm((p) => ({ ...p, title: e.target.value }))
              }
              className="w-full px-2 py-2 bg-black border border-white/20 rounded focus:outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="block uppercase tracking-wide">Keywords</label>
            <textarea
              value={blogForm.keywords}
              onChange={(e) =>
                setBlogForm((p) => ({ ...p, keywords: e.target.value }))
              }
              rows={3}
              className="w-full px-2 py-2 bg-black border border-white/20 rounded resize-none focus:outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>

          <div className="space-y-2">
            <label className="block uppercase tracking-wide">
              Writer Name
            </label>
            <input
              type="text"
              value={blogForm.writer}
              onChange={(e) =>
                setBlogForm((p) => ({ ...p, writer: e.target.value }))
              }
              className="w-full px-2 py-2 bg-black border border-white/20 rounded focus:outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="block uppercase tracking-wide">
              Blog Content
            </label>
            <textarea
              value={blogForm.content}
              onChange={(e) =>
                setBlogForm((p) => ({ ...p, content: e.target.value }))
              }
              rows={8}
              className="w-full px-2 py-2 bg-black border border-white/20 rounded resize-y focus:outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>

          <div className="md:col-span-2 flex justify-end mt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-white text-black text-xs font-semibold rounded hover:bg-[#f5f5f5] transition-colors"
            >
              {editingBlogId ? "Save Blog" : "Add Blog"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-md p-5">
        <h2 className="text-sm font-semibold mb-4 uppercase tracking-wide">
          Blog Drafts
        </h2>
        {blogs.length === 0 ? (
          <p className="text-xs text-white/60">No blog posts added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="text-left text-white/60 border-b border-white/10">
                <tr>
                  <th className="py-2 pr-4">Title</th>
                  <th className="py-2 pr-4">Writer</th>
                  <th className="py-2 pr-4">Keywords</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((b) => (
                  <tr
                    key={b.id}
                    className="border-b border-white/5 last:border-b-0"
                  >
                    <td className="py-2 pr-4">{b.title}</td>
                    <td className="py-2 pr-4 text-white/80">
                      {b.writer || "—"}
                    </td>
                    <td className="py-2 pr-4 text-white/80 max-w-xs">
                      {(b.keywords || "").slice(0, 80) || "—"}
                      {(b.keywords || "").length > 80 ? "…" : ""}
                    </td>
                    <td className="py-2 pr-4">
                      <button
                        type="button"
                        className="px-3 py-1 text-[11px] border border-white/30 rounded hover:bg-white hover:text-black transition-colors"
                        onClick={() => {
                          setEditingBlogId(b.id);
                          setBlogForm({
                            title: b.title || "",
                            keywords: b.keywords || "",
                            writer: b.writer || "",
                            content: b.content || ""
                          });
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  const renderSubscribersSection = () => (
    <div className="space-y-8">
      <div className="bg-white/5 border border-white/10 rounded-md p-5">
        <h2 className="text-sm font-semibold mb-4 uppercase tracking-wide">
          Newsletter Subscribers
        </h2>
        {subscribers.length === 0 ? (
          <p className="text-xs text-white/60">
            No subscribers yet. Submissions from the footer form will appear here.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="text-left text-white/60 border-b border-white/10">
                <tr>
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Email</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-white/5 last:border-b-0"
                  >
                    <td className="py-2 pr-4">{s.name}</td>
                    <td className="py-2 pr-4 text-white/80">{s.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  const renderMetricsSection = () => (
    <div className="space-y-8">
      <div className="bg-white/5 border border-white/10 rounded-md p-5">
        <h2 className="text-sm font-semibold mb-4 uppercase tracking-wide">
          Cookie consent metrics
        </h2>
        <p className="text-xs text-white/60 mb-4">
          Location and device recorded when visitors accept cookies (stored in
          this browser).
        </p>
        {metrics.length === 0 ? (
          <p className="text-xs text-white/60">
            No consent metrics yet. Data appears when someone accepts cookies on
            the site (e.g. via the bottom banner).
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="text-left text-white/60 border-b border-white/10">
                <tr>
                  <th className="py-2 pr-4">Time (UTC)</th>
                  <th className="py-2 pr-4">Location</th>
                  <th className="py-2 pr-4">Device</th>
                </tr>
              </thead>
              <tbody>
                {metrics.map((m) => (
                  <tr
                    key={m.id}
                    className="border-b border-white/5 last:border-b-0"
                  >
                    <td className="py-2 pr-4 text-white/80">
                      {m.timestamp
                        ? new Date(m.timestamp).toLocaleString(undefined, {
                            dateStyle: "short",
                            timeStyle: "short"
                          })
                        : "—"}
                    </td>
                    <td className="py-2 pr-4 text-white/80">
                      {m.location || "—"}
                    </td>
                    <td className="py-2 pr-4 text-white/80">
                      {m.device || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-[#0d0d0d] text-white">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-black border-r border-white/10 px-6 py-8 text-sm">
        <div className="mb-8">
          <h1 className="text-lg font-semibold">Plethora IT</h1>
          <p className="text-xs text-white/60 mt-1">Admin Dashboard</p>
        </div>

        <nav className="space-y-1">
          <button
            type="button"
            className={`w-full text-left px-3 py-2 rounded ${
              activeSection === "dashboard"
                ? "bg-white text-black"
                : "hover:bg-white/5"
            }`}
            onClick={() => setActiveSection("dashboard")}
          >
            Dashboard
          </button>
          <button
            type="button"
            className={`w-full text-left px-3 py-2 rounded ${
              activeSection === "work"
                ? "bg-white text-black"
                : "hover:bg-white/5"
            }`}
            onClick={() => setActiveSection("work")}
          >
            Work
          </button>
          <button
            type="button"
            className={`w-full text-left px-3 py-2 rounded ${
              activeSection === "blogs"
                ? "bg-white text-black"
                : "hover:bg-white/5"
            }`}
            onClick={() => setActiveSection("blogs")}
          >
            Blogs
          </button>
          <button
            type="button"
            className={`w-full text-left px-3 py-2 rounded ${
              activeSection === "subscribers"
                ? "bg-white text-black"
                : "hover:bg-white/5"
            }`}
            onClick={() => setActiveSection("subscribers")}
          >
            Subscribers
          </button>
          <button
            type="button"
            className={`w-full text-left px-3 py-2 rounded ${
              activeSection === "metrics"
                ? "bg-white text-black"
                : "hover:bg-white/5"
            }`}
            onClick={() => setActiveSection("metrics")}
          >
            Metrics
          </button>
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10 text-xs text-white/60">
          <p>Plethora IT © {new Date().getFullYear()}</p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="w-full border-b border-white/10 bg-[#111111] px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="md:hidden">
            <select
              value={activeSection}
              onChange={(e) => setActiveSection(e.target.value)}
              className="bg-black border border-white/30 text-xs px-2 py-1 rounded"
            >
              <option value="dashboard">Dashboard</option>
              <option value="work">Work</option>
              <option value="blogs">Blogs</option>
              <option value="subscribers">Subscribers</option>
              <option value="metrics">Metrics</option>
            </select>
          </div>
          <div className="hidden md:block text-xs uppercase tracking-wide text-white/60">
            {activeSection === "dashboard" && "Dashboard"}
            {activeSection === "work" && "Work"}
            {activeSection === "blogs" && "Blogs"}
            {activeSection === "subscribers" && "Subscribers"}
            {activeSection === "metrics" && "Metrics"}
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="hidden sm:inline text-white/70">
              Howdy, <span className="font-semibold">admin</span>
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-1 border border-white/30 rounded hover:bg-white hover:text-black transition-colors"
            >
              Log Out
            </button>
          </div>
        </header>

        <section className="flex-1 px-4 md:px-8 py-6 md:py-8 bg-[#101010] overflow-y-auto">
          {activeSection === "dashboard" && renderDashboardOverview()}
          {activeSection === "work" && renderProjectsSection()}
          {activeSection === "blogs" && renderBlogsSection()}
          {activeSection === "subscribers" && renderSubscribersSection()}
          {activeSection === "metrics" && renderMetricsSection()}
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;

