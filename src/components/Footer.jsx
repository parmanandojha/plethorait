import React, { useState } from "react";
import AnimatedLink from "./AnimatedLink.jsx";

function Footer() {
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [subForm, setSubForm] = useState({ name: "", email: "" });

  const handleSubscribeSubmit = (e) => {
    e.preventDefault();
    if (!subForm.name || !subForm.email) return;

    try {
      const key = "plethora_subscribers";
      const raw = window.localStorage.getItem(key);
      const existing = raw ? JSON.parse(raw) : [];
      const next = [
        {
          id: `sub-${Date.now()}`,
          name: subForm.name,
          email: subForm.email
        },
        ...existing
      ];
      window.localStorage.setItem(key, JSON.stringify(next));
    } catch {
      // ignore storage failures for now
    }

    setSubForm({ name: "", email: "" });
    setShowSubscribe(false);
  };

  return (
    <>
      <div
        className="w-[100vw] h-[90vh] bg-cover bg-center"
        style={{ backgroundImage: 'url("/footerbg.png")' }}
      />

      <footer className="relative px-4 sm:px-6 md:px-16 py-12 sm:py-20 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 mb-16 sm:mb-24">
          <div className="md:col-span-6">
            <h2 className="text-[clamp(1.25rem,3vw,1.875rem)] md:text-3xl mb-4">Let’s work together</h2>

            <a href="#" className="underline text-xs sm:text-sm tracking-wide break-all">
              CONNECT@PLETHORAIT.COM
            </a>
          </div>

          <div className="md:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 text-[clamp(0.8rem,1.2vw,1rem)]">
            <div className="space-y-2">
              <AnimatedLink className="block underline" to="/work">
                WORK
              </AnimatedLink>
              <AnimatedLink className="block underline" to="/about">
                ABOUT &amp; SERVICES
              </AnimatedLink>
              <AnimatedLink className="block underline" to="/blog">
                BLOGS
              </AnimatedLink>
              <AnimatedLink className="block underline" to="/contact">
                CONTACT
              </AnimatedLink>
            </div>

            <div className="space-y-2">
              <a className="block underline" href="#">
                INSTAGRAM
              </a>
              <a className="block underline" href="#">
                LINKEDIN
              </a>
              <a className="block underline" href="#">
                BEHANCE
              </a>
            </div>

            <div className="space-y-2 uppercase col-span-2 md:col-span-1">
              <span>PLETHORA IT</span>

              <p className="uppercase text-xs sm:text-sm">
                35/46, SUPALAI ESSENCE <br />
                SUNALUANG, DOKMAI <br />
                PRAWET, BANGKOK -10250 <br />
                THAILAND
              </p>
            </div>
          </div>
        </div>

        <div>
          <img src="/plethorait logo.svg" className="w-full" alt="Plethora IT" />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 mt-8 sm:mt-12 text-xs sm:text-sm">
          <p>All rights Reserved 2025</p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <AnimatedLink to="/privacy-policy" className="underline">
              PRIVACY POLICY
            </AnimatedLink>
            <button
              type="button"
              className="underline"
              onClick={() => setShowSubscribe(true)}
            >
              SUBSCRIBE TO OUR NEWSLETTER
            </button>
          </div>
        </div>
      </footer>

      {showSubscribe && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/80"
            onClick={() => setShowSubscribe(false)}
          />

          {/* Modal */}
          <div className="relative z-10 w-full max-w-sm bg-[#111111] border border-white/15 rounded-md px-6 py-6 text-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold uppercase tracking-wide">
                Subscribe
              </h2>
              <button
                type="button"
                onClick={() => setShowSubscribe(false)}
                className="text-xs text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleSubscribeSubmit}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block uppercase tracking-wide mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={subForm.name}
                  onChange={(e) =>
                    setSubForm((p) => ({ ...p, name: e.target.value }))
                  }
                  className="w-full px-2 py-2 bg-black border border-white/20 rounded focus:outline-none focus:ring-2 focus:ring-white/40"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wide mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={subForm.email}
                  onChange={(e) =>
                    setSubForm((p) => ({ ...p, email: e.target.value }))
                  }
                  className="w-full px-2 py-2 bg-black border border-white/20 rounded focus:outline-none focus:ring-2 focus:ring-white/40"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-white text-black text-xs font-semibold rounded hover:bg-[#f5f5f5] transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Footer;

