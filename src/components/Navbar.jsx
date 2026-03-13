import React from "react";
import AnimatedLink from "./AnimatedLink.jsx";

function Navbar() {
  return (
    <nav className="absolute top-2 left-0 flex w-full p-6 text-[#ffff] leading-none z-10">
      <div className="w-1/2">
        <AnimatedLink to="/">
          <img src="/plethorait logo.svg" className="h-5" alt="Plethora IT" />
        </AnimatedLink>
      </div>

      <div className="w-1/2 flex justify-between">
        <div className="flex flex-col gap-1 uppercase">
          <div className="nav-link-group cursor-pointer">
            <div className="inline-block">
              <AnimatedLink to="/" className="nav-link-text">
                Home
              </AnimatedLink>
              <div className="nav-border border-b border-white origin-left scale-x-0 pt-1" />
            </div>
          </div>

          <div className="nav-link-group cursor-pointer">
            <div className="inline-block">
              <AnimatedLink to="/work" className="nav-link-text">
                Work
              </AnimatedLink>
              <div className="nav-border border-b border-white origin-left scale-x-0 pt-1" />
            </div>
          </div>

          <div className="nav-link-group cursor-pointer">
            <div className="inline-block">
              <AnimatedLink to="/about" className="nav-link-text">
                About
              </AnimatedLink>
              <div className="nav-border border-b border-white origin-left scale-x-0 pt-1" />
            </div>
          </div>

          <div className="nav-link-group cursor-pointer">
            <div className="inline-block">
              <AnimatedLink to="/blog" className="nav-link-text">
                Blog
              </AnimatedLink>
              <div className="nav-border border-b border-white origin-left scale-x-0 pt-1" />
            </div>
          </div>

          <div className="nav-link-group cursor-pointer">
            <div className="inline-block">
              <AnimatedLink to="/contact" className="nav-link-text">
                Contact
              </AnimatedLink>
              <div className="nav-border border-b border-white origin-left scale-x-0 pt-1" />
            </div>
          </div>
        </div>

        <div>
          <h6>Bangkok, Thailand</h6>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

