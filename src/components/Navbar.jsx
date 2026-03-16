import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AnimatedLink from "./AnimatedLink.jsx";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" }
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav className="absolute top-2 left-0 flex w-full p-4 sm:p-6 text-[#ffff] z-20">
        <div className="w-1/2 min-w-0">
          <AnimatedLink to="/" className="block">
            <img src="/plethorait logo.svg" className="h-4 sm:h-5 w-auto" alt="Plethora IT" />
          </AnimatedLink>
        </div>

        {/* Desktop / tablet: current menu (visible from md up) */}
        <div className="w-1/2 hidden md:flex justify-between items-start">
          <div className="flex flex-col gap-1 uppercase text-[clamp(0.7rem,1.5vw,0.85rem)]">
            {navLinks.map(({ to, label }) => (
              <div key={to} className="nav-link-group cursor-pointer">
                <div className="inline-block">
                  <AnimatedLink to={to} className="nav-link-text">
                    {label}
                  </AnimatedLink>
                  <div className="nav-border border-b border-white origin-left scale-x-0 pt-1" />
                </div>
              </div>
            ))}
          </div>
          <div className="text-[clamp(0.65rem,1.2vw,0.8rem)]">
            <h6>Bangkok, Thailand</h6>
          </div>
        </div>

        {/* Mobile: hamburger (visible below md) */}
        <div className="w-1/2 flex justify-end items-center md:hidden">
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="p-2 -mr-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown overlay (below md only) */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-0 z-10 md:hidden bg-[#080808]/95 backdrop-blur-sm transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className="flex flex-col items-center justify-center min-h-full px-6 py-24 text-white"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-6 text-center uppercase text-xl">
            {navLinks.map(({ to, label }) => (
              <AnimatedLink
                key={to}
                to={to}
                className="nav-link-text py-2"
              >
                {label}
              </AnimatedLink>
            ))}
          </div>
          <p className="mt-12 text-sm text-white/70 uppercase">Bangkok, Thailand</p>
        </div>
      </div>
    </>
  );
}

export default Navbar;
