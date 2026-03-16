import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
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
  const [isClosing, setIsClosing] = useState(false);
  const location = useLocation();
  const stairsRef = useRef(null);
  const menuContentRef = useRef(null);

  const closeMenu = useCallback(() => {
    const stairs = stairsRef.current ? gsap.utils.toArray(".menu-stair", stairsRef.current) : [];
    const content = menuContentRef.current;
    if (!stairs.length || !content) {
      setMenuOpen(false);
      return;
    }
    setIsClosing(true);
    const tl = gsap.timeline({
      onComplete: () => {
        setIsClosing(false);
        setMenuOpen(false);
        gsap.set(stairs, { y: "100%" });
      }
    });
    // 1s delay then smooth text fade out, then stairs out
    tl.to(content, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, 1);
    tl.to(
      stairs,
      {
        y: "-100%",
        duration: 0.5,
        stagger: { amount: -0.22 },
        ease: "power3.inOut"
      },
      1.35
    );
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (menuOpen || isClosing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, isClosing]);

  useLayoutEffect(() => {
    if (!menuOpen || isClosing) return;
    const stairs = stairsRef.current ? gsap.utils.toArray(".menu-stair", stairsRef.current) : [];
    const content = menuContentRef.current;
    if (!stairs.length || !content) return;

    gsap.set(stairs, { y: "100%" });
    gsap.set(content, { opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(stairs, { y: "0%" });
      }
    });
    tl.to(
      stairs,
      {
        y: "0%",
        duration: 0.5,
        stagger: { amount: -0.22 },
        ease: "power3.inOut"
      },
      0
    );
    // 1s delay then smooth text fade in
    tl.to(content, { opacity: 1, duration: 0.6, ease: "power2.inOut" }, 1);
  }, [menuOpen, isClosing]);

  const showOverlay = menuOpen || isClosing;

  return (
    <>
      <nav
        className={`absolute top-2 left-0 flex w-full p-4 sm:p-6 text-[#ffff] ${showOverlay ? "z-[9999]" : "z-20"}`}
      >
        <div className="w-1/2 min-w-0">
          <AnimatedLink to="/" className="block">
            <img src="/plethorait logo.svg" className="h-4 sm:h-5 w-auto" alt="Plethora IT" />
          </AnimatedLink>
        </div>

        {/* Desktop / tablet: current menu (visible from md up) */}
        <div className="w-1/2 hidden md:flex justify-between items-start">
          <div className="flex flex-col gap-1 uppercase text-[0.8rem]">
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
            className="px-2 -mr-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
            onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
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

      {/* Mobile menu: 4 stairs + content (below md only) */}
      {showOverlay && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-[9998] md:hidden"
          aria-hidden={!menuOpen && !isClosing}
          style={{
            pointerEvents: isClosing ? "none" : "auto"
          }}
        >
          {/* 4 stairs layer */}
          <div
            ref={stairsRef}
            className="absolute inset-0 flex h-full w-full pointer-events-none"
          >
            <div className="menu-stair h-full w-1/4 bg-black" />
            <div className="menu-stair h-full w-1/4 bg-black" />
            <div className="menu-stair h-full w-1/4 bg-black" />
            <div className="menu-stair h-full w-1/4 bg-black" />
          </div>

          {/* Invisible backdrop to close on outside click (only when not closing) */}
          {!isClosing && (
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 w-full h-full cursor-default z-0"
              onClick={closeMenu}
              style={{ background: "transparent" }}
            />
          )}

          {/* Menu content (fades in after stairs) */}
          <div
            ref={menuContentRef}
            className="absolute inset-0 flex flex-col leading-none  px-4 pb-4 justify-end text-white z-10 pointer-events-none"
          >
            <div
              className="flex flex-col  uppercase text-[4rem] pointer-events-auto"
            >
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
      )}
    </>
  );
}

export default Navbar;
