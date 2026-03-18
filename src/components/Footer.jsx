import React from "react";
import AnimatedLink from "./AnimatedLink.jsx";

function Footer() {
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

            <div className="space-y-2 underline">
              <a className="block" href="https://www.instagram.com/plethora.it/">
                INSTAGRAM
              </a>
              <a className="block" href="https://www.linkedin.com/company/plethorainfotech/">
                LINKEDIN
              </a>
              <a className="block" href="https://www.behance.net/vidushisingh7">
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
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;

